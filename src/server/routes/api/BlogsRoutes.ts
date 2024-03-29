import * as express from "express";
import BlogsDB from "../../database/queries/Blogs";
import BlogTagsDB from "../../database/queries/BlogTags";
import { isValidToken } from "../../utilities/tokenCheck";

const router = express.Router();

//current path is /api/Blogs
//gets all blogs
router.get("/", async (req, res) => {
  try {
    const blogs = await BlogsDB.getAllBlogs();
    if (blogs) {
      res.json(blogs);
    } else {
      res.status(400).json({ message: "You are looking for blogs that don't exist. Stop that." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "A getAllBlogs error occurred" });
  }
});

//get one blog
router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    const blog = await BlogsDB.getOneBlog(id);
    if (blog.length) {
      res.json(blog[0]);
    } else {
      res.status(400).json({ message: "You are looking for a blog that doesn't exist. Stop that." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "A getOneBlog error occurred." });
  }
});

//create a blog
router.post("/", isValidToken, async (req, res) => {
  const title: string = req.body.title;
  const content: string = req.body.content;
  const authorid: number = req.payload.id;

  const newBlogInfo = { title, content, authorid };

  try {
    const DBres = await BlogsDB.createOneBlog(newBlogInfo);
    res.json({ Message: "Blog created successfully.", id: DBres.insertId });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "A createOneBlog error occurred" });
  }
});

//update a blog
router.put("/:id", isValidToken, async (req, res) => {
  let { title, content, tagid } = req.body;
  const id = Number(req.params.id);
  const authorid: number = req.payload.id;

  const updateBlogInfo = { title, content };

  try {
    const update = await BlogsDB.updateOneBlog(updateBlogInfo, id, authorid);
    if (tagid) {
      await BlogTagsDB.updateBlogTag(id, tagid);
      console.log(updateBlogInfo, tagid);
    }

    if (update.affectedRows) {
      res.status(200).json({ message: "blog updated successfully" });
    } else {
      res.status(400).json({ message: "blog update failure X(" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "A updateOneBlog error occurred" });
  }
});

//delete a blog
router.delete("/:id", isValidToken, async (req, res) => {
  const id = Number(req.params.id);
  const authorid = req.payload.id;
  try {
    const destroy = await BlogsDB.destroyOneBlog(id, authorid);

    if (destroy.affectedRows) {
      res.status(200).json({ message: "target blog destroyed" });
    } else {
      res.status(400).json({ message: "target blog escaped deletion" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "A destroyOneBlog error occurred" });
  }
});

export default router;

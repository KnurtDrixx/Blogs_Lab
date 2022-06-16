import * as express from "express";
import BlogTagsDB from "../database/queries/BlogTags";

const router = express.Router();

//current path is /api/BlogTags
//gets all BlogTags
router.get("/", async (req, res) => {
  try {
    const blogTags = await BlogTagsDB.getAllBlogTags();
    if (blogTags) {
      res.json(blogTags);
    } else {
      res.status(400).json({ message: "You are looking for blogTags that don't exist. Stop that." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "A getAllBlogTags error occurred" });
  }
});

//get one author
router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    const blogTags = await BlogTagsDB.getOneBlogTag(id);
    if (blogTags.length) {
      res.json(blogTags[0]);
    } else {
      res.status(400).json({ message: "You are looking for a blogTag that doesn't exist. Stop that." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "A getOneBlogTags error occurred." });
  }
});

export default router;

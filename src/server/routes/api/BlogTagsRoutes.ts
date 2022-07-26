import * as express from "express";
import BlogTagsDB from "../../database/queries/BlogTags";

const router = express.Router();

//current path is /api/BlogTags
//insert blogTag
router.post("/", async (req, res) => {
  const blogid = req.body.blogid;
  const tagid = req.body.tagid;
  try {
    const tags = await BlogTagsDB.insertBlogTag(blogid, tagid);

    res.status(201).json({ message: "blogid tagid pair inserted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "blogid tagid pair insert failure. awwww man." });
  }
});

export default router;

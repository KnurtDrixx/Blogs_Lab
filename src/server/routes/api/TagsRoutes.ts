import * as express from "express";
import TagsDB from "../../database/queries/Tags";

const router = express.Router();

//current path is /api/Tags
//gets all tags
router.get("/", async (req, res) => {
  try {
    const tags = await TagsDB.getAllTags();
    if (tags) {
      res.json(tags);
    } else {
      res.status(400).json({ message: "You are looking for tags that don't exist. Stop that." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "A getAllTags error occurred" });
  }
});

//get one tag
router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    const tag = await TagsDB.getOneTag(id);
    if (tag.length) {
      res.json(tag[0]);
    } else {
      res.status(400).json({ message: "You are looking for a tag that doesn't exist. Stop that." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "A getOneTag error occurred." });
  }
});

export default router;

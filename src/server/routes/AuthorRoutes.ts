import * as express from "express";
import authorsDB from "../database/queries/Authors";

const router = express.Router();

//current path is /api/Authors
//gets all authors
router.get("/", async (req, res) => {
  try {
    const authors = await authorsDB.getAllAuthors();
    if (authors) {
      res.json(authors);
    } else {
      res.status(400).json({ message: "You are looking for authors that don't exist. Stop that." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "A getAllAuthors error occurred" });
  }
});

//get one author
router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    const author = await authorsDB.getOneAuthor(id);
    if (author.length) {
      res.json(author[0]);
    } else {
      res.status(400).json({ message: "You are looking for an author that doesn't exist. Stop that." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "A getOneAuthor error occurred." });
  }
});

export default router;

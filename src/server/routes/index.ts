import * as express from "express";
import Authors from "./AuthorRoutes";
import BlogTags from "./BlogTagsRoutes";
import Tags from "./TagsRoutes";
import Blogs from "./BlogsRoutes";

const router = express.Router();

//current path is /api
router.use("/Authors", Authors);
router.use("/BlogTags", BlogTags);
router.use("/Tags", Tags);
router.use("/Blogs", Blogs);

export default router;

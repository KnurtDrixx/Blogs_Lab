import * as express from "express";

import Authors from "./AuthorRoutes";
import Tags from "./TagsRoutes";
import Blogs from "./BlogsRoutes";
import BlogTags from "./BlogTagsRoutes";
import Contact from "./ContactRoutes";

const router = express.Router();

//current path is /api
// router.use("/Authors", Authors);
router.use("/Contact", Contact);
router.use("/Tags", Tags);
router.use("/Blogs", Blogs);
router.use("/BlogTags", BlogTags);

export default router;

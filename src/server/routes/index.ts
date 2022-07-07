import * as express from "express";
import Authors from "./AuthorRoutes";

import Tags from "./TagsRoutes";
import Blogs from "./BlogsRoutes";
import BlogTags from "./BlogTagsRoutes";
import DonateRouter from "./DonateRoutes";

const router = express.Router();

//current path is /api
router.use("/Authors", Authors);

router.use("/Tags", Tags);
router.use("/Blogs", Blogs);
router.use("/BlogTags", BlogTags);
router.use("/Donate", DonateRouter);

export default router;

import { IBlogTags } from "../../types";
import { query } from "../index";

const getAllBlogTags = () => query<IBlogTags[]>("SELECT * FROM BlogTags", []);
const getOneBlogTag = (id: number) => query<IBlogTags[]>("SELECT * FROM BlogTags WHERE id = ?", [id]);

export default {
  getAllBlogTags,
  getOneBlogTag,
};

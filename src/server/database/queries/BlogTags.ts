import { query } from "../index";

const insertBlogTag = (blogid: number, tagid: number) => query("INSERT INTO BlogTags (blogid, tagid) VALUES (?, ?)", [blogid, tagid]);
const updateBlogTag = (blogid: number, tagid: number) => query("UPDATE BlogTags SET tagid = ? WHERE blogid = ?", [tagid, blogid]);

export default {
  insertBlogTag,
  updateBlogTag,
};

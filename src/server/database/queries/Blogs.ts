import { IBlog, NewBlog } from "../../types";
import { query } from "../index";

const getAllBlogs = () => query<IBlog[]>("SELECT * FROM Blogs", []);
const getOneBlog = (id: number) => query<IBlog[]>("SELECT * FROM Blogs WHERE id = ?", [id]);
const destroyOneBlog = (id: number) => query("DELETE FROM Blogs WHERE id = ?", [id]);
const createOneBlog = (newBlog: NewBlog) => query("INSERT INTO Blogs SET ?", [newBlog]);
const updateOneBlog = (updatedBlog: NewBlog, id: number) => query("UPDATE Blogs SET ? WHERE id=?", [updatedBlog, id]);

export default {
  getAllBlogs,
  getOneBlog,
  destroyOneBlog,
  createOneBlog,
  updateOneBlog,
};

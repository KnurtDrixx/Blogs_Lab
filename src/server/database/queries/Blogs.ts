import { IBlog, NewBlog } from "../../types";
import { query } from "../index";

const getAllBlogs = () =>
  query<IBlog[]>(
    `
    SELECT Blogs.*, Tags.name AS Tag_Name, Authors.name AS Author_Name From Blogs
Join Authors on Authors.id = Blogs.authorid
Left Join BlogTags on BlogTags.blogid = Blogs.id
Left Join Tags on BlogTags.tagid = Tags.id
Order By Blogs.id desc
`,
    []
  );

//! need to fix junk data without tags in database, all blogs need a tag to be displayed

const getOneBlog = (id: number) =>
  query<IBlog[]>(
    `
SELECT Blogs.*, Tags.name AS Tag_Name, Authors.name AS Author_Name, Tags.id as tagid From Blogs
Join Authors on Authors.id = Blogs.authorid
Left Join BlogTags on BlogTags.blogid = Blogs.id
Left Join Tags on BlogTags.tagid = Tags.id
Where Blogs.id = ?;
`,
    [id]
  );

const destroyOneBlog = (id: number, authorid: number) => query("DELETE FROM Blogs WHERE id = ? AND authorid = ?", [id, authorid]);
const destroyOneBlogTag = (id: number) => query("DELETE FROM BlogTags WHERE blogid = ?", [id]);
const createOneBlog = (newBlog: NewBlog) => query("INSERT INTO Blogs SET ?", [newBlog]);
const updateOneBlog = (updatedBlog: NewBlog, id: number, authorid: number) => query("UPDATE Blogs SET ? WHERE id=? AND authorid = ?", [updatedBlog, id, authorid]);

export default {
  getAllBlogs,
  getOneBlog,
  destroyOneBlog,
  destroyOneBlogTag,
  createOneBlog,
  updateOneBlog,
};

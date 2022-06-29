import * as React from "react";
import { useState, useEffect } from "react";
import { IBlog } from "../types";
import { useNavigate } from "react-router-dom";

const AllBlogs = () => {
  const nav = useNavigate();
  const [Blog, setBlog] = useState<IBlog[]>([]);

  useEffect(() => {
    fetch("/api/Blogs")
      .then((res) => res.json())
      .then((data) => setBlog(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div>
        {Blog.map((blog) => (
          <div key={blog.id} className="border border-primary border-2">
            <div>Blog ID: {blog.id}</div>
            <div>Blog Title: {blog.title}</div>
            <div>Author: {blog.Author_Name}</div>
            <div>{blog.content}</div>
            <div>#{blog.Tag_Name}</div>
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => {
                nav(`/Blogs/${blog.id}`);
              }}
            >
              View this Blog
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default AllBlogs;

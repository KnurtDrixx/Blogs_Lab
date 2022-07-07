import * as React from "react";
import { useState, useEffect } from "react";
import { IBlog } from "../types";
import { useNavigate } from "react-router-dom";

const AllBlogs = () => {
  const nav = useNavigate();
  const [Blog, setBlog] = useState<IBlog[]>([]);
  const [color, setColor] = useState<String>("");

  useEffect(() => {
    fetch("/api/Blogs")
      .then((res) => res.json())
      .then((data) => setBlog(data))
      .catch((err) => console.log(err));
  }, []);

  const randomColor = () => {
    const R = Math.floor(Math.random() * 256);
    const G = Math.floor(Math.random() * 256);
    const B = Math.floor(Math.random() * 256);
    return `rgb(${R}, ${G}, ${B})`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setColor(randomColor());
    }, 4000);
    return () => clearInterval(interval);
  }, [color]);

  return (
    <div style={{ backgroundColor: randomColor() }}>
      <h1 className="text-center p-2 m-2" style={{ color: "#CC8899" }}>
        All the Blogs
      </h1>
      <h2>
        <div className="d-flex justify-content-center">
          <button
            className="btn btn-info btn-lg"
            onClick={() => {
              nav(`/Blogs/Donate`);
            }}
          >
            Donate
          </button>
        </div>
      </h2>
      <div style={{ backgroundColor: randomColor() }}>
        {Blog.map((blog) => (
          <div key={blog.id} className="border border-primary border-2 p-2 m-2" style={{ backgroundColor: `${color}` }}>
            <div style={{ backgroundColor: randomColor(), color: randomColor() }}>Blog ID: {blog.id}</div>
            <h1 className="p-2 m-2" style={{ backgroundColor: randomColor(), color: randomColor() }}>
              Blog Title: {blog.title}
            </h1>
            <div style={{ backgroundColor: randomColor(), color: randomColor() }}>Author: {blog.Author_Name}</div>
            <div style={{ backgroundColor: randomColor(), color: randomColor() }}>{blog.content}</div>
            <div style={{ backgroundColor: randomColor(), color: randomColor() }}>#{blog.Tag_Name}</div>
            <div className="d-flex justify-content-center">
              <button
                className="btn btn-primary btn-lg"
                type="button"
                onClick={() => {
                  nav(`/Blogs/${blog.id}`);
                }}
              >
                View this Blog
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBlogs;

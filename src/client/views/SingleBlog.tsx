import * as React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { IBlog } from "../types";

const SingleBlog = () => {
  const nav = useNavigate();
  const [blog, setBlog] = useState<IBlog>();
  const { id } = useParams();

  const deleteBlog = () => {
    fetch(`/api/Blogs/${id}`, {
      method: "DELETE",
      // headers: { "content-type": "application/json" },
      // body: JSON.stringify({ content: chirpContent, location: chirpLocation }),
    })
      .then((res) => res.json())
      .then((message) => {
        console.log(message);
        alert(`Blog ${id} has been found and DELETED`);
        nav(`/Blogs`);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetch(`/api/Blogs/${id}`)
      .then((res) => res.json())
      .then((data) => setBlog(data))
      .catch((err) => console.log(err));
  }, []);

  if (!blog) {
    return <div>This Blog is Loading</div>;
  } else {
    return (
      <>
        <div>
          <div key={blog.id}>
            <div>Blog ID: {blog.id}</div>
            <div>Blog Title: {blog.title}</div>
            <div>Author: {blog.Author_Name}</div>
            <div>{blog.content}</div>
            <div>#{blog.Tag_Name}</div>
          </div>
        </div>
        <button
          onClick={() => {
            nav(`/Blogs/Edit/${id}`);
          }}
        >
          Wouldst tho Edit a Blog?
        </button>
        <button
          onClick={() => {
            deleteBlog();
          }}
        >
          Wouldst tho Delete a Blog?
        </button>
      </>
    );
  }
};

export default SingleBlog;

import * as React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { IBlog } from "../types";

const SingleBlog = () => {
  const nav = useNavigate();
  const [blog, setBlog] = useState<IBlog>();
  const { id } = useParams();
  const [delete1, setDelete1] = useState<boolean>(false);
  const [delete2, setDelete2] = useState<boolean>(false);
  const [delete3, setDelete3] = useState<boolean>(false);
  const [delete4, setDelete4] = useState<boolean>(false);
  const [deleteFinal, setDeleteFinal] = useState<boolean>(false);
  const [color, setColor] = useState<String>("");

  const deleteBlog = () => {
    fetch(`/api/Blogs/${id}`, {
      method: "DELETE",
      // headers: { "content-type": "application/json" },
      // body: JSON.stringify({ content: chirpContent, location: chirpLocation }),
    })
      .then((res) => res.json())
      .then((message) => {
        console.log(message);
        alert(`Blog ${id} has been found and KILLED successfully`);
        nav(`/Blogs`);
      })
      .catch((err) => console.log(err));
  };

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
          <h1 className="text-center m-2 p-2" style={{ backgroundColor: "#FFA500", color: "#6f2da8" }}>
            Single Blog
          </h1>
          <div className="border border-primary border-2 p-2 m-2" key={blog.id}>
            <div style={{ backgroundColor: randomColor(), color: randomColor() }}>Blog ID: {blog.id}</div>
            <h1 className="text-center m-2 p-2" style={{ backgroundColor: randomColor(), color: randomColor() }}>
              Blog Title: {blog.title}
            </h1>
            <div style={{ backgroundColor: randomColor(), color: randomColor() }}>Author: {blog.Author_Name}</div>
            <div style={{ backgroundColor: randomColor(), color: randomColor() }}>{blog.content}</div>
            <div style={{ backgroundColor: randomColor(), color: randomColor() }}>#{blog.Tag_Name}</div>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <button
            className="btn btn-warning btn-lg"
            onClick={() => {
              nav(`/Blogs/Edit/${id}`);
            }}
          >
            Wouldst tho Edit a Blog?
          </button>
        </div>

        {/* deleteButton */}
        {/* #ts-ignore */}
        <marquee behavior="alternate" scrollamount="10">
          <button
            className="btn btn-danger btn-lg"
            onClick={() => {
              setDelete1(true);
            }}
          >
            Wouldst tho Delete a Blog?
          </button>
        </marquee>
        <marquee behavior="alternate" scrollamount="20">
          <button
            className={`${delete1 ? `visible` : `invisible`} btn btn-danger btn-lg`}
            onClick={() => {
              setDelete2(true);
            }}
          >
            Are You Sure?
          </button>
        </marquee>

        <marquee behavior="alternate" scrollamount="30">
          <button
            className={`${delete2 ? `visible` : `invisible`} btn btn-danger btn-lg`}
            onClick={() => {
              setDelete3(true);
            }}
          >
            Why do this?
          </button>
        </marquee>

        <marquee behavior="alternate" scrollamount="40">
          <button
            className={`${delete3 ? `visible` : `invisible`} btn btn-danger btn-lg`}
            onClick={() => {
              setDelete4(true);
            }}
          >
            Please Stop I Have 3 Kids!
          </button>
        </marquee>

        <marquee behavior="alternate" scrollamount="45">
          <button
            className={`${delete4 ? `visible` : `invisible`} btn btn-danger btn-lg`}
            onClick={() => {
              setDeleteFinal(true);
            }}
          >
            Look at Me While You Delete Me!
          </button>
        </marquee>

        <marquee behavior="alternate" scrollamount="10">
          <button
            className={`${deleteFinal ? `visible` : `invisible`} btn btn-danger btn-lg`}
            onClick={() => {
              deleteBlog();
            }}
          >
            Final Delete?
          </button>
        </marquee>
      </>
    );
  }
};

export default SingleBlog;

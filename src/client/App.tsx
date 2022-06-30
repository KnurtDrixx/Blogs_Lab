import * as React from "react";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { IBlog } from "./types";
import Navbar from "../components/Navbar";
import AllBlogs from "./views/AllBlogs";
import NewBlog from "./views/NewBlog";
import SingleBlog from "./views/SingleBlog";
import UpdateBlog from "./views/UpdateBlog";

const App = (props: AppProps) => {
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
    }, 3000);
    return () => clearInterval(interval);
  }, [color]);

  return (
    <main className="container my-5" style={{ background: "#30D5C8" }}>
      <Navbar />

      <Routes>
        <Route path="/Blogs" element={<AllBlogs />} />
        <Route path="/Blogs/:id" element={<SingleBlog />} />
        <Route path="/Blogs/New" element={<NewBlog />} />
        <Route path="/Blogs/Edit/:id" element={<UpdateBlog />} />
      </Routes>
    </main>
  );
};

interface AppProps {}

export default App;

import * as React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { IBlog, ITags, IAuthors } from "../types";

const UpdateBlog = () => {
  const [title, setBlogTitle] = useState<string>("");
  const [content, setBlogContent] = useState<string>("");
  const [tagsArray, setTagsArray] = useState<ITags[]>([]);
  const [selectedTagId, setSelectedTagId] = useState<number>(0);
  const [authorsArray, setAuthorsArray] = useState<IAuthors[]>([]);
  const [selectedAuthorId, setSelectedAuthorId] = useState<string>("");

  const { id } = useParams();
  const nav = useNavigate();

  const handleUpdateBlog = () => {
    if (!selectedAuthorId) {
      alert("Blog must have Author! CHOOSE");
      return;
    }
    if (!selectedTagId) {
      alert("Blog must have Tags! CHOOSE Wisely");
      return;
    }

    fetch(`/api/Blogs/${id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ title, content, authorid: selectedAuthorId, tagid: selectedTagId }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        nav(`/Blogs/${id}`);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetch(`/api/Blogs/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBlogTitle(data.title);
        setBlogContent(data.content);
        setSelectedAuthorId(data.authorid);
        setSelectedTagId(data.tagid);
      })
      .catch((err) => console.log(err));
  }, []);

  const getAllTags = () => {
    fetch(`/api/Tags`)
      .then((res) => res.json())
      .then((data) => {
        setTagsArray(data); // set the data to state if no error
      })
      .catch((error) => {
        console.log(`Get All Tags Error...\n`);
        console.error(error);
      });
  };

  const getAllAuthors = () => {
    fetch(`/api/Authors`)
      .then((res) => res.json())
      .then((data) => {
        setAuthorsArray(data); // set the data to state if no error
      })
      .catch((error) => {
        console.log(`Get All Tags Error...\n`);
        console.error(error);
      });
  };

  useEffect(() => {
    getAllTags();
  }, []);
  useEffect(() => {
    getAllAuthors();
  }, []);

  return (
    <>
      <div>
        <h1 className="text-center p-2" style={{ background: "#CBC3E3", color: "#32CD32" }}>
          Edit the Blog
        </h1>
        <form>
          <label>Blog Title:</label>
          <input placeholder="blogTitle" type="text" value={title} onChange={(e) => setBlogTitle(e.target.value)} />
          <label>Blog Content:</label>
          <input placeholder="blogContent" type="text" value={content} onChange={(e) => setBlogContent(e.target.value)} />
          {/* Author Dropdown */}
          <select onChange={(e) => setSelectedAuthorId(String(e.target.value))} className="form-select my-1" value={String(selectedAuthorId)}>
            <option value={0}>Pick da Author</option>
            {authorsArray.map((author) => (
              <option key={`Author-${author.id}`} value={author.id}>
                {author.name}
              </option>
            ))}
          </select>
          {/* Tag Dropdown */}
          <select onChange={(e) => setSelectedTagId(Number(e.target.value))} className="form-select my-1" value={Number(selectedTagId)}>
            <option value={0}>Pick a tag</option>
            {tagsArray.map((tag) => (
              <option key={`Tag-${tag.id}`} value={tag.id}>
                {tag.name}
              </option>
            ))}
          </select>
        </form>
        <div className="d-flex justify-content-center">
          <button className="btn btn-success btn-lg" onClick={() => handleUpdateBlog()}>
            Submit New Blog
          </button>
        </div>
      </div>
    </>
  );
};

export default UpdateBlog;

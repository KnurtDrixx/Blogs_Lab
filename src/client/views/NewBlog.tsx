import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { IBlog, ITags, IAuthors } from "../types";
import { apiService } from "../utilities/apiService";

const NewBlog = () => {
  const nav = useNavigate();
  const [title, setBlogTitle] = useState<string>("");
  const [content, setBlogContent] = useState<string>("");
  const [tagsArray, setTagsArray] = useState<ITags[]>([]);
  const [selectedTagId, setSelectedTagId] = useState<number>(0);
  const [authorsArray, setAuthorsArray] = useState<IAuthors[]>([]);
  const [selectedAuthorId, setSelectedAuthorId] = useState<string>("");

  const handleCreateBlog = () => {
    let tempblogid: number = 0;

    // if (!selectedAuthorId) {
    //   alert("Blog must have Author! CHOOSE");
    //   return;
    // }
    if (!selectedTagId) {
      alert("Blog must have Tags! CHOOSE Wisely");
      return;
    }

    apiService(`/api/Blogs/`, "POST", { title, content })
      .then((data) => {
        //!alert("You dare make a new Blog? You have success.");
        console.log(data);
        tempblogid = data.id;
        return apiService("/api/BlogTags", "POST", { blogid: data.id, tagid: selectedTagId });
      })

      .then((data) => {
        console.log(data);
        nav(`/Blogs/${tempblogid}`);
      })
      .catch((err) => console.log(err));
  };

  const getAllTags = () => {
    apiService(`/api/Tags`)
      .then((data) => {
        setTagsArray(data); // set the data to state if no error
      })
      .catch((error) => {
        console.log(`Get All Tags Error...\n`);
        console.error(error);
      });
  };

  const getAllAuthors = () => {
    apiService(`/api/Authors`)
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
        <h1 className="text-center m-2 p-2" style={{ backgroundColor: "#00008B", color: "#FF00FF" }}>
          Create a New Blog
        </h1>
        <form>
          <label>Blog Title:</label>
          <input placeholder="blogTitle" type="text" value={title} onChange={(e) => setBlogTitle(e.target.value)} />
          <label>Blog Content:</label>
          <input placeholder="blogContent" type="text" value={content} onChange={(e) => setBlogContent(e.target.value)} />
          {/* Author Dropdown */}
          {/* <select onChange={(e) => setSelectedAuthorId(String(e.target.value))} className="form-select my-1" value={String(selectedAuthorId)}>
            <option value={0}>Pick da Author</option>
            {authorsArray.map((author) => (
              <option key={`Author-${author.id}`} value={author.id}>
                {author.name}
              </option>
            ))}
          </select> */}
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
          <button className="btn btn-success btn-lg" onClick={() => handleCreateBlog()}>
            Submit New Blog
          </button>
        </div>
      </div>
    </>
  );
};

export default NewBlog;

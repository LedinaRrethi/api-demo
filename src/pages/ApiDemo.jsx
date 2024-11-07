import React, { useState } from "react";
import BooksList from "../components/Books";
import ReposList from "../components/GitHubRepos";
import "../styles/ApiDemo.css"

const ApiDemo = () => {
  const [toggle, setToggle] = useState("books");
  const [filter, setFilter] = useState("");

  return (
    <div>
      <h1>API Demo</h1>

      <div className="buttonContainer">
        <button id="booksButton" onClick={() => setToggle("books")}>Show Books API</button>
        <button id="reposButton" onClick={() => setToggle("repos")}>Show Repos API</button>
      </div>

      <input
        type="text"
        placeholder="Filter results"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      <div>
        {toggle === "books" && <BooksList filter={filter} />}
        {toggle === "repos" && <ReposList filter={filter} />}
      </div>
    </div>
  );
};

export default ApiDemo;

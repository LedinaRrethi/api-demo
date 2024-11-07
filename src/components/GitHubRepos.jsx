import React, { useState, useEffect } from "react";

const GitHubRepos = ({ filter }) => {
  const [repos, setRepos] = useState([]);
  const [loading , setLoading] = useState(false);
  const [error , setError] = useState();


   useEffect(() => {

    const fetchRepos =  async () => {
        setLoading(true);
        setError(false);
        try {
            const response = await fetch('https://api.github.com/search/repositories?q=language:javascript+created:%3E2024-11-01&sort=stars&order=desc')
            if(!response.ok){
                throw new Error("Network response was not ok.");
            }
            const data = await response.json();
            console.log(data);
            setRepos(data.items);
        } catch (error) {
            console.error(`Error fetching repositories : ${error.message}`);
            setError(true);  
        }finally{
            setLoading(false);
        }
    }

    fetchRepos();
  }, []);


  const filteredRepos = repos.filter((repo) =>
    repo.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
    {loading ? ( 
        <div> Loading ...</div>
    ) : error ? (
        <div>Error fetching repositories.Please , try again.</div>
    ) : (
        <div>
      <h2>Repositories List</h2>
      <ul>
        {filteredRepos.map((repo) => (
          <li key={repo.id}>
            <strong>Name:</strong> {repo.name} <br />
            <strong>Stars:</strong> {repo.stargazers_count} <br />
            <strong>URL:</strong>{" "}
            <a href={repo.html_url} target="_blank" >
              {repo.html_url}
            </a>
          </li>
        ))}
      </ul>
    </div>
    )}
    </>
  );
};

export default GitHubRepos;

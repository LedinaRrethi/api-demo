import React, { useState, useEffect } from "react";

const BooksList = ({ filter }) => {
  const [books, setBooks] = useState([]);
  const [loading , setLoading] = useState(false);
  const [error , setError] = useState("");

  useEffect(() => {

    const fetchBooks =  async () => {
        setLoading(true);
        setError(false);
        try {
            const response = await fetch('https://openlibrary.org/search.json?q=crime&fields=key,title,author_name,editions,first_publish_year&limit=5&page=1&sort=new')
            if(!response.ok){
                throw new Error("Network response was not ok.");
            }
            const data = await response.json();
            console.log(data);
            setBooks(data.docs);
        } catch (error) {
            console.error(`Error fetching repositories : ${error.message}`);
            setError(error.message);  
        }finally{
            setLoading(false);
        }
    }

    fetchBooks();
  }, []);

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(filter.toLowerCase())
  );


  return (
    <>
    {loading ? (
        <div> Loading... </div>
    ) : error ? (
        <div> {error} </div>
    ) : (
    <div>
      <h2>Books List</h2>
      <ul>
        {filteredBooks.map((book) => (
          <li key={book.key}>
            <strong>Title:</strong> {book.title} <br />
            <strong>Author:</strong> {book.author_name} <br />
            <strong>First Published:</strong> {book.first_publish_year}
          </li>
        ))}
      </ul>
    </div>
    )
    }
    </>
  );
};

export default BooksList;

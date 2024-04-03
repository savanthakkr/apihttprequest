import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const UpdateBook = () => {

  const navigate = useNavigate();

  const token = localStorage.getItem('accessToken');
  const bookId = localStorage.getItem('accessBookId');

 

  const [bookData, setBookData] = useState({});

  useEffect(() => {
    const fetchBookData = async () => {
  
      try {
        const response = await fetch(`http://localhost:5000/getBookById/${bookId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await response.json();
        setBookData(data.data[0]);
        console.log(data)
      } catch (error) {
        console.error('Error fetching book data:', error);
      }
    };
    fetchBookData();
  }, [bookId]);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
  };



  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const xhr = new XMLHttpRequest();
      xhr.open('PUT', `http://localhost:5000/updateBook/${bookData.id}`, true);
      xhr.setRequestHeader('Authorization', `Bearer ${token}`);
      xhr.setRequestHeader('Content-Type', 'application/json');

      xhr.onload = () => {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          console.log(response.data);
          navigate('/allBooks');
        } else {
          console.error('Error updating book:', xhr.statusText);
        }
      };

      xhr.onerror = () => {
        console.error('Error updating book:', xhr.statusText);
      };

      xhr.send(JSON.stringify(bookData));
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  return (
    <div>
      <div className="container mt-5">
        <h2>Update Book</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="book_id" className="form-label">
              ID  
            </label>
            <input
              type="text"
              className="form-control"
              id="book_id"
              name="book_id"
              value={bookData.book_id || ''} 
              readOnly
            />
          </div>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name="title" value={bookData.title} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" name="description" value={bookData.description} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="published_year" className="form-label">Published Year</label>
            <input type="text" className="form-control" id="published_year" name="published_year" value={bookData.published_year} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="quantity_available" className="form-label">Quantity Available</label>
            <input type="text" className="form-control" id="quantity_available" name="quantity_available" value={bookData.quantity_available} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="author_id" className="form-label">Author ID</label>
            <input type="text" className="form-control" id="author_id" name="author_id" value={bookData.author_id} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="genre_id" className="form-label">Genre ID</label>
            <input type="text" className="form-control" id="genre_id" name="genre_id" value={bookData.genre_id} onChange={handleChange} />
          </div>
          <button type="submit" className="btn btn-primary">Update Book</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateBook;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const UpdateBook = () => {
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    description: '',
    published_year: '',
    quantity_available: '',
    author_id: '',
    genre_id: '',
  });

  const navigate = useNavigate();

  const token = localStorage.getItem('accessToken');
  const bookId = localStorage.getItem('accessBookId');

  // Function to handle form field changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    const fetchBookData = async () => {
      const response = await axios.get(`http://localhost:5000/getBook/${bookId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFormData({
        id: response.data.id,
        title: response.data.title,
        description: response.data.description,
        published_year: response.data.published_year,
        quantity_available: response.data.quantity_available,
        author_id: response.data.author_id,
        genre_id: response.data.genre_id,
      });
    };

    if (bookId) {
      fetchBookData();
    }
  }, [token, bookId]);



  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const xhr = new XMLHttpRequest();
      xhr.open('PUT', `http://localhost:5000/updateBook/${formData.id}`, true);
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

      xhr.send(JSON.stringify(formData));
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2>Update Book</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="id" className="form-label">ID</label>
              <input
                type="text"
                className="form-control"
                id="id"
                name="id"
                value={formData.id}
                onChange={handleInputChange}
                disabled
              />
            </div>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="publishedYear" className="form-label">Published Year</label>
              <input
                type="text"
                className="form-control"
                id="publishedYear"
                name="published_year"
                value={formData.published_year}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="quantityAvailable" className="form-label">Quantity Available</label>
              <input
                type="number"
                className="form-control"
                id="quantityAvailable"
                name="quantity_available"
                value={formData.quantity_available}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="authorId" className="form-label">Author ID</label>
              <input
                type="text"
                className="form-control"
                id="authorId"
                name="author_id"
                value={formData.author_id}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="genreId" className="form-label">Genre ID</label>
              <input
                type="text"
                className="form-control"
                id="genreId"
                name="genre_id"
                value={formData.genre_id}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateBook;
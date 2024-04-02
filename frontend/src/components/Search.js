import React, { useState } from 'react';
import axios from 'axios';
import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const Search = () => {
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => {
        try {
            const token = localStorage.getItem('token');
            // if (!token) {
                

            //     console.error('No token found. User is not authenticated.');
            //     return;
            // }
            const response = await fetch(`http://localhost:5000/search?q=${query}`);

            setSearchResults(response.data.data); 
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="input-group mb-4">
                        <input
                            type="text"
                            className="form-control form-control-md" 
                            style={{ width: '150px' }}
                            placeholder="Search..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-primary btn-sm"
                                type="button"
                                onClick={handleSearch}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="table-responsive">
                        <table className="table table-sm">
                            <thead>
                                <tr>
                                    <th>Book Title</th>
                                    <th>Author Name</th>
                                    <th>Description</th>
                                    <th>Published Year</th>
                                </tr>
                            </thead>
                            <tbody>
                                {searchResults.map((result) => (
                                    <tr key={result.book_id}>
                                        <td>{result.book_title}</td>
                                        <td>{result.author_name}</td>
                                        <td>{result.book_description}</td>
                                        <td>{result.published_year}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Search;

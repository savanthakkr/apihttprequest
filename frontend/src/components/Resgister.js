import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
    password: '',
    cPassword: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({});
    try {
      if (!formData.name) {
        alert({ name: 'Name is required' });
        return;
      }
      if (!formData.email) {
        alert({ email: 'Email is required' });
        return;
      }
      if (!formData.number) {
        alert({ number: 'Number is required' });
        return;
      }
      if (!formData.password) {
        alert({ password: 'Password is required' });
        return;
      }
      if (formData.password !== formData.cPassword) {
        alert({ cPassword: 'Passwords do not match' });
        return;
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const response = await fetch(
        'http://localhost:5000/register',
        {
          method: 'POST',
          body: JSON.stringify(formData),
          ...config,
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      const responseData = await response.json();
      console.log(responseData.data);
      navigate('/login');
    } catch (error) {
      console.error('Error registering :', error.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center"> {/* Center the form */}
        <div className="col-md-6"> {/* Limit the width */}
          <h2>Register Book</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">name</label>
              <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleInputChange} isInvalid={!!errors.name} />
              <div className="invalid-feedback">{errors.name}</div>
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">email</label>
              <textarea className="form-control" id="email" name="email" value={formData.email} onChange={handleInputChange} isInvalid={!!errors.email} />
              <div className="invalid-feedback">{errors.email}</div>
            </div>
            <div className="mb-3">
              <label htmlFor="number" className="form-label">number</label>
              <input type="number" className="form-control" id="number" name="number" value={formData.number} onChange={handleInputChange} isInvalid={!!errors.number} />
              <div className="invalid-feedback">{errors.number}</div>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">password</label>
              <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleInputChange} isInvalid={!!errors.password} />
              <div className="invalid-feedback">{errors.password}</div>
            </div>
            <div className="mb-3">
              <label htmlFor="cPassword" className="form-label">Confirm Password </label>
              <input type="text" className="form-control" id="cPassword" name="cPassword" value={formData.cPassword} onChange={handleInputChange} isInvalid={!!errors.cPassword} />
              <div className="invalid-feedback">{errors.cPassword}</div>
            </div>
            <button type="submit" className="btn btn-primary">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
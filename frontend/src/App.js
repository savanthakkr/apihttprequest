import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Search from '../src/components/Search';
import Login from '../src/components/Login';
import AllBook from './components/AllBook';
import AddBook from './components/AddBook';
import UpdateBook from './components/UpdateBook';
import Register from './components/Resgister';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path='/allBooks' element={<AllBook/>}/>
      <Route path='/addBooks' element={<AddBook/>}/>
      <Route path='/updateBook/:id' element={<UpdateBook/>}/>
      <Route path='/search' element={<Search/>}/>
    </Routes>
  );
}

export default App;

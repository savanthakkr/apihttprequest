const { getAllAuthors, addAuthor, updateAuthor, deleteAuthor } = require("../controller/authorController");

const { getAllBooks, deleteBook, addBook, updateBoook } = require("../controller/bookController");
const express = require('express');
const { searchBooksAndAuthors } = require("../controller/searchController");
const { checkLogin } = require("../controller/loginController");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();

//login
router.post('/login',checkLogin)

//all user
router.get('/allBooks', verifyToken ,getAllBooks)

//add book
router.post('/addBook',verifyToken,addBook)

//update book 
router.put('/updateBook/:id',verifyToken,updateBoook)

//get all authors
router.get('/allAuthors',verifyToken, getAllAuthors)

//add author
router.post('/addAuthor', verifyToken,addAuthor) 

//update author
router.put('/updateAuthor/:id',verifyToken,updateAuthor)

//delete author
router.delete('/deleteAuthor/:id',verifyToken,deleteAuthor)

//delete book
router.delete('/deleteBook/:id',verifyToken,deleteBook)

//search
router.get('/search',verifyToken,searchBooksAndAuthors)

module.exports = router;
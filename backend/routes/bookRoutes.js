const { getAllAuthors, addAuthor, updateAuthor, deleteAuthor } = require("../controller/authorController");

const { getAllBooks,getBookById, deleteBook, addBook, updateBoook,uploadFileBook } = require("../controller/bookController");
const express = require('express');
const { searchBooksAndAuthors } = require("../controller/searchController");
const { checkLogin,uploadFile } = require("../controller/loginController");
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

//upload image
router.post('/uploadFile/:id', verifyToken,uploadFile) 


//upload image book
router.post('/uploadFileBook/:id', verifyToken,uploadFileBook) 


//update author
router.put('/updateAuthor/:id',verifyToken,updateAuthor)

//delete author
router.delete('/deleteAuthor/:id',verifyToken,deleteAuthor)

//delete book
router.delete('/deleteBook/:id',verifyToken,deleteBook)

//search
router.get('/search',verifyToken,searchBooksAndAuthors)

//getBookById 
router.get('/getBookById/:id',verifyToken,getBookById)

module.exports = router;
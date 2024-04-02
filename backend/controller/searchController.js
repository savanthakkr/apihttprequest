const { verifyToken } = require('../middleware/auth');
const db = require('../config/db')

const express = require('express')


const searchBooksAndAuthors = async (req, res) => {
    try {
        const query = req.query.q;

        const sqlQuery = `
            SELECT  
                b.book_id,
                b.title AS book_title,
                b.description AS book_description,
                b.published_year,
                b.quantity_available,
                a.author_id,
                a.author_name,
                a.biography,
                a.genre
            FROM 
                book b
            INNER JOIN 
                author a ON b.author_id = a.author_id
            WHERE 
                b.title LIKE '%${query}%'
                OR b.description LIKE '%${query}%'
                OR b.published_year LIKE '%${query}%'
                OR a.author_name LIKE '%${query}%'
                OR a.biography LIKE '%${query}%'
                OR a.genre LIKE '%${query}%';
        `;

        const data = await db.query(sqlQuery);

        if (!data[0].length) {
            return res.status(404).send({
                message: 'No records found!'
            });
        }

        res.status(200).send({
            message: 'Data fetched!',
            data: data[0]
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: "Error in search API!"
        });
    }
}


module.exports = {searchBooksAndAuthors}
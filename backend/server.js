const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const path = require('path')

//env
const dotenv = require('dotenv');
const mysqlpool = require('./config/db');
dotenv.config();

const PORT = process.env.PORT || 5000;

const { uploadFile } = require('./controller/loginController');

app.use(morgan('dev'))
app.use(express.json());
app.use(cors({allowedHeaders:'*'}))
app.use(cookieParser());
app.use(fileUpload());
app.use('/public', express.static(path.join(__dirname, './public/')))

app.use('/', require('./routes/bookRoutes'));


//testing route
app.get('/', (req, res) => {
    res.status(200).send('hello world');
})

mysqlpool.query('SELECT 1 + 1 AS solution')
    .then(() => {
        console.log('database connected')

        app.listen(PORT, () => {
            console.log(`http://localhost:${PORT}`)
        });
    })
    .catch((err) => {
        console.log(err);
    });
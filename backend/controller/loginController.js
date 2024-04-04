const { verifyToken } = require('../middleware/auth');
const db = require('../config/db')
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');



const generateToken = (user) => {
    return jwt.sign({ email: user.email, password: user.password }, 'crud', { expiresIn: '24h' });
};



const checkLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const [existingUser] = await db.query('SELECT * FROM user WHERE email = ? AND password = ?', [email, password]);


        
        if (existingUser) {
            const token = generateToken(existingUser);
            res.cookie('jwt','Bearer '+ token,{maxAge:24*60*60*1000,httpOnly:true}
            
        
        )

            // Pass existingUser instead of user
            return res.status(200).send({ 
                message: 'Login success!',
                token: token 
            });
        } else {
            return res.status(401).send({ message: 'Incorrect email or password!' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Error in login check API!',
            error
        });
    }
    
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const [existingUser] = await db.query('SELECT * FROM register WHERE email = ? ', [email]);

    
        if (existingUser.length>0) {
            
            const user = existingUser[0];
            const passwordcheck = await db.query('SELECT * FROM register WHERE password = ? ', [password]);
        
            if(passwordcheck){
                const token = generateToken(user);
                return res.status(200).send({message:"login" , token: token})
            }

            // Pass existingUser instead of user
            return res.status(200).send({ 
                message: 'Login success!',
                token: token 
            });
        } else {
            return res.status(401).send({ message: 'Incorrect email or password!' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Error in login check API!',
            error
        });
    }
    
}



// when email and password are exist in database then login otherwise not plesae provde me a code 



const uploadFile = async (req, res) => {
    try {
        console.log(req.files)
        let id = req.params.id  
        let image = req.files.image //key and auth
        if(image.length>1){
            throw new error('multiple file not allowed!')
        }

        const dirExists = fs.existsSync('public/assets');
        if (!dirExists) {
            fs.mkdirSync('public/assets', { recursive: true });
        }

        if (image == undefined || image == null) throw new Error("file not found!");

       // let savePath = `/public/assets/${Date.now()}.${image.name.split(".").pop()}`

       let savePath = `/public/assets/${Date.now()}.${image.name.split(".").pop()}`
        image.mv(path.join(__dirname, ".." + savePath), async (err) => {
            if (err) throw new Error("error in uploading")

            else {
                const updateQuery = 'UPDATE user SET image = ? WHERE id = ?'
                await db.query(updateQuery, [savePath, id]);
                res.status(201).send({
                    message: 'file uploaded!'
                })
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'error in file upload api!' });
    }
}


// i want to show the image file not found in request in this function please resolve 


module.exports = {checkLogin, uploadFile, login }
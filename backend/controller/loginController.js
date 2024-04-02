const { verifyToken } = require('../middleware/auth');
const db = require('../config/db')
const jwt = require('jsonwebtoken');



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


module.exports = {checkLogin}
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET = process.env.SECRET_KEY;

const generateJwt = (username) => {
    const payload = { username: username };
    return jwt.sign(payload, SECRET, { expiresIn: '1h' });
};

const auth = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];
    if (!token) {
        res.status(403).json({ message: 'Token not found' });
    }
    else {
        jwt.verify(token, SECRET, (err, user) => {
            if (err) {
                res.status(403).json({ message: 'Invalid Token' });
            }
            else {
                req.user = user;
                next();
            }
        })
    }
}

module.exports = {
    auth,
    generateJwt
}
const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken'); // Import the jwt module
const { save, getUserDocuments } = require('../controllers/document');

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    jwt.verify(token, 'mykey111111', (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid token' });
        }
        req.userId = decoded.userId;
        
        next();
    });
    
};

router.route('/saveDoc').post(verifyToken, save);
router.route('/').get(verifyToken,getUserDocuments)

module.exports = router;

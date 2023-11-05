const express = require("express");
const router = express.Router();

const {getUsers,addUser,login} = require('../controllers/users');

router.route('/').get(getUsers);
router.route('/add').post(addUser);
router.route('/login').post(login);

module.exports = router;
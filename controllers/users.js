const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const getUsers =  async(req,res) =>{
    try {
        const users = await User.find();
        res.json({data : users});
      } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve users' });
      }
};

const addUser =  async(req,res) =>{
    const { firstName, lastName, username, password } = req.body;

    try {
      // Check if the username is already taken
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ error: 'Username already exists' });
      }
  
         // Generate a salt
        const salt = await bcrypt.genSalt(10);

      // Hash the password before saving it to the database
      const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) {
            reject(err);
          } else {
            resolve(hash);
          }
        });
      });
  
  
      // Create a new user
      const newUser = new User({
        firstName,
        lastName,
        username,
        password: hashedPassword
      });
      
     
      console.log('new' , newUser);
      await newUser.save();
      res.status(201).json({ message: 'User Registered successfully' });
    } catch (error) {
      res.status(500).json({ error:  error + ' Registration failed' });
    }
};


const login =  async(req,res) =>{
    const { username, password } = req.body;

    try {
      // Find the user by username
      const user = await User.findOne({ username });
  
      console.log({user});
      if (!user) {
        return res.status(401).json({ error: 'Authentication failed' });
      }
  
      // Check if the provided password matches the hashed password in the database
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      console.log({passwordMatch});
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Authentication failed' });
      }
  
      // Create a JWT token with the user's data
      const token = jwt.sign(
        {
          username: user.username,
          userId: user._id,
        },
        'mykey111111', // Replace with a secure secret key
        {
          expiresIn: '1h', // Token expiration time
        }
      );
  
      user.tokens.push(token);
      await user.save();

      console.log({token});
      res.status(200).json( { message:'User Login Successfull', token: token });
    } catch (error) {
      res.status(500).json({ error: 'Login failed' });
    }
};


module.exports = {getUsers,addUser,login};
/*
    ==================
    Title: mclaurine-composer-routes.js, 
    Author: Trevor McLaurine
    Date: 6/17/2023
    Description: Initializes the routes used for the composer API
*/

const express = require('express')
const User = require('../models/McLaurine-user')
const mongoose = require('mongoose')

const bcrypt = require('bcryptjs')
const saltRounds = 10; 

const router = express.Router();

async function findUser (user) {
    let userFound = User.findOne({ 'userName': user })
    return userFound
}

router.post('/signup', async (req, res) => {
    //do signup stuff - need to add password hashing
    let newUser = {
        user: req.body.userName,
        password: req.body.password,
        email: req.body.email
    }
    try {
        let user = findUser(newUser.user)

        if(!user) {
            await User.create(newUser)
            res.status(200).json(newUser)
        }
        else {
            res.status(401).send({ 'message': `MongoDB Exception: 501`})
        }
    }
    catch(e) {
        res.status(500).send({ 'message': `Server Exception: ${e.message}`})
    }
})

router.post('/login', async (req, res) => {
    //do login stuff
})
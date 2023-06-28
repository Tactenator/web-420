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

router.post('/signup', async (req, res) => {
    //do signup stuff
})

router.post('/login', async (req, res) => {
    //do login stuff
})
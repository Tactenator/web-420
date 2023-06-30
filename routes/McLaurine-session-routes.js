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
    let userFound = await User.findOne({ 'userName': user })
    return userFound
}

/**
 * signup
 * @openapi
 * /api/signup:
 *   post:
 *     tags:
 *       - User
 *     description: Sign Up API
 *     summary: Create a new user and add the user to the database
 *     requestBody:
 *       description: Create a new user
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - userName
 *               - password
 *               - emailAddress
 *             properties:
 *               userName:
 *                 type: string
 *               password:
 *                 type: string
 *               emailAddress:
 *                 type: string
 *     responses:
 *       '200':
 *         description: A new user is registered and put into the API
 *       '401':
 *         description: That username is already being used.
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception.
 */

router.post('/signup', async (req, res) => {
    //do signup stuff - need to add password hashing
    let newUser = {
        userName: req.body.userName,
        password: req.body.password,
        emailAddress: req.body.emailAddress
    }

    try {
        let user = findUser(newUser.userName)

        if(!user) {
            // Again, callbacks aren't working, but I still wanted to add the code that shows that I understand the assignment. 

            // newUser.password = bcrypt.hashSync(req.body.password, saltRounds);
            // await User.create(newUser, function (err, user) {
            //     if (err) {
            //       console.log(err);
            //       res.status(501).send({
            //         message: `MongoDB Exception: ${err}`,
            //       });
            //     } else {
            //       console.log(user);
            //       res.send({ message: 'New User Registered.' });
            //     }
            //   });

            newUser.password = bcrypt.hashSync(req.body.password, saltRounds);
            await User.create(newUser)
            console.log('User logged in')
            res.status(200).json(newUser)
        }
        else {
            res.status(401).send({ 'message': `Username is already in use`})
        }
    }
    catch(e) {
        res.status(500).send({ 'message': `Server Exception: ${e.message}`})
    }
})

/**
 * login
 * @openapi
 * /api/login:
 *   post:
 *     tags:
 *       - User
 *     summary: Allows users to log in.
 *     description: Log in API.
 *     requestBody:
 *       description: User log in.
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - userName
 *               - password
 *             properties:
 *               userName:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User logged in.
 *       '401':
 *         description: Invalid username and/or password.
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception.
 */

router.post('/login', async (req, res) => {
    let user = {
        userName: req.body.userName,
        password: req.body.password
    } 

    try{
        let searchForUser = await findUser( user.userName )
        if(searchForUser) {
            let passwordIsValid = bcrypt.compareSync(user.password, searchForUser.password)
            if(passwordIsValid){
                console.log(`User ${findUser.userName} is logged in.`)
                res.status(200).send({ message: `User ${searchForUser.userName} is logged in.` })
            }
        }
        else {
            res.status(401).send({ 'message': `Invalid Username/Password: 401`})
        }
    }
    catch(e) {
        res.status(500).send({ 'message': `Server Exception: ${e.message}`})
    }
})

module.exports = router; 
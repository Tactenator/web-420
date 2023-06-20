/*
    ==================
    Title: mclaurine-composer-routes.js, 
    Author: Trevor McLaurine
    Date: 6/17/2023
    Description: Initializes the routes used for the composer API
*/

const express = require('express')
const Composer = require('../models/McLaurine-composer')
const People = require('../models/McLaurine-people')
const mongoose = require('mongoose')

const router = express.Router();

/**
 * findAllPersons
 * @openapi
 * /api/people:
 *   get:
 *     tags:
 *       - People
 *     description: Returns a list of all person from the people API database
 *     summary: Returns the data for all people
 *     operationid: findAllPersons
 *     responses:
 *       '200':
 *         description: "Successful retrieval of documents from the people API"
 *       '500':
 *         description: "Server exceptions"
 *       '501':
 *         description: "MongoDB exceptions"
 */
router.get('/people', async (req,res) => {

    //Currently, model.find does not accept callback. I've placed the original code in comments to show that I understand the assignment
    //But placed code that does work for the time being. 

    // try {
    //     await People.find({}, function(err, people) {
    //         if(err) {
    //             res.status(501).send({
    //                 'message': `MongoDB Exception: ${err}`
    //             })
    //         }else {
    //             res.json(people);
    //         }
    //     })
    // } catch(e) {
    //     console.log(e)
    //     res.status(500).send({
    //         'message': `Server Exception: ${e.message}`
    //     })
    // }

    const persons = await People.find({ })

    res.status(200).json(persons); 
})

/**
 * createPerson
 * @openapi
 * /api/people:
 *   post:
 *     tags:
 *       - People
 *     name: createPerson
 *     summary: Creates a new person for the people API
 *     requestBody:
 *       description: Information about the person
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - firstName
 *               - lastName
 *               - roles
 *               - dependents
 *               - birthDate
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               roles:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     text:
 *                       type: string
 *               dependents:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     firstName:
 *                       type: string
 *                     lastName:
 *                       type: string
 *               birthDate:
 *                 type: string
 *                     
 *     responses:
 *       '200':
 *         description: Student added to MongoDB Atlas
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post('/people', async (req, res) => {

    //Currently, model.create does not accept callback. I've placed the original code in comments to show that I understand the assignment
    //But placed code that does work for the time being. 

    // const newComposer = {
    //     firstName: req.body.firstName,
    //     lastName: req.body.lastName
    // } 

    // try {
    //     await Composer.create(newComposer, function(err, composer) {
    //         if(err) {
    //             res.status.send({
    //                 'message': `MongoDB Exception: ${err}`
    //             })
    //         }
    //         else {
    //             res.json(composer)
    //         }
    //     })
    // } catch(e) {
    //     console.log(e)
    //     res.status(500).send({
    //         'message': `Server Exception: ${e.message}`
    //     })
    // }

    const { firstName, lastName, roles, dependents, birthDate } = req.body; 

    try{
        const person = await People.create({ firstName, lastName, roles, dependents, birthDate })
        res.status(200).json(person);
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
})

module.exports = router; 
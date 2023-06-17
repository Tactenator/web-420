/*
    ==================
    Title: mclaurine-composer-routes.js, 
    Author: Trevor McLaurine
    Date: 6/17/2023
    Description: Initializes the routes used for the composer API
*/

const express = require('express')
const Composer = require('../models/McLaurine-composer')
const mongoose = require('mongoose')

const router = express.Router();

/**
 * findAllComposers
 * @openapi
 * /composers:
 *   get:
 *     tags:
 *       - Composers
 *     description: Returns a list of all composers from the composers API database
 *     summary: Returns the data for all composers
 *     operationid: findAllComposers
 *     responses:
 *       '200':
 *         description: "Successful retrieval of documents from the composer API"
 *       '500':
 *         description: "Server exceptions"
 *       '501':
 *         description: "MongoDB exceptions"
 */
router.get('/composers', async (req,res) => {

    //Currently, model.find does not accept callback. I've placed the original code in comments to show that I understand the assignment
    //But placed code that does work for the time being. 

    // try {
    //     await Composer.find({}, function(err, composers) {
    //         if(err) {
    //             res.status(501).send({
    //                 'message': `MongoDB Exception: ${err}`
    //             })
    //         }else {
    //             res.json(composers);
    //         }
    //     })
    // } catch(e) {
    //     console.log(e)
    //     res.status(500).send({
    //         'message': `Server Exception: ${e.message}`
    //     })
    // }

    const composers = await Composer.find({ })

    res.status(200).json(composers); 
})

/**
 * findComposerById
 * @openapi
 * /composers/:id:
 *   get:
 *     tags:
 *       - Composers
 *     description: Returns a specific composer designated by the user input. The composer is retrieved by grabbing an id from the url parameters.
 *     summary: Returns the data for a specific composer.
 *     operationid: findComposerById
 *     responses:
 *       '200':
 *         description: "Successful retrieval of a document containing the composer"
 *       '500':
 *         description: "Server exceptions"
 *       '501':
 *         description: "MongoDB exceptions"
 */
router.get('/composers/:id', async (req, res) => {

    //Currently, model.find does not accept callback. I've placed the original code in comments to show that I understand the assignment
    //But placed code that does work for the time being. 

    // try {
    //     Composer.findOne({'_id':req.params.id}, function(err, composers) {
    //         if(err) {
    //             res.status(501).send({
    //                 'message': `MongoDB Exception: ${err}`
    //             })
    //         }else {
    //             res.json(composers);
    //         }
    //     })
    // } catch(e) {
    //     console.log(e)
    //     res.status(500).send({
    //         'message': `Server Exception: ${e.message}`
    //     })
    // }

    const { id } = req.params; 

    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).json({error: "No composer can be found"});
    }

    const composer = await Composer.findById(id);
    if(!composer)
    {
        return res.status(404).json({error: "No composer can be found"});
    }
    res.status(200).json(composer);
})

/**
 * createComposer
 * @openapi
 * /composers:
 *   post:
 *     tags:
 *       - Composers
 *     operationid: createComposer
 *     description: Creates and places a new composer the composer API database.
 *     summary: Creates a new composer
 *     requestBody:
 *       description: A user input describing the Composer object
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - firstName
 *               - lastName
 *             properties:
 *               firstName:
 *                type: string
 *               lastName:
 *                type: string
 *     responses:
 *       '200':
 *         description: Successful creation and posting of a new composer to the composer API
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post('/composers', async (req, res) => {

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

    const { firstName, lastName } = req.body; 

    try{
        const composer = await Composer.create({ firstName, lastName})
        res.status(200).json(composer);
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
})

module.exports = router; 
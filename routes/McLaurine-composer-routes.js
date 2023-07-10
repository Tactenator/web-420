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
 * /api/composers:
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

    //creates an instance of a composer and calls the database to find all composers.
    const composers = await Composer.find({ })

    //if successful, sets status to 200 and returns the list of composers.
    res.status(200).json(composers); 
})

/**
 * findComposerById
 * @openapi
 * /api/composers/{id}:
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

/**
 * deleteComposer
 * @openapi
 * /api/composers/{id}:
 *   delete:
 *     tags:
 *       - Composers
 *     name: deleteComposers
 *     description: Deletes a composer from the Composers API.
 *     summary: Removes a document from Composers.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Id of the document to be removed from the API.
 *         schema: 
 *           type: string
 *     responses:
 *       '200':
 *         description: Composer deleted
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

router.delete('/composers/:id', async (req, res) => {
    try {
        const composer = await Composer.findOne({ '_id': req.params.id })
        if(!composer) {
            res.status(501).json({ error: 'MongoDB Exception'})
        }
        await Composer.findByIdAndDelete({ '_id': req.params.id })
        res.status(200).json(composer)
    }
    catch (e) {
        res.status(500).json({ error: `Server Exception ${e.message}` })
    }
})

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

    //grabs the id from the URL parameters
    const { id } = req.params; 

    //Checks to see if the ID from the parameters is valid
    if(!mongoose.Types.ObjectId.isValid(id))
    {
        //returns an error message stating that no composer could be found.
        return res.status(404).json({error: "No composer can be found"});
    }

    //searches for composer based on the id variable.
    const composer = await Composer.findById(id);
    if(!composer)
    {
        //if there is no composer with that id, returns status 404 and a message that composer can't be found
        return res.status(404).json({error: "No composer can be found"});
    }
    //if successful, returns composer object 
    res.status(200).json(composer);
})

/**
 * createComposer
 * @openapi
 * /api/composers:
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

    //grabs the values of the variables from the request body 
    const { firstName, lastName } = req.body; 

    try{
        //creates a new composer based on the values from the request body
        const composer = await Composer.create({ firstName, lastName})
        //if successful, creates a new composer
        res.status(200).json(composer);
    }
    catch (error) {
        //if an error occurs, an error message is displayed in the console
        res.status(400).json({ error: error.message })
    }
})

/**
 * updateComposerById
 * @openapi
 * /api/composers/{id}:
 *   put:
 *     tags:
 *       - Composers
 *     name: updateComposerById
 *     description: Updates an existing composer document
 *     summary: Updates a composer's information
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Id of the composer to update. 
 *         schema: 
 *           type: string
 *     requestBody:
 *       description: Composer information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - firstName
 *               - lastName
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Composer updated
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

router.put('/composers/:id', async (req, res) => {

    try{
        const composer = await Composer.findOne({ '_id': req.params.id })
        if(!composer){
            res.status(401).json({ error: 'Invalid Composer Id'})
        }
        else {
            composer.set({ 
                firstName: req.body.firstName,
                lastName: req.body.lastName
            })

            composer.save()
            res.status(200).json(composer)
        }
    }
    catch (error) {
        //if an error occurs, an error message is displayed in the console
        res.status(500).json({ error: error.message })
    }
})

module.exports = router; 
/*
    ==================
    Title: mclaurine-customer-routes.js, 
    Author: Trevor McLaurine
    Date: 7/3/2023
    Description: Initializes the routes used for the NodeShopper API
*/

const express = require('express')
const Teams = require('../models/McLaurine-teams')
const mongoose = require('mongoose')

const router = express.Router();

/**
 * createTeam
 * @openapi
 * /api/teams:
 *   post:
 *     tags:
 *       - Teams
 *     name: createTeams
 *     summary: Creates a new team for the Teams API
 *     requestBody:
 *       description: Information about the team
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - name
 *               - mascot
 *             properties:
 *               name:
 *                 type: string
 *               mascot:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Team added to the Teams API
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post('/teams', async (req,res) => {
    //Grabs information from the req.body function to initialize variables.
    const { name, mascot } = req.body; 

    try{
        //creates a new customer. Checks to see if all parameters are met
        const newTeam = await Teams.create({ name, mascot })
        if(!newTeam){
            //if all parameters are not met, throws an error
            res.status(500).send( { 'message': `MongoDB Exception 501`})
        }
        else {
            //if successful, creates a new customer
            res.status(200).json(newTeam);
        }
    }
    catch (error) {
        //if the request is bad, throws an error
        res.status(501).json({ 'message': `Server Exception: ${error.message}` })
    }
})

/**
 * findAllTeams
 * @openapi
 * /api/teams:
 *   get:
 *     tags:
 *       - Teams
 *     description: Returns a list of all teams from the Teams API database
 *     summary: Returns the data for all of the teams
 *     operationid: findAllTeams
 *     responses:
 *       '200':
 *         description: "Successful retrieval of documents from the Teams API"
 *       '500':
 *         description: "Server exceptions"
 *       '501':
 *         description: "MongoDB exceptions"
 */
router.get('/teams', async (req,res) => {

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

    const teams = await Teams.find({ })

    res.status(200).json(teams); 
})

/**
 * assignPlayerToTeam
 * @openapi
 * /api/teams/{id}/players:
 *   post:
 *     tags:
 *       - Teams
 *     name: assignPlayerToTeam
 *     summary: Pushes a player to a team's array
 *     parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: Id of the team that the player will join 
 *        schema: 
 *          type: string
 *     requestBody:
 *       description: Information about the person
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - subtotal
 *               - tax
 *               - dateCreated
 *               - dateShipped
 *               - lineItems
 *             properties:
 *               subtotal:
 *                 type: number
 *               tax:
 *                 type: number
 *               dateCreated:
 *                 type: string
 *               dateShipped: 
 *                 type: string
 *               lineItems:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     price:
 *                       type: string
 *                     quantity: 
 *                       type: string
 *     responses:
 *       '200':
 *         description:  New invoice created
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post('/teams/:id/players', async (req, res) => {

    try{
        // searches for a user based on the parameters written by the user
        const team = await teams.findOne({ '_id': req.params._id })
        if(!team){
            // if no user is found, throws an error
            res.status(501).send({ 'message': 'MongoDB Exception'})
        }
        else
        {
            //if a user is found, a new invoice object is created and initialized with the req.body values
            const newPlayer = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                salary: req.body.salary,
            }   
            // pushes the new object into an array already placed in the user's data
            team.players.push(newPlayer)
            
            //saves the new data to the database
            team.save()
            res.status(200).json(team)
        }
    }
    catch (error) {
        //if unsuccessful, throws an error
        res.status(500).send({ 'message': `Server Exception: ${error.message} `})
    }
})

module.exports = router; 
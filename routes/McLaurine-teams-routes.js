/*
    ==================
    Title: mclaurine-teams-routes.js, 
    Author: Trevor McLaurine
    Date: 7/18/2023
    Description: Initializes the routes used for the Teams API
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
        //creates a new team. Checks to see if all parameters are met
        const newTeam = await Teams.create({ name, mascot })
        if(!newTeam){
            //if all parameters are not met, throws an error
            res.status(500).send( { 'message': `MongoDB Exception 501`})
        }
        else {
            //if successful, creates a new teams
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

    try {
        //Searches the database for all teams
        const teams = await Teams.find({ })
        if(!teams){
            res.status(501).json({ 'message': 'MongoDb Exception' })
        }
        else {
            //returns the teams that are found
            res.status(200).json(teams); 
        }
    }
    catch (error) {
        res.status(501).json({ 'message': `Server Exception: ${error.message}` })
    }
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
 *       description: Information about the player
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - firstName
 *               - lastName
 *               - salary
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               salary:
 *                 type: number
 *     responses:
 *       '200':
 *         description:  New player created and added to team
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post('/teams/:id/players', async (req, res) => {

    try{
        // searches for a team based on the parameters written by the user
        const team = await Teams.findOne({ '_id': req.params.id })
        if(!team){
            // if no team is found, throws an error
            res.status(501).send({ 'message': 'MongoDB Exception'})
        }
        else
        {
            //if a team is found, a new invoice object is created and initialized with the req.body values
            const newPlayer = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                salary: req.body.salary,
            }   
            // pushes the new object into an array already placed in the team's data
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

/**
 * findAllPlayersByTeamId
 * @openapi
 * /api/teams/{id}/players:
 *   get:
 *     tags:
 *       - Teams
 *     description: Returns a list of all players in a team on from the Teams API
 *     summary: Returns the list of players on a team
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Id that belongs to the team
 *         schema: 
 *           type: string
 *     operationid: findAllPlayersByTeamId
 *     responses:
 *       '200':
 *         description: "Successful retrieval of documents from the Teams API"
 *       '500':
 *         description: "Server exceptions"
 *       '501':
 *         description: "MongoDB exceptions"
 */
router.get('/teams/:id/players', async (req,res) => {

    try {
         //checks to see if the teams with the designated id exists
         const team = await Teams.findOne({ '_id': req.params.id })
         if(!team) {
             //if not, throws an error
             res.status(401).json({ error: 'MongoDB Exception'})
         }
        else
        {
            //if successful, sets status to 200 and returns the player information.
            res.status(200).json(team.players); 
        }
    }
    catch(e) {
        //if unsuccessful, throws an error
        res.status(500).send({ 'message': `Server Exception: ${e.message}`})
    }
})

/**
 * deleteTeamById
 * @openapi
 * /api/teams/{id}:
 *   delete:
 *     tags:
 *       - Teams
 *     name: deleteTeamById
 *     description: Deletes a team by the Id.
 *     summary: Removes a document from the Teams API.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Id of the document to be removed from the API.
 *         schema: 
 *           type: string
 *     responses:
 *       '200':
 *         description: Team deleted
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

router.delete('/teams/:id', async (req, res) => {
    try {
        //checks to see if the teams with the designated id exists
        const team = await Teams.findOne({ '_id': req.params.id })
        if(!team) {
            //if not, throws an error
            res.status(501).json({ error: 'MongoDB Exception'})
        }
        //searches for teams based on the parameters and deletes it
        await Teams.findByIdAndDelete({ '_id': req.params.id })
        res.status(200).json(team)
    }
    catch (e) {
        //if anything goes wrong, throws an error
        res.status(500).json({ error: `Server Exception ${e.message}` })
    }
})

module.exports = router; 
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
            res.status(200).json(newCustomer);
        }
    }
    catch (error) {
        //if the request is bad, throws an error
        res.status(501).json({ 'message': `Server Exception: ${error.message}` })
    }
})

/**
 * createInvoiceByUserName
 * @openapi
 * /api/customers/{userName}/invoices:
 *   post:
 *     tags:
 *       - Customers
 *     name: createInvoiceByUserName
 *     summary: Creates a new invoice based on the username
 *     parameters:
 *      - name: userName
 *        in: path
 *        required: true
 *        description: Username that belongs to the invoice 
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
router.post('/customers/:userName/invoices', async (req, res) => {

    try{
        // searches for a user based on the parameters written by the user
        const user = await Customers.findOne({ 'userName': req.params.userName })
        if(!user){
            // if no user is found, throws an error
            res.status(501).send({ 'message': 'MongoDB Exception'})
        }
        else
        {
            //if a user is found, a new invoice object is created and initialized with the req.body values
            const newInvoice = {
                subtotal: req.body.subtotal,
                tax: req.body.tax,
                dateCreated: req.body.dateCreated,
                dateShipped: req.body.dateShipped, 
                lineItems: req.body.lineItems
            }   
            // pushes the new object into an array already placed in the user's data
            user.invoices.push(newInvoice)
            
            //saves the new data to the database
            user.save()
            res.status(200).json(user)
        }
    }
    catch (error) {
        //if unsuccessful, throws an error
        res.status(500).send({ 'message': `Server Exception: ${error.message} `})
    }
})

/**
 * findAllInvoicesByUserName
 * @openapi
 * /api/customers/{userName}/invoices:
 *   get:
 *     tags:
 *       - Customers
 *     description: Returns a list of all customers from the NodeShoppers API database
 *     summary: Returns the invoices for the userName specified
 *     parameters:
 *       - name: userName
 *         in: path
 *         required: true
 *         description: Username that belongs to the invoice 
 *         schema: 
 *           type: string
 *     operationid: findAllInvoicesByUserName
 *     responses:
 *       '200':
 *         description: "Successful retrieval of documents from the NodeShoppers API"
 *       '500':
 *         description: "Server exceptions"
 *       '501':
 *         description: "MongoDB exceptions"
 */
router.get('/customers/:userName/invoices', async (req,res) => {

    try {
        //searches for a user in the database
        const customers = await Customers.findOne({ 'userName': req.params.userName })
        if(!customers){
            //if no user is found, throws an error
            res.status(501).send({ 'message': 'Mongo Exception Error'})
        }
        else
        {
            //if successful, sets status to 200 and returns the customer.
            res.status(200).json(customers); 
        }
    }
    catch(e) {
        //if unsuccessful, throws an error
        res.status(500).send({ 'message': `Server Exception: ${e.message}`})
    }
})

module.exports = router; 
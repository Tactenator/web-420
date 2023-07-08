/*
    ==================
    Title: mclaurine-customer-routes.js, 
    Author: Trevor McLaurine
    Date: 7/3/2023
    Description: Initializes the routes used for the NodeShopper API
*/

const express = require('express')
const Customers = require('../models/McLaurine-customers')
const mongoose = require('mongoose')

const router = express.Router();

/**
 * createCustomer
 * @openapi
 * /api/customers:
 *   post:
 *     tags:
 *       - Customers
 *     name: createCustomers
 *     summary: Creates a new customer for the NodeShopper API
 *     requestBody:
 *       description: Information about the customer
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - firstName
 *               - lastName
 *               - userName
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               userName:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Customer added to NodeShopper API
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post('/customers', async (req,res) => {
    //Grabs information from the req.body function to initialize variables.
    const { firstName, lastName, userName } = req.body; 

    try{
        //creates a new customer. Checks to see if all parameters are met
        const newCustomer = await Customers.create({ firstName, lastName, userName })
        if(!newCustomer){
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
 *     description: Returns a list of all composers from the composers API database
 *     summary: Returns the data for all composers
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
 *         description: "Successful retrieval of documents from the composer API"
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
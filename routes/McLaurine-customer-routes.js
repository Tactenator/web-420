/*
    ==================
    Title: mclaurine-customer-routes.js, 
    Author: Trevor McLaurine
    Date: 7/3/2023
    Description: Initializes the routes used for the composer API
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
 *     summary: Creates a new customer for the customer API
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
 *         description: Customer added to Customer API
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post('/persons', async (req,res) => {
    const { firstName, lastName, userName } = req.body; 

    try{
        const newCustomer = await People.create({ firstName, lastName, userName })
        if(!newCustomer){
            res.status(500).send( { 'message': `MongoDB Exception 501`})
        }
        else {
            res.status(200).json(newCustomer);
        }
    }
    catch (error) {
        res.status(501).json({ 'message': `Server Exception: ${error.message}`  })
    }
})

/**
 * createInvoiceByUserName
 * @openapi
 * /api/customers/:username/invoices:
 *   post:
 *     tags:
 *       - Customers
 *     name: createInvoiceByUserName
 *     summary: Creates a new invoice based on the username
 *     parameters:
 *      - name: username
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
 *               birthDate:
 *                 type: string
 *                     
 *     responses:
 *       '200':
 *         description:  New invoice created
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post('/customers/:username/invoices', async (req, res) => {

    //Currently, model.create does not accept callback. I've placed the original code in comments to show that I understand the assignment
    //But placed code that does work for the time being. 

    // const newPerson = {
    //     firstName: req.body.firstName,
    //     lastName: req.body.lastName,
    //     roles: req.body.roles,
    //     dependents: req.body.dependents,
    //     birthDate: req.body.birthDate
    // } 

    // try {
    //     await Composer.create(newPerson, function(err, person) {
    //         if(err) {
    //             res.status.send({
    //                 'message': `MongoDB Exception: ${err}`
    //             })
    //         }
    //         else {
    //             res.json(person)
    //         }
    //     })
    // } catch(e) {
    //     console.log(e)
    //     res.status(500).send({
    //         'message': `Server Exception: ${e.message}`
    //     })
    // }

    try{
        const username  = req.params.username;
        const user = Customers.find({ 'userName': username })
        if(!user){
            res.status(501).send({ 'message': 'MongoDB Exception'})
        }
        else
        {
            const newInvoice = {
                subtotal: req.body.subtotal,
                tax: req.body.tax,
                dateCreated: req.body.dateCreated,
                dateShipped: req.body.dateShipped, 
                lineItems: req.body.lineItems
            }   
        
            user.invoices.push(newInvoice)
    
            //add status code
            await Customers.save(user)
        }
    }
    catch (error) {
        res.status(500).send({ 'message': `Server Exception: ${error.message} `})
    }
})

/**
 * findAllInvoicesByUserName
 * @openapi
 * /api/customers/:username/invoices:
 *   get:
 *     tags:
 *       - Customers
 *     description: Returns a list of all composers from the composers API database
 *     summary: Returns the data for all composers
 *     parameters:
 *       - name: username
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
router.get('/customers/:username/invoices', async (req,res) => {

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

    try {
        const user = req.body.userName;

        //creates an instance of a composer and calls the database to find all composers.
        const customers = await Customers.findOne({ 'userName': user })
        if(!customers){
            res.status(501).send({ 'message': 'Mongo Exception Error'})
        }
        else{
            //if successful, sets status to 200 and returns the list of composers.
            res.status(200).json(customers); 
        }
    }
    catch(e) {
        //add error message
        res.status(500).send({ 'message': `Server Exception: ${e.message}`})
    }
})

module.exports = router; 
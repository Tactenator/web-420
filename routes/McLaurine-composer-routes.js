const express = require('express')
const Composer = require('../models/McLaurine-composer')

const router = express.Router();

/**
 * findAllFruits
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
    try {
        Composer.find({}, function(err, composers) {
            if(err) {
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            }else {
                res.status(200).json(composers);
            }
        })
    } catch(e) {
        console.log(e)
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        })
    }
})

router.get('/composers/:id', async (req, res) => {
    try {
        Composer.findOne({'_id':req.params.id}, function(err, composers) {
            if(err) {
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            }else {
                res.status(200).json(composers);
            }
        })
    } catch(e) {
        console.log(e)
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        })
    }
})

router.post('/composers', async (req, res) => {
    const newComposer = {
        firstName: req.body.firstName,
        lastName: req.body.lastName
    } 

    try {
        await Composer.create(newComposer, function(err, composer) {
            if(err) {
                res.status.send({
                    'message': `MongoDB Exception: ${err}`
                })
            }
            else {
                res.status(200).json(composer)
            }
        })
    } catch(e) {
        console.log(e)
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        })
    }
})
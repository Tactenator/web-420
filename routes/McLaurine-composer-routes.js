const express = require('express')
const Composer = require('../models/McLaurine-composer')

const router = express.Router();

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
const express = require('express')

const router = express.Router()

const Url = require('../models/url')

//b@route GET /:code
// @desc getting logn url redirect
router.get('/:code', async (req, res) => {
    try {
        const url = await Url.findOne({ urlCode : req.params.code })

        if(url) {
            return res.redirect(url.longUrl)
        } else {
            return res.status(404).send("No url found.")
        }
    } catch (error) {
        console.log(error)
        res.status(500).send("server internal error")
    }
})


module.exports = router
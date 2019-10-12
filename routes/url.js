const express = require('express')
const validUrl = require('valid-url')
const shortId = require('shortid')
const config = require('config')


const Url = require('../models/url')

const router = express.Router()

// @route POST /api/url/shorten
// @desc create short url
router.post('/api/url/shorten', async (req, res) => {
    const { longUrl } = req.body
    const baseUrl = config.get("baseUrl")

    // check base url
    if(!validUrl.isUri(baseUrl)) {
        return res.status(401).json('Invalid base url')
    }

    // generate short id
    const urlCode = shortId.generate()

    // check long url
    if(validUrl.isUri(longUrl)) {
        try {
            let url = await Url.findOne({ longUrl })

            if(url) {
                res.json(url)
            } else {
                const shortUrl = `${baseUrl}/${urlCode}`

                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date : new Date()
                })
                await url.save()
                
                res.json(url)
            }

        } catch (error) {
            console.log(error)
            res.status(500).json("server error occured")
        }
    } else {
        res.status(401).json("Invalid long url")
    }

})



module.exports = router
var express = require('express')
var router = express.Router()
var pool = require('./pool')
var upload = require('./multer')

router.post('/submit_category_banner',  upload.any(), function (req, res, next) {
    try {
        console.log('categorybanner', req.body)
        console.log('FILESSSSS',req.files)
        var filenames=req.files.map((files,index)=>files.filename)
        pool.query("insert into categorybanner(categorybannerid,brandid, categoryid,files) values(?,?,?,?)", [req.body.categorybannerid, req.body.brandid, req.body.categoryid, filenames+''], function (error, result) {
            if (error) {
                console.log(error)
                res.status(200).json({ status: false, message: 'Database Error , Pls contact database Admin' })
            }
            else {
                res.status(200).json({ status: true, message: 'categorybanner submitted successfully' })
            }
        })
    } catch (e) {
        res.status(200).json({ status: false, message: 'Server Error...' })
    }
})



///

module.exports = router
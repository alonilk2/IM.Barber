var bodyParser = require('body-parser'),
    multer = require('multer'),
    multerS3 = require('multer-s3'),
    path = require('path'),
    AWS = require('aws-sdk'),
    myBucket = 'cloud-cube-us2';
const db = require('../../../models/index.js');

AWS.config.update({region: 'us-west-2'});
s3 = new AWS.S3();

const handleError = (err, res) => {
  res
    .status(500)
    .contentType("text/plain")
    .end(err);
};

const fileFilter = (req, file, cb) => {
	if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
		cb(null, true);
	} else {
		cb("Type file is not access", false);
	}
};


module.exports = async function uploadImageToAWS(req, res){
    upload(req, res, function (err) {
      console.log(req)
        if (err){
            console.log(err)
            res.send(err)
        } 
        console.log("ok")
    })
}


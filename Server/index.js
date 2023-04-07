var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
const compression = require('compression');
const PORT = process.env.PORT || 8080;
const cors = require('cors');

/* ----------------- Database ----------------- */
app.listen(PORT, function() {
    console.log("first api on port " +PORT);
})

app.use(cors());
app.use(require('./routes'));
app.use(logger('dev'));
app.use(express.static('uploads'))
app.use(express.static('categories'))
app.use(compression());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});
app.get('/uploads/:imgname', (req, res) => {
  res.sendFile(path.join(__dirname, 'uploads', req.params.imgname));
})
app.get('/categories/:imgname', (req, res) => {
  res.sendFile(path.join(__dirname, 'categories', req.params.imgname));
})

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

module.exports = app;
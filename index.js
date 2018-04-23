'use strict'
require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
// const request = require('request')
const app = express()
var port = process.env.port

console.log('port: ', port)

app.set('port', port)

app.use(bodyParser.urlencoded({extended: false}))

app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.send('Hello World!')
})

// For Facebook verification
app.get('/webhook', function (req, res) {
  console.log(req.query['hub.verify_token'])
  if (req.query['hub.verify_token'] === process.env.verify_token) {
    return res.send(req.query['hub.challenge'])
  }
  res.send('Error, wrong token')
})

app.listen(port, function () {
  console.log('running on port', port)
})

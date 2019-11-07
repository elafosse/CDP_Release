/* CONFIG */
const express = require('express')
const app = express()

/* REQUIRED */
const path = require('path')
const ejs = require('ejs')
let bodyParser = require('body-parser')
const db = require('./db_connection')
const project = require('./classes/Project')
const listIssues = require('./listIssues')

/* USE THE REQUIRES */
app.use(bodyParser.urlencoded({ extended: false }))
app.use(listIssues.app)

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './..', '/views'))

module.exports.app = app
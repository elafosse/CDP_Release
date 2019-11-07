/* CONFIG */
const express = require('express')
const app = express()

/* REQUIRED */
const path = require('path')
const ejs = require('ejs')
let bodyParser = require('body-parser')
const mysql = require('mysql')
const member = require('./classes/Member')

/* USE THE REQUIRES */
app.use(bodyParser.urlencoded({ extended: false }))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './..', '/views'))

const SIGNIN_ROUTE = '/signIn'
const SIGNIN_VIEW_PATH = '../views/signIn'
const CONNECT_USER = '/signIn'
const LIST_PROJECTS_VIEW_PATH = '../views/listProjects'

app.get(SIGNIN_ROUTE, function (req, res) {
    res.render(SIGNIN_VIEW_PATH);
})

app.post(CONNECT_USER, function (req, res) {
    let username = req.body.username;
    let password = req.body.password;

    let user = new member.Member(username, password, [])

    res.render(LIST_PROJECTS_VIEW_PATH, {
      user: user,
      userProjects: user.listProjects
    })
})


module.exports.app = app
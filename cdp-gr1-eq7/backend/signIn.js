/* CONFIG */
const express = require('express')
const app = express()

/* REQUIRED */
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')
const db = require('./db_connection')
const listProjects = require('./listProjects')

/* USE THE REQUIRES */
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('../public')) // Mettre l'URL du dossier 'public' par rapport a initApp.js
app.use(
  session({
    secret: 'shhhhhhared-secret',
    saveUninitialized: true,
    resave: true
  })
)
app.use(listProjects.app)

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './..', '/views'))

const SIGNIN_ROUTE = '/signIn'
const SIGNIN_VIEW_PATH = '../views/signIn'
const CONNECT_USER = '/signIn'
const DECONNECT_USER = '/signOut'

/**
 * Renders the signIn page
 * SIGNIN_ROUTE is the route of the signIn view
 */
app.get(SIGNIN_ROUTE, function(req, res) {
  res.render(SIGNIN_VIEW_PATH)
})

/**
 * Called when the user clics on the signIn button. If the username and password match, the user is given a session to navigate
 * on the website.
 * @param {string} username The username of the user
 * @param {string} password The password of the user
 */
app.post(CONNECT_USER, function(req, res) {
  const username = req.body.username
  const password = req.body.password

  db._areUsernameAndPasswordCorrect(username, password).then(isCorrect => {
    if (isCorrect) {
      db._getProjectsOfMember(username).then(projects => {
        const sess = req.session
        sess.username = username
        sess.password = password
        req.session = sess
        res.redirect('./listProjects')
      })
    } else {
      res.render(SIGNIN_VIEW_PATH, {
        wrongInfoMessage: true
      })
    }
  })
})

/**
 * Called when the user clics on the "Sign Out" button. The session is destroyed, and the user is sent back to the signIn page.
 * DECONNECT_USER is the route of the Sign Out page
 */
app.post(DECONNECT_USER, function(req, res) {
  req.session.destroy(function(err) {
    if (err) {
      console.log(err)
    } else {
      res.redirect(SIGNIN_ROUTE)
    }
  })
})

module.exports.app = app

/* CONFIG */
const express = require('express')
const app = express()

/* REQUIRED */
const bodyParser = require('body-parser')
const session = require('express-session')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('../public'))
app.use(
  session({
    secret: 'shhhhhhared-secret',
    saveUninitialized: true,
    resave: true
  })
)

const GITHUB_LOGIN_ROUTE = '/gitHubLogin'

const GITHUB_LOGIN_VIEW_PATH = '../views/gitHubLogin'

const LIST_RELEASES_REDIRECT = '/listReleases?projectId='

let projectId
let project
let sess

/**
 * Render the form to connect to the user's GitHub account.
 * GITHUB_LOGIN_ROUTE is the route of the form.
 * GITHUB_LOGIN_VIEW_PATH is the path to the view of this route.
 * function is the function applied to this route.
 */
app.get(GITHUB_LOGIN_ROUTE, function(req, res) {
  projectId = req.query.projectId
  sess = req.session
  project = sess.project

  res.render(GITHUB_LOGIN_VIEW_PATH, {
    projectId: projectId,
    project: project
  })
})

/**
 * Connect the user to their GitHub account and render the list of the releases of the project.
 * Get the user's GitHub username and password entered by the user in the form and
 * save them in the session.
 * GITHUB_LOGIN_ROUTE is the route of the form.
 * function is the function applied to this route.
 */
app.post(GITHUB_LOGIN_ROUTE, function(req, res) {
  const usernameGitHub = req.body.usernameGitHub
  const passwordGitHub = req.body.passwordGitHub

  sess.usernameGitHub = usernameGitHub
  sess.passwordGitHub = passwordGitHub
  req.session = sess

  res.redirect(LIST_RELEASES_REDIRECT.concat(projectId))
})

module.exports.app = app

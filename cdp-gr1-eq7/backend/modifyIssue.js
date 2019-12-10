/* CONFIG */
const express = require('express')
const app = express()

/* REQUIRED */
const path = require('path')
const ejs = require('ejs')
let bodyParser = require('body-parser')
const db = require('./db_connection')
const session = require('express-session')

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

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './..', '/views'))

const MODIFY_ISSUE_ROUTE = '/modifyIssue'
const MODIFY_ISSUE_VIEW_PATH = '../views/modifyIssue'

const MODIFY_ISSUE_REDIRECT_URL = '/listIssues?projectId='

/* FUNCTIONS */

let issueId
let projectId
let sess

/**
 * Render the page with the form to modify an issue.
 * The issue to modify is identified by its id. So does is the project it belongs to.
 * MODIFY_ISSUE_VIEW_PATH is the path to the view.
 * MODIFY_ISSUE_ROUTE is the route of the page.
 * function is the function to apply when this route is called.
 */
app.get(MODIFY_ISSUE_ROUTE, function(req, res) {
  projectId = req.query.projectId
  issueId = req.query.issueId
  sess = req.session
  db._getProjectFromProjectId(projectId).then(currentProject => {
    db._getIssueById(issueId).then(issue => {
      res.render(MODIFY_ISSUE_VIEW_PATH, {
        project: currentProject,
        session: sess,
        issue: issue
      })
    })
  })
})

/**
 * Render the list of the issues after the issue has been modified.
 * The database is updated at this moment with the information the user entered in the form.
 * MODIFY_ISSUE_REDIRECT_URL is a string containing the route of the page with the list of the issues.
 * MODIFY_ISSUE_ROUTE is the route of the page.
 * function is the function to apply when this route is called.
 */
app.post(MODIFY_ISSUE_ROUTE, function(req, res) {
  let newName = req.body.issueName
  let newDescription = req.body.issueDescription
  let newPriority = req.body.issuePriority
  let newDifficulty = req.body.issueDifficulty
  console.log('Issue of id ' + issueId + ' modified')

  db._modifyIssue(
    issueId,
    newName,
    newDescription,
    newPriority,
    newDifficulty
  ).then(result => {
    res.redirect(MODIFY_ISSUE_REDIRECT_URL + projectId)
  })
})

module.exports.app = app

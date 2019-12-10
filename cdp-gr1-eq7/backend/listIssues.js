/* CONFIG */
const express = require('express')
const app = express()

/* REQUIRED */
const path = require('path')
const bodyParser = require('body-parser')
const db = require('./db_connection')
const session = require('express-session')
const modifyIssue = require('./modifyIssue')

/* USE THE REQUIRES */
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('../public'))
app.use(
  session({
    secret: 'shhhhhhared-secret',
    saveUninitialized: true,
    resave: true
  })
)
app.use(modifyIssue.app)

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './..', '/views'))

const LIST_ISSUES_ROUTE = '/listIssues'
const REMOVE_ISSUE_ROUTE = '/removeIssue'

const LIST_ISSUES_VIEW_PATH = '../views/listIssues'
const CREATE_ISSUE_ROUTE = '/createIssue'

let listIssues = []
let projectId
let currentProject
let sess

/* FUNCTIONS */

/**
 * Render the page with the list of the issues of the project.
 * The list of issues is retrieved from the database using the id of the project.
 * LIST_ISSUES_VIEW_PATH is a string representing the path of the view to render.
 * LIST_ISSUES_ROUTE is the route of the page.
 * function is the function to apply when this route is called.
 */
app.get(LIST_ISSUES_ROUTE, function(req, res) {
  listIssues = []
  projectId = req.query.projectId
  const focusOn = req.query.focusOn
  sess = req.session

  db._getProjectFromProjectId(projectId).then(result => {
    currentProject = result
    db._getAllProjectIssues(result.id).then(issues => {
      issues.forEach(issue => {
        listIssues.push(issue)
      })
      res.render(LIST_ISSUES_VIEW_PATH, {
        session: sess,
        listIssues: listIssues,
        listProjects: sess.listProjects,
        project: currentProject,
        focusOn: focusOn
      })
    })
  })
})

/**
 * Render the page with the list of the issues of the project after an issue has been removed
 * The list of issues is retrieved from the database using the id of the project.
 * REMOVE_ISSUES_ROUTE is the route of the page.
 * function is the function to apply when this route is called.
 */
app.post(REMOVE_ISSUE_ROUTE, function(req, res) {
  console.log('Removed')
  const issueId = req.body.issueId
  db._deleteIssue(issueId)

  res.redirect('back')
})

/**
 * Render the page with the list of the issues of the project after an issue has been created.
 * The new issue is created and added to the database.
 * Then the list of the issues is updated.
 * It redirect to the list of the issues page.
 * CREATE_ISSUES_ROUTE is the route of the page.
 * function is the function to apply when this route is called.
 */
app.post(CREATE_ISSUE_ROUTE, function(req, res) {
  const issueName = req.body.issueName
  const issueDescription = req.body.issueDescription
  const issuePriority = req.body.issuePriority
  const issueDifficulty = req.body.issueDifficulty

  db._addIssueToProject(
    projectId,
    issueName,
    issueDescription,
    issuePriority,
    issueDifficulty
  ).then(result => {
    res.redirect('back')
  })
})

module.exports.app = app

/* CONFIG */
const express = require('express')
const app = express()

/* REQUIRED */
const path = require('path')
const ejs = require('ejs')
let bodyParser = require('body-parser')
const db = require('./db_connection')
const project = require('./classes/Project')
const issue = require('./classes/Issue')
const member = require('./classes/Member')

/* USE THE REQUIRES */
app.use(bodyParser.urlencoded({ extended: false }))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './..', '/views'))

const NEW_ISSUE_ROUTE = '/newIssue'
const LIST_ISSUES_ROUTE = '/listIssues'
const CREATE_ISSUE_ROUTE = '/createIssue'

const NEW_ISSUE_VIEW_PATH = '../views/newIssue'
const LIST_ISSUES_VIEW_PATH = '../views/listIssues'

const DEFAULT_ISSUE_ID = ''

let projectId = ''
let user = new member.Member ('m1', 'pwd1', [])

/* TESTS ZONE */
let currentproject = new project.Project ('p1', 'p1', 'id1', [], user)

app.get (NEW_ISSUE_ROUTE, function (req, res){
  projectId = req.query.projectId
  res.render (NEW_ISSUE_VIEW_PATH, {
    projectId: projectId
  })
})

app.post(CREATE_ISSUE_ROUTE + projectId, function(req, res){
  const issueName = req.body.issueName
  const issueDescription = req.body.issueDescription
  const issuePriority = req.body.issuePriority
  const issueDifficulty = req.body.issueDifficulty
  console.log("Issue " + issueName + " created")

  let newIssue = new issue.Issue(DEFAULT_ISSUE_ID, projectId, issueName, issueDescription, issuePriority, issueDifficulty)
  db._addIssueToProject(projectId, issueName, issueDescription, issuePriority, issueDifficulty)
  // TODO: récupérer l'id pour pouvoir màj la list
  // TODO: récupérer la liste des issues depuis la DB

  let listIssues = []
  listIssues.push(newIssue)

  res.render(LIST_ISSUES_VIEW_PATH, {
    listIssues: listIssues,
    projectId: projectId,
    project: currentproject
  })
})

module.exports.app = app
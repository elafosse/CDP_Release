/* CONFIG */
const express = require('express')
const app = express()

/* REQUIRED */
const path = require('path')
const ejs = require('ejs')
let bodyParser = require('body-parser')
const db = require('./db_connection')
const member = require('./classes/Member')
const project = require('./classes/Project')
const issue = require('./classes/Issue')
const newIssue = require('./newIssue')

/* USE THE REQUIRES */
app.use(bodyParser.urlencoded({ extended: false }))
app.use(newIssue.app)

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './..', '/views'))

const LIST_ISSUES_ROUTE = '/listIssues'
const REMOVE_ISSUE_ROUTE = '/removeIssue'

const LIST_ISSUES_VIEW_PATH = '../views/listIssues'

let listIssues = []
let user = new member.Member ('m1', 'pwd1', [])
//let currentProject

/* TESTS ZONE */
/*let currentProject = new project.Project ('p1', 'p1', '2', [], user)
let i1 = new issue.Issue('i1', 'i1', currentProject.id, 'id1', '1', '1')
let i2 = new issue.Issue('i2', 'i2', currentProject.id, 'id2', '1', '1')
let i3 = new issue.Issue('i3', 'i3', currentProject.id, 'id3', '1', '1')*/
/*listIssues.push(i1)
listIssues.push(i2)
listIssues.push(i3)*/

/* FUNCTIONS */
/* FUNCTIONS */

function removeIssue (id, listIssues){
  listIssues.forEach(issue => {
    if (issue.id === id){
      let index = listIssues.indexOf (issue)
      listIssues.splice (index, 1)
    }
  })
}

app.get(LIST_ISSUES_ROUTE, function(req, res) {
  let projectId = req.query.projectId
  console.log(projectId)
  db._getProjectFromProjectId(projectId).then(result =>{
    console.log(result)
    let currentProject = result
    
  //listIssues = db.getAllProjectIssues(currentProject.id)
  res.render(LIST_ISSUES_VIEW_PATH, {
    listIssues: listIssues,
    project: currentProject,
    user: user
  })
  })
})

app.post(REMOVE_ISSUE_ROUTE, function(req, res) {

  let projectId = req.query.projectId
  console.log(projectId)
  db._getProjectFromProjectId(projectId).then(result =>{
    console.log(result)
    let currentProject = result
  })

  const issueId = req.body.issueId;
  removeIssue (issueId, listIssues)

  db._deleteIssue(issueId)
 
  res.render(LIST_ISSUES_VIEW_PATH, {
    listIssues: listIssues,
    projectId: currentProject.id,
    project: currentProject,
    user: user
  })
})

module.exports = {
  app: app,
  listIssues: listIssues
}
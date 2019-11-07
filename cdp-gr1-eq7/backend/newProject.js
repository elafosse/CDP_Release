/* CONFIG */
const express = require('express')
const app = express()

/* REQUIRED */
const path = require('path')
const ejs = require('ejs')
let bodyParser = require('body-parser')
const db = require('./db_connection')
const project = require ('./classes/Project')
const member = require ('./classes/Member')

/* USE THE REQUIRES */
app.use(bodyParser.urlencoded({ extended: false }))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './..', '/views'))

const NEW_PROJECT_ROUTE = '/newProject'
const ADD_MEMBER_ROUTE = '/addMember'
const REMOVE_MEMBER_ROUTE = '/removeMember'
const CREATE_PROJECT_ROUTE = '/createProject'

const NEW_PROJECT_VIEW_PATH = '../views/newProject'
const PROJECT_OVERVIEW_VIEW_PATH = '../views/overviewProject'

const DEFAULT_PROJECT_ID = '10'

/* TESTS ZONE */
let user = new member.Member ('m1', 'pwd1', [])

/* FUNCTIONS */
let listMembers = []

function removeMember (username, listMembers){
    listMembers.forEach(member => {
      if (member.username === username){
        let index = listMembers.indexOf (member)
        let removed = listMembers.splice (index, 1)
      }
    })
}

app.get (NEW_PROJECT_ROUTE, function (req, res){
  res.render (NEW_PROJECT_VIEW_PATH, {
    listMembers: listMembers
  })
})

/*app.get(PROJECT_OVERVIEW_ROUTE, function(req, res){
  res.render(PROJECT_OVERVIEW_PATH)
})*/

app.post(ADD_MEMBER_ROUTE, function(req, res){
  const memberUsernameToAdd = req.body.memberUsernameToAdd
  console.log("added " + memberUsernameToAdd)
  let newMember = new member.Member(memberUsernameToAdd, '', [])
  
  listMembers.push(newMember)
  res.render(NEW_PROJECT_VIEW_PATH, {
    listMembers: listMembers
  })
})

app.post(REMOVE_MEMBER_ROUTE, function(req, res){
  const memberUsernameToRemove = req.body.memberUsernameToRemove
  console.log("removed " + memberUsernameToRemove)
  
  removeMember(memberUsernameToRemove, listMembers)
  res.render(NEW_PROJECT_VIEW_PATH, {
    listMembers: listMembers
  })
})

app.post(CREATE_PROJECT_ROUTE, function(req, res){
  const projectName = req.body.projectName
  const projectDescription = req.body.projectDescription
  console.log("Project " + projectName + " created")

  db._createProject(projectName, projectDescription).then(result =>{
    console.log(result)

    //db.inviteMembersToProject(projectId, listMembers, areAdminsList)
    // TODO: récupérer l'id pour pouvoir màj les membres et l'objet newProject

    db._getProjectFromProjectId(result).then(newProject =>{
      res.render(PROJECT_OVERVIEW_VIEW_PATH, {
        project: newProject,
        projectId: DEFAULT_PROJECT_ID
      })
    })
  })
})

module.exports.app = app

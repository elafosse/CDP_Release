/* CONFIG */
const express = require('express')
const app = express()

/* REQUIRED */
const path = require('path')
const ejs = require('ejs')
let bodyParser = require('body-parser')
const session = require('express-session')
const db = require('./db_connection')
const overviewProject = require('./overviewProject')

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

app.use(overviewProject.app)

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './..', '/views'))

const PROJECT_SETTINGS_ROUTE = '/projectSettings'
const ADD_MEMBER_ROUTE = '/addMemberSettings'
const REMOVE_MEMBER_ROUTE = '/removeMemberSettings'
const UPDATE_PROJECT_ROUTE = '/projectSettings'

const PROJECT_SETTINGS_VIEW_PATH = '../views/projectSettings'

const PROJECT_OVERVIEW_REDIRECT_URL = '/overviewProject?projectId='

const DEFAULT_GITHUB = ''

/* FUNCTIONS */
let sess
let project
let projectId
let oldMembers = []
let newMembers = []
let areAdmins = []
let creatorUsername = DEFAULT_GITHUB
let projectName = DEFAULT_GITHUB
let projectDescription = DEFAULT_GITHUB
let userGitHub = DEFAULT_GITHUB
let repositoryGitHub = DEFAULT_GITHUB

/**
 * Remove a membre from the list of the members displayed
 * @param {string} username - The username of the member to remove.
 * @param {Array} listMembers - The list of the members to add to the project. The member will be removed from this list.
 */
function removeMember(username, listMembers) {
  listMembers.forEach(member => {
    if (member === username) {
      let index = listMembers.indexOf(member)
      listMembers.splice(index, 1)
    }
  })
}

/**
 * Render the page with the form to modify the settings of a project
 * The name, the description, the userGitHub and the repositoryGitHub field are filled
 * with the information of the project in the database.
 * PROJECT_SETTINGS_VIEW_PATH is a string representing the path of the view to render.
 * PROJECT_SETTINGS_ROUTE is the route of the page.
 * function is the function to apply when this route is called.
 */
app.get(PROJECT_SETTINGS_ROUTE, function(req, res) {
  projectId = req.query.projectId
  sess = req.session

  oldMembers = []
  newMembers = []
  areAdmins = []

  db._getProjectFromProjectId(projectId).then(p => {
    project = p
    projectName = project.name
    projectDescription = project.description
    userGitHub = project.userGitHub
    repositoryGitHub = project.repositoryGitHub

    db._getAdminsOfProject(projectId).then(admins => {
      // check if the user is an administrator of the project
      if (admins.indexOf(sess.username) !== -1) {
        db._getMembersOfProject(projectId).then(members => {
          oldMembers = members
          creatorUsername = members.pop()
          newMembers = oldMembers
          res.render(PROJECT_SETTINGS_VIEW_PATH, {
            projectName: projectName,
            projectDescription: projectDescription,
            userGitHub: userGitHub,
            repositoryGitHub: repositoryGitHub,
            project: sess.project,
            session: sess,
            listMembers: newMembers
          })
        })
      }
    })
  })
})

/**
 * Render the page with the form to update a project after a member has been added.
 * The list of the members show the newly added member.
 * PROJECT_SETTINGS_VIEW_PATH is a string representing the path of the view to render.
 * ADD_MEMBER_ROUTE is the route of the page.
 * function is the function to apply when this route is called.
 */
app.post(ADD_MEMBER_ROUTE, function(req, res) {
  projectName = req.body.projectName
  projectDescription = req.body.projectDescription
  userGitHub = req.body.userGitHub
  repositoryGitHub = req.body.repositoryGitHub
  const memberUsernameToAdd = req.body.memberUsernameToAdd
  console.log('Added member ' + memberUsernameToAdd)

  newMembers.push(memberUsernameToAdd)
  res.render(PROJECT_SETTINGS_VIEW_PATH, {
    projectName: projectName,
    projectDescription: projectDescription,
    userGitHub: userGitHub,
    repositoryGitHub: repositoryGitHub,
    project: sess.project,
    session: sess,
    listMembers: newMembers
  })
})

/**
 * Render the page with the form to update a project after a member has been removed.
 * The list of the members show the other members.
 * PROJECT_SETTINGS_VIEW_PATH is a string representing the path of the view to render.
 * REMOVE_MEMBER_ROUTE is the route of the page.
 * function is the function to apply when this route is called.
 */
app.post(REMOVE_MEMBER_ROUTE, function(req, res) {
  projectName = req.body.projectName
  projectDescription = req.body.projectDescription
  userGitHub = req.body.userGitHub
  repositoryGitHub = req.body.repositoryGitHub
  const memberUsernameToRemove = req.body.memberUsernameToRemove
  console.log('Removed member ' + memberUsernameToRemove)

  removeMember(memberUsernameToRemove, newMembers)
  res.render(PROJECT_SETTINGS_VIEW_PATH, {
    projectName: projectName,
    projectDescription: projectDescription,
    userGitHub: userGitHub,
    repositoryGitHub: repositoryGitHub,
    project: sess.project,
    session: sess,
    listMembers: newMembers
  })
})

/**
 * Update the project in the database with the information the user entered in the form.
 * Render the overview of the project.
 * Only an administrator of the project can do this.
 * The user is always the last member of the list.
 * PROJECT_OVERVIEW_REDIRECT_URL is a string representing the path of the view to render.
 * CREATE_PROJECT_ROUTE is the route of the page.
 * function is the function to apply when this route is called.
 */
app.post(UPDATE_PROJECT_ROUTE, function(req, res) {
  projectName = req.body.projectName
  projectDescription = req.body.projectDescription
  userGitHub = req.body.userGitHub
  repositoryGitHub = req.body.repositoryGitHub

  console.log('Project ' + projectName + ' updated')

  for (i = 0; i < newMembers.length; i++) {
    areAdmins.push(0)
  }

  // the last member of the project if always the user
  newMembers.push(creatorUsername)
  areAdmins.push(1)

  db._modifyProject(
    projectId,
    projectName,
    projectDescription,
    userGitHub,
    repositoryGitHub
  ).then(p => {
    // get all the old members of the project from the database
    db._getMembersOfProject(projectId).then(members => {
      oldMembers = members
      // remove all the old members of the project in the database
      db._deleteMembersFromProject(projectId, oldMembers).then(resul => {
        // add the new members to the project in the database
        db._inviteMembersToProject(projectId, newMembers, areAdmins).then(
          db._getProjectFromProjectId(projectId).then(updatedProject => {
            res.redirect(PROJECT_OVERVIEW_REDIRECT_URL + projectId)
          })
        )
      })
    })
  })
})

module.exports.app = app

/* CONFIG */
const express = require('express')
const app = express()

/* REQUIRED */
const path = require('path')
const ejs = require('ejs')
let bodyParser = require('body-parser')
const session = require('express-session')
const db = require('./db_connection')

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

const NEW_PROJECT_ROUTE = '/newProject'
const ADD_MEMBER_ROUTE = '/addMember'
const REMOVE_MEMBER_ROUTE = '/removeMember'
const CREATE_PROJECT_ROUTE = '/createProject'

const NEW_PROJECT_VIEW_PATH = '../views/newProject'

const PROJECT_OVERVIEW_REDIRECT_URL = '/overviewProject?projectId='

const DEFAULT_FIELD = ''

/* FUNCTIONS */
let sess

let listMembers = []
let areAdmins = []
let projectName = DEFAULT_FIELD
let projectDescription = DEFAULT_FIELD
let userGitHub = DEFAULT_FIELD
let repositoryGitHub = DEFAULT_FIELD

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
 * Render the page with the form to create a new project.
 * By default, the name, the description, the userGitHub and the repositoryGitHub field are set to ''.
 * NEW_PROJECT_VIEW_PATH is a string representing the path of the view to render.
 * NEW_PROJECT_ROUTE is the route of the page.
 * function is the function to apply when this route is called.
 */
app.get(NEW_PROJECT_ROUTE, function(req, res) {
  listMembers = []
  areAdmins = []
  projectName = DEFAULT_FIELD
  projectDescription = DEFAULT_FIELD
  userGitHub = DEFAULT_FIELD
  repositoryGitHub = DEFAULT_FIELD
  sess = req.session

  res.render(NEW_PROJECT_VIEW_PATH, {
    projectName: projectName,
    projectDescription: projectDescription,
    userGitHub: userGitHub,
    repositoryGitHub: repositoryGitHub,
    session: sess,
    listMembers: listMembers
  })
})

/**
 * Render the page with the form to create a new project after a member has been added.
 * The list of the members show the newly added member.
 * NEW_PROJECT_VIEW_PATH is a string representing the path of the view to render.
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

  listMembers.push(memberUsernameToAdd)
  res.render(NEW_PROJECT_VIEW_PATH, {
    projectName: projectName,
    projectDescription: projectDescription,
    userGitHub: userGitHub,
    repositoryGitHub: repositoryGitHub,
    session: sess,
    listMembers: listMembers
  })
})

/**
 * Render the page with the form to create a new project after a member has been removed.
 * The list of the members show the other members.
 * NEW_PROJECT_VIEW_PATH is a string representing the path of the view to render.
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

  removeMember(memberUsernameToRemove, listMembers)
  res.render(NEW_PROJECT_VIEW_PATH, {
    projectName: projectName,
    projectDescription: projectDescription,
    userGitHub: userGitHub,
    repositoryGitHub: repositoryGitHub,
    session: sess,
    listMembers: listMembers
  })
})

/**
 * Create the project with the information the user entered in the form and add it to the database.
 * Render the overview of the newly created project.
 * The list of the members and administrators of the project is added to the database at this moment.
 * The creator of the project is always the last member of the list.
 * PROJECT_OVERVIEW_REDIRECT_URL is a string representing the path of the view to render.
 * CREATE_PROJECT_ROUTE is the route of the page.
 * function is the function to apply when this route is called.
 */
app.post(CREATE_PROJECT_ROUTE, function(req, res) {
  projectName = req.body.projectName
  projectDescription = req.body.projectDescription
  userGitHub = req.body.userGitHub
  repositoryGitHub = req.body.repositoryGitHub
  console.log('Project ' + projectName + ' created')

  for (i = 0; i < listMembers.length; i++) {
    areAdmins.push(0)
  }

  // the last member of the project if always the user
  listMembers.push(sess.username)
  areAdmins.push(1)

  db._createProject(
    projectName,
    projectDescription,
    userGitHub,
    repositoryGitHub
  ).then(projectId => {
    db._inviteMembersToProject(projectId, listMembers, areAdmins).then(
      db._getProjectFromProjectId(projectId).then(newProject => {
        sess.project = newProject
        req.session = sess
        res.redirect(PROJECT_OVERVIEW_REDIRECT_URL + projectId)
      })
    )
  })
})

module.exports.app = app

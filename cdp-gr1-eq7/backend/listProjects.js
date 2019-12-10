/* CONFIG */
const express = require('express')
const app = express()
const session = require('express-session')

/* REQUIRED */
const path = require('path')
const ejs = require('ejs')
let bodyParser = require('body-parser')
const db = require('./db_connection')
const newProject = require('./newProject')

/* USE THE REQUIRES */
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('../public')) // Mettre l'URL du dossier 'public' par rapport a initApp.js
app.use(newProject.app)
app.use(
  session({
    secret: 'shhhhhhared-secret',
    saveUninitialized: true,
    resave: true
  })
)

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './..', '/views'))

const LIST_PROJECTS_ROUTE = '/listProjects'
const REMOVE_PROJECT_ROUTE = '/removeProject'

const LIST_PROJECTS_VIEW_PATH = '../views/listProjects'

let sess
let listProjects = []

/* FUNCTIONS */

/**
 * Remove a project from the list of the projects displayed
 * @param {int} id - The id of the project to remove.
 * @param {Array} listProjects - The list of the projects of the user. The project will be removed from this list.
 */
function removeProject(id, listProjects) {
  listProjects.forEach(project => {
    if (project.id == id) {
      let index = listProjects.indexOf(project)
      listProjects.splice(index, 1)
    }
  })
}

/**
 * Render the page with the list of the projects of the user.
 * The list of projects is retrieved from the database.
 * LIST_PROJECTS_VIEW_PATH is a string representing the path of the view to render.
 * LIST_PROJECTS_ROUTE is the route of the page.
 * function is the function to apply when this route is called.
 */
app.get(LIST_PROJECTS_ROUTE, function(req, res) {
  listProjects = []
  sess = req.session

  db._getProjectsOfMember(sess.username).then(listProjectsMembers => {
    listProjectsMembers.forEach(element => {
      listProjects.push(element)
    })
    sess.listProjects = listProjects

    res.render(LIST_PROJECTS_VIEW_PATH, {
      session: sess,
      listProjects: listProjects
    })
  })
})

/**
 * Render the page with the list of the projects of the user after a project has been deleted.
 * It deletes the project from the database.
 * LIST_PROJECTS_VIEW_PATH is a string representing the path of the view to render.
 * REMOVE_PROJECT_ROUTE is the route of the page.
 * function is the function to apply when this route is called.
 */
app.post(REMOVE_PROJECT_ROUTE, function(req, res) {
  const projectId = req.body.projectId
  removeProject(projectId, listProjects)

  db._deleteProject(projectId)
  res.render(LIST_PROJECTS_VIEW_PATH, {
    session: sess,
    listProjects: listProjects
  })
})

module.exports.app = app

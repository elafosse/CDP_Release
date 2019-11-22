/* CONFIG */
const express = require('express')
const app = express()

/* REQUIRED */
const path = require('path')
const ejs = require('ejs')
let bodyParser = require('body-parser')
const db = require('./db_connection')
const session = require('express-session')
/*const newSprint = require('./newSprint')
const modifySprint = require('./modifySprint')*/

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
/*app.use(newSprint.app)
app.use(modifySprint.app)*/

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './..', '/views'))

const LIST_SPRINTS_ROUTE = '/listSprints'
const REMOVE_SPRINT_ROUTE = '/removeSprint'

const LIST_SPRINTS_VIEW_PATH = '../views/listSprints'

let listSprints = []
let projectId
let currentProject
let sess

/* FUNCTIONS */

function removeSprint(id, list) {
  list.forEach(sprint => {
    if (sprint.id == id) {
      let index = list.indexOf(sprint)
      list.splice(index, 1)
    }
  })
}

app.get(LIST_SPRINTS_ROUTE, function(req, res) {
  listSprints = []
  projectId = req.query.projectId
  sess = req.session

  db._getProjectFromProjectId(projectId).then(result => {
    currentProject = result
    /*db._getAllProjectSprints(result.id).then(Sprints => {
      sprints.forEach(sprint =>{
        listSprints.push(sprint)
      })*/
    res.render(LIST_SPRINTS_VIEW_PATH, {
      session: sess,
      listSprints: listSprints,
      project: currentProject
    })
    //})
  })
})

app.post(REMOVE_SPRINT_ROUTE, function(req, res) {
  console.log('Removed')
  const sprintId = req.body.sprintId
  removeSprint(sprintId, listSprints)
  //db._deleteSprint(sprintId)

  res.render(LIST_SPRINTS_VIEW_PATH, {
    session: sess,
    listSprints: listSprints,
    projectId: projectId,
    project: currentProject
  })
})

module.exports.app = app

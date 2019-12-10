/* CONFIG */
const express = require('express')
const app = express()

/* REQUIRED */
const path = require('path')
const bodyParser = require('body-parser')
const db = require('./db_connection')
const session = require('express-session')

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

const MODIFY_SPRINT_OF_RELEASE_ROUTE = '/modifySprintOfRelease'

const MODIFY_SPRINT_OF_RELEASE_VIEW_PATH = '../views/modifySprintOfRelease'

const MODIFY_SPRINT_OF_RELEASE_REDIRECT_URL = '/listReleases?projectId='

const NO_RELEASE_ID = -1

let releaseId
let projectId
let sess
let listSprints = []

/**
 * Return the id of the sprint checked by the user in the form.
 * @param {object} req - Used to get the issues checked by the user in the form.
 * @param {Array} listSprints - The list of the sprints of the project
 * @returns {int}
 */
function sprintIdChecked(req, listSprints) {
  let result = NO_RELEASE_ID
  listSprints.forEach(sprint => {
    if (req.body['' + sprint.id] !== undefined) {
      result = sprint.id
    }
  })
  return result
}

/**
 * Display the form to add or update the sprint linked to a release.
 * Get all the sprints of the project from the database.
 * MODIFY_SPRINT_OF_RELEASE_ROUTE is the route to display the form.
 * MODIFY_SPRINT_OF_RELEASE_VIEW_PATH is the path to the view of this route.
 * function is the function applied to this route.
 */
app.get(MODIFY_SPRINT_OF_RELEASE_ROUTE, function(req, res) {
  projectId = req.query.projectId
  releaseId = req.query.releaseId
  sess = req.session

  db._getProjectFromProjectId(projectId).then(project => {
    req.session = sess
    db._getAllSprintFromProject(projectId).then(sprints => {
      listSprints = sprints
      res.render(MODIFY_SPRINT_OF_RELEASE_VIEW_PATH, {
        releaseId: releaseId,
        session: sess,
        project: sess.project,
        listSprints: listSprints
      })
    })
  })
})

/**
 * Add or update the checked sprint of a release to the database.
 * A release cannot be linked to more than one sprint at once.
 * Render the list of releases once the sprint has been added or modified.
 * MODIFY_SPRINT_OF_RELEASE_ROUTE is the route to modify the sprint linked to a release
 * MODIFY_SPRINT_OF_RELEASE_REDIRECT_URL is the string representing the URL of the list of
 * the releases displayed once the sprint of a release has been added or modified.
 * function is the function applied to this route.
 */
app.post(MODIFY_SPRINT_OF_RELEASE_ROUTE, function(req, res) {
  const newSprintId = sprintIdChecked(req, listSprints)

  // check if the release already has a sprint
  listSprints.forEach(sprint => {
    if (sprint.release == releaseId) {
      // update the old sprint so it is not linked to the release anymore
      db._updateSprintRelease(sprint.id, NO_RELEASE_ID)
      sprint.release = NO_RELEASE_ID
    }
    // link the new sprint to the release
    if (sprint.id === newSprintId) {
      db._updateSprintRelease(sprint.id, releaseId)
    }
  })

  res.redirect(MODIFY_SPRINT_OF_RELEASE_REDIRECT_URL + projectId)
})

module.exports.app = app

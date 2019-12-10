/* CONFIG */
const express = require('express')
const app = express()

/* REQUIRED */
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')
const db = require('./db_connection')

/* USE THE REQUIRES */
app.use(bodyParser.urlencoded({ extended: false }))
app.use(
  session({
    secret: 'shhhhhhared-secret',
    saveUninitialized: true,
    resave: true
  })
)

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './..', '/views'))

const PROJECT_OVERVIEW_ROUTE = '/overviewProject'

const PROJECT_OVERVIEW_VIEW_PATH = '../views/overviewProject'

/**
 * Determine if an issue is finished, ongoing or to do based on its tasks status.
 * @param {*} taskStatus - The status of the tasks of the issue.
 * @return {int}
 */
function getIssueState(taskStatus) {
  if (taskStatus === undefined) {
    return 4
  }
  if (!taskStatus.total) {
    return 4
  }
  if (taskStatus.totalDoing || (taskStatus.totalToDo && taskStatus.totalDone)) {
    return 2
  }
  if (taskStatus.totalToDo) {
    return 3
  }
  if (taskStatus.totalDone === taskStatus.total) {
    return 1
  }
  return 4
}

let projectId
let sess
let projectIssuesSummary = [0, 0, 0, 0, 0]
let sprintIssuesSummary = [0, 0, 0, 0, 0]
let sprintTasksSummary = [0, 0, 0, 0]

let promiseList = []
/**
 * Render the overview of the project.
 * Shows the current sprint and how many of its issues and tasks are "to do", "ongoing" and "done".
 * Shows how many of issues and tasks in all the projet are "to do", "ongoing" and "done".
 * PROJECT_OVERVIEW_ROUTE is the route of the overview.
 * PROJECT_OVERVIEW_VIEW_PATH is the path to the view of this route.
 * function is the function applied to this route.
 */
app.get(PROJECT_OVERVIEW_ROUTE, function(req, res) {
  projectId = req.query.projectId
  projectIssuesSummary = [0, 0, 0, 0, 0]
  sprintIssuesSummary = [0, 0, 0, 0, 0]
  sprintTasksSummary = [0, 0, 0, 0]
  promiseList = []
  sprintIssuesId = []

  let promiseProjectInfo = db
    ._getProjectFromProjectId(projectId)
    .then(project => {
      projectId = req.query.projectId

      sess = req.session
      sess.project = project
    })
  promiseList.push(promiseProjectInfo)

  let promiseProjectIssuesCount = db
    ._getCountIssuesProject(projectId)
    .then(count => {
      projectIssuesSummary[0] = count[0].total
    })
  promiseList.push(promiseProjectIssuesCount)

  let promiseGetAllSprintIssues = db
    ._getCurrentSprint(projectId)
    .then(sprintId => {
      if (sprintId.length) {
        db._getIssuesIdsOfSprint(sprintId[0].id).then(issues => {
          sprintIssuesId = Array.from(issues)
        })
      }
    })
  promiseList.push(promiseGetAllSprintIssues)

  let promiseProjectIssuesState = db
    ._getAllProjectIssues(projectId)
    .then(issues => {
      promiseList.push(
        new Promise((resolve, reject) => {
          issues.forEach((issue, index, array) => {
            db._getCountTasksStatesFromIssues(issue.id).then(result => {
              let status = getIssueState(result[0])
              ++projectIssuesSummary[status]
              if (sprintIssuesId.length) {
                if (sprintIssuesId.includes(issue.id)) {
                  ++sprintIssuesSummary[status]
                }
              }
            })
            if (index === array.length - 1) resolve()
          })
        })
      )
    })
  promiseList.push(promiseProjectIssuesState)

  let promiseSprintIssuesCount = db
    ._getCountIssuesLastSprint(projectId)
    .then(count => {
      sprintIssuesSummary[0] = count[0].total
    })
  promiseList.push(promiseSprintIssuesCount)

  let promiseTaskStateCount = db._getCurrentSprint(projectId).then(sprintId => {
    if (sprintId.length) {
      db._getCountTasksStatesFromSprint(sprintId[0].id).then(result => {
        sprintTasksSummary[0] += result[0].total
        sprintTasksSummary[1] += result[0].totalDone
        sprintTasksSummary[2] += result[0].totalDoing
        sprintTasksSummary[3] += result[0].totalToDo
      })
    }
  })
  promiseList.push(promiseTaskStateCount)

  Promise.all(promiseList).then(() => {
    res.render(PROJECT_OVERVIEW_VIEW_PATH, {
      session: req.session,
      project: sess.project,
      projectId: projectId,
      listProjects: sess.listProjects,
      projectIssuesSummary: projectIssuesSummary,
      sprintIssuesSummary: sprintIssuesSummary,
      sprintTasksSummary: sprintTasksSummary
    })
  })
})

module.exports.app = app

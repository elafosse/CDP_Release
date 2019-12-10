/* CONFIG */
const express = require('express')
const app = express()

/* REQUIRED */
const path = require('path')
const bodyParser = require('body-parser')
const db = require('./db_connection')

/* USE THE REQUIRES */
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('../public'))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './..', '/views'))

const TASK_PATH = '../views/newTask.ejs'

let sess

let listIssues
let listProjectMembers
let listProjectTasks

let action

/**
 * Transform an objet into an Array.
 * @param {object} data
 * @returns {Array}
 */
function turnToArray(data) {
  if (data === undefined) {
    data = []
  } else if (!Array.isArray(data)) {
    data = [data]
  }
  return data
}

/**
 * Render the page with the form to create a new task.
 * Get the lists of issues, membres and tasks of the project and display them in the form.
 * '/newTask' is the route of the page.
 * NEW_TASK_PATH is the path to the view to create a new task.
 * function is the function to apply when this route is called.
 * action is a string to tell the view at TASK_PATH whether it needs to display the form to create a new task of modify one.
 * Set action to 'create' to display the form to create a new task.
 */
app.get('/newTask', function(req, res) {
  action = 'create'
  listIssues = []
  listProjectMembers = []
  listProjectTasks = []
  sess = req.session

  db._getAllProjectIssues(req.query.projectId).then(result => {
    listIssues = result
    db._getMembersOfProject(req.query.projectId).then(result => {
      listProjectMembers = result
      db._getAllTasksOfProject(req.query.projectId).then(result => {
        listProjectTasks = result
        res.render(TASK_PATH, {
          action: action,
          listIssues: listIssues,
          listProjectMembers: listProjectMembers,
          listProjectTasks: listProjectTasks,
          projectId: req.query.projectId,
          session: sess,
          project: sess.project,
          listProjects: sess.listProjects
        })
      })
    })
  })
})

/**
 * Create a new task with the information entered in the form by the user.
 * The task is added to the database at this moment.
 * The issues and tasks linked to this one are also updated in the database.
 * Render the page with the list of issues after a new task is created.
 * '/newTask' is the route of the page.
 * function is the function to apply when this route is called.
 */
app.post('/newTask', function(req, res) {
  let issues = turnToArray(req.body.taskIssue)
  let taskRequired = turnToArray(req.body.taskRequired)
  let taskMember = turnToArray(req.body.taskMember)
  db._addTask(
    req.query.projectId,
    req.body.taskName,
    req.body.taskDescription,
    req.body.taskState,
    req.body.startDate,
    req.body.taskDuration,
    req.body.taskDoD,
    taskRequired,
    taskMember,
    issues
  ).then(res.redirect('/listTasks?projectId='.concat(req.query.projectId)))
})

/**
 * Render the page with the form to modify a task.
 * By default, the form is filled with the current information of the task.
 * These information are taken from the database.
 * '/modifyTask' is the route to modify a task.
 * TASK_PATH is the path to the view of the page.
 * function is the function applied to this route.
 * action is a string to tell the view at TASK_PATH whether it needs to display the form to create a new task of modify one.
 * Set action to 'modify' to display the form to modify a task.
 */
app.get('/modifyTask', function(req, res) {
  let task
  action = 'modify'

  listIssues = []
  listProjectMembers = []
  listProjectTasks = []
  sess = req.session

  db._getTaskById(req.query.taskId).then(result => {
    task = result
    db._getAllProjectIssues(req.query.projectId).then(result => {
      listIssues = result
      db._getMembersOfProject(req.query.projectId).then(result => {
        listProjectMembers = result
        db._getAllTasksOfProject(req.query.projectId).then(result => {
          listProjectTasks = result
          res.render(TASK_PATH, {
            action: action,
            task: task,
            listIssues: listIssues,
            listProjectMembers: listProjectMembers,
            listProjectTasks: listProjectTasks,
            projectId: req.query.projectId,
            session: sess,
            project: sess.project,
            listProjects: sess.listProjects
          })
        })
      })
    })
  })
})

/**
 * Update the task in the database with the information entered by the user.
 * It needs to turn the issues, tasks required and membres assigned to this
 * task into arrays of objects to update the task in the database.
 * The database is updated at this moment.
 * '/modifyTask' is the route to modify a task.
 * function is the function applied to this route.
 */
app.post('/modifyTask', function(req, res) {
  let issues = turnToArray(req.body.taskIssue)
  let taskRequired = turnToArray(req.body.taskRequired)
  let taskMember = turnToArray(req.body.taskMember)

  db._modifyTask(
    req.query.taskId,
    req.body.taskName,
    req.body.taskDescription,
    req.body.taskState,
    req.body.startDate,
    req.body.taskDuration,
    req.body.taskDoD
  ).then(() => {
    db._setTaskToIssue(req.query.taskId, issues).then(() => {
      db._setTaskDependencies(req.query.taskId, taskRequired).then(() => {
        db._setTaskToMembers(req.query.taskId, taskMember).then(() => {
          res.redirect('/listTasks?projectId='.concat(req.query.projectId))
        })
      })
    })
  })
})

module.exports.app = app

/* CONFIG */
const express = require('express')
const app = express()

/* REQUIRED */
const path = require('path')
const bodyParser = require('body-parser')
const db = require('./db_connection')
const newTask = require('./newTask')

/* USE THE REQUIRES */
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('../public')) // Mettre l'URL du dossier 'public' par rapport a initApp.js
app.use(newTask.app)

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './..', '/views'))

const LIST_TASKS_PATH = '../views/listTasks.ejs'
const NEW_TASK_PATH = '../views/newTask.ejs'

let sess

let taskToDo
let taskDoing
let taskDone

/**
 * Render the page at the route '/listTasks' with the list of tasks of a project.
 * Get all the tasks and their information from the database.
 * taskToDo is the list of tasks to do.
 * taskDoing is the list of tasks ongoing.
 * taskDone is the list of taks done.
 * function is the function applied to this route.
 */
app.get('/listTasks', function(req, res) {
  taskToDo = []
  taskDoing = []
  taskDone = []
  sess = req.session

  db._getAllTasksOfProjectByState(req.query.projectId, 'To Do').then(result => {
    taskToDo = result
    db._getAllTasksOfProjectByState(req.query.projectId, 'Doing').then(
      result => {
        taskDoing = result
        db._getAllTasksOfProjectByState(req.query.projectId, 'Done').then(
          result => {
            taskDone = result
            res.render(LIST_TASKS_PATH, {
              taskToDo: taskToDo,
              taskDoing: taskDoing,
              taskDone: taskDone,
              projectId: req.query.projectId,
              session: sess,
              project: sess.project,
              listProjects: sess.listProjects
            })
          }
        )
      }
    )
  })
})

/**
 * Render the page at the route '/listTasks' with the list of tasks of a project after a task has been deleted.
 * Delete the task from the database.
 * function is the function applied to this route.
 */
app.post('/removeTask', function(req, res) {
  db._deleteTask(req.query.taskId).then(
    res.redirect('/listTasks?projectId='.concat(req.query.projectId))
  )
})

module.exports.app = app

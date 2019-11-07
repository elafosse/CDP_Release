/* CONFIG */
const express = require('express')
const app = express()

/* REQUIRED */
const path = require('path')
const ejs = require('ejs')
let bodyParser = require('body-parser')
const mysql = require('mysql')
const db = require('./db_connection')
const tasks = require('./classes/Task')

/* USE THE REQUIRES */
app.use(bodyParser.urlencoded({ extended: false }))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './..', '/views'))

const LIST_TASKS_PATH = '../views/listTasks.ejs'
const NEW_TASK_PATH = '../views/newTask.ejs'

app.get('/newTask', function (req, res) {
    res.render(NEW_TASK_PATH)
})

let taskList = [];
/* Test values
const testTask1 = new tasks.Task("2", "1", "Task 1", "Desc task 1", "To Do", "", "", "", [], [])
const testTask2 = new tasks.Task("2", "2", "Task 2", "Desc task 2", "Doing", "", "", "", [], [])
const testTask3 = new tasks.Task("2", "3", "Task 3", "Desc task 3", "Done", "", "", "", [], []) 

taskList.push(testTask1)
taskList.push(testTask2)
taskList.push(testTask3) */

let taskToDo = []
let taskDoing = []
let taskDone = []

app.get('/listTasks', function (req, res) {
    taskList.forEach(task => {
        switch (task.state) {
            case 'To Do':
                taskToDo.push(task);
                break;
            case 'Doing':
                taskDoing.push(task);
                break;
            case 'Done':
                taskDone.push(task);
                break;
        }
    });
    
    res.render(LIST_TASKS_PATH, {
        taskToDo: taskToDo,
        taskDoing: taskDoing,
        taskDone: taskDone
    })
})

module.exports.app = app
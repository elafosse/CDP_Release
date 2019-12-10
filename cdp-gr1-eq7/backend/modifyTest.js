/* CONFIG */
const express = require('express')
const app = express()

/* REQUIRED */
const path = require('path')
let bodyParser = require('body-parser')
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

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './..', '/views'))

const MODIFY_TEST_ROUTE = '/modifyTest'

const MODIFY_TEST_VIEW_PATH = '../views/modifyTest'

const MODIFY_TEST_REDIRECT_URL = '/listTests?projectId='

let listIssuesTest = []

/* FUNCTIONS*/

let test
let testId
let projectId
let sess
let listIssues = []

/**
 * Return an array of the issues id of a list of issues that have been checked
 * by the user in the form.
 * @param {object} req - Used to get the issues checked by the user in the form.
 * @param {Array} listIssues - The list of issues of the test.
 * @returns {Array}
 */
function isChecked(req, listIssues) {
  let result = []
  listIssues.forEach(issue => {
    if (req.body['' + issue.id]) {
      result.push(issue.id)
    }
  })
  return result
}

/**
 * Render the form to modify a test.
 * The fields are filled with the information on the test that are in the database.
 * MODIFY_TEST_ROUTE is the route of the page.
 * MODIFY_TEST_VIEW_PATH is the path to the view of this route.
 * function is the function applied to this route.
 */
app.get(MODIFY_TEST_ROUTE, function(req, res) {
  projectId = req.query.projectId
  testId = req.query.testId
  sess = req.session

  listIssuesTest = []
  listIssues = []

  db._getTestById(testId).then(t => {
    test = t
    db._getAllProjectIssues(projectId).then(issues => {
      listIssues = issues
      db._getIssuesIdsOfTest(testId).then(issuesTest => {
        const listIssuesIdsTest = issuesTest
        res.render(MODIFY_TEST_VIEW_PATH, {
          listIssues: listIssues,
          listIssuesIdsTest: listIssuesIdsTest,
          project: sess.project,
          session: sess,
          test: test
        })
      })
    })
  })
})

/**
 * Update the test in the database with the information entered by the user in the form.
 * The fields are filled with the information on the test that are in the database.
 * Render the list of the tests of the project.
 * MODIFY_TEST_ROUTE is the route to modify a test.
 * MODIFY_TEST_REDIRECT_URL is the string representing the URL of the list of tests.
 * function is the function applied to this route.
 */
app.post(MODIFY_TEST_ROUTE, function(req, res) {
  let newName = req.body.testName
  let newDescription = req.body.testDescription
  let newResultExpected = req.body.testResultExpected
  let newLastVersionValidated = req.body.testLastVersionValidated

  console.log('Test of id ' + testId + ' modified')

  listIssuesTest = isChecked(req, listIssues)

  db._modifyTest(
    testId,
    newName,
    newDescription,
    newResultExpected,
    newLastVersionValidated,
    req.body.testState
  ).then(result => {
    db._setIssuesToTest(testId, listIssuesTest).then(result => {
      res.redirect(MODIFY_TEST_REDIRECT_URL + projectId)
    })
  })
})

module.exports.app = app

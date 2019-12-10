/* eslint-disable camelcase */
var mysql = require('mysql')
var bcrypt = require('bcrypt')

const Project = require('./classes/Project')
const Issue = require('./classes/Issue')
const Task = require('./classes/Task')
const Test = require('./classes/Test')
const Sprint = require('./classes/Sprint')
const Doc = require('./classes/Doc')

// https://stackoverflow.com/questions/30545749/how-to-provide-a-mysql-database-connection-in-single-file-in-nodejs
/*var con = mysql.createConnection({
  host: 'www.remotemysql.com',
  user: 'wjJ627V9qY',
  database: 'wjJ627V9qY',
  password: 'qpxKOx6Pe8',
  multipleStatements: true
})*/

var con = mysql.createConnection({
  host: 'mysql',
  port: '3306',
  user: 'root',
  database: 'scrumhelper',
  password: 'rootpassword',
  multipleStatements: true
})

function _changeDatabaseRouteForTests() {
  con = mysql.createConnection({
    host: '0.0.0.0',
    port: '3307',
    user: 'root',
    database: 'scrumhelper',
    password: 'rootpassword',
    multipleStatements: true
  })
}

// TODO : checker les paramètres vides

// ================ Projects ================
/**
 * Returns a promise that insert a new Project in the database.
 * @param {string} name The project's name
 * @param {string} description The project's description
 * @param {string} userGitHub The user's github username
 * @param {string} repositoryGitHub The project's github repository link
 * @returns new Promise, which returns the new project Id in the database
 */
function _createProject(name, description, userGitHub, repositoryGitHub) {
  return new Promise(function(resolve, reject) {
    const sql = 'INSERT INTO project (name, description, userGitHub, repositoryGitHub) VALUES ('.concat(
      con.escape(name),
      ',',
      con.escape(description),
      ',',
      con.escape(userGitHub),
      ',',
      con.escape(repositoryGitHub),
      ')'
    )
    con.query(sql, function(err, result) {
      if (err) {
        reject(err)
        return
      }
      resolve(result.insertId)
    })
  })
}

/**
 * Returns a promise that modify in the database based on the ID
 * @param {int} projectId The project's id in the database
 * @param {string} name The new project's name
 * @param {string} description The new projet's description
 * @param {string} userGitHub The new user's github username
 * @param {string} repositoryGitHub The new github repository's link
 * @returns new Promise, which returns the number of affected rows
 */
function _modifyProject(
  projectId,
  name,
  description,
  userGitHub,
  repositoryGitHub
) {
  return new Promise(function(resolve, reject) {
    var sql = 'UPDATE project SET'.concat(
      ' name = ',
      con.escape(name),
      ',',
      ' description = ',
      con.escape(description),
      ',',
      ' userGitHub = ',
      con.escape(userGitHub),
      ',',
      ' repositoryGitHub = ',
      con.escape(repositoryGitHub),
      ' WHERE id = ',
      con.escape(projectId),
      ';\n'
    )
    con.query(sql, function(err, result) {
      if (err) reject(err)
      resolve(result.affectedRows)
    })
  })
}

/**
 * Returns a promise that delete a project from the database based on the ID
 * @param {int} id The projet's Id to delete
 * @returns new Promise, which returns the string 'Project Deleted' if it succeed
 */
function _deleteProject(id) {
  return new Promise(function(resolve, reject) {
    let promiseList = []
    let sql = "DELETE FROM project_team WHERE project_id='".concat(id, "'; ")
    promiseList.push(
      _getAllProjectIssues(id).then(issuesId => {
        if (issuesId) {
          for (let i = 0; i < issuesId.length; i++) {
            promiseList.push(_deleteIssue(issuesId[i].id))
          }
        }
      })
    )

    promiseList.push(
      _getAllTasksIdsByProject(id).then(tasksId => {
        if (tasksId) {
          for (let i = 0; i < tasksId.length; i++) {
            promiseList.push(_deleteTask(tasksId[i]))
          }
        }
      })
    )

    promiseList.push(
      _getAllSprintIdsOfProject(id).then(sprintsId => {
        if (sprintsId) {
          for (let i = 0; i < sprintsId.length; i++) {
            promiseList.push(_deleteSprint(sprintsId[i]))
          }
        }
      })
    )

    promiseList.push(
      _getAllTestsIdsFromProject(id).then(testsId => {
        if (testsId) {
          for (let i = 0; i < testsId.length; i++) {
            promiseList.push(_deleteTest(testsId[i]))
          }
        }
      })
    )
    sql.concat("DELETE FROM project WHERE id = '", id), "';"
    Promise.all(promiseList).then(
      con.query(sql, function(err, result) {
        if (err) resolve(err)
        resolve('Project Deleted')
      })
    )
  })
}

/**
 * Returns a promise that add in the database the list of members of a project and whether they are and admin of it or not.
 * Returns an error if usernameList and areAdminsList have different size.
 * @param {int} projectId The project's id of the project to add members
 * @param {string[]} usernameList The list of members to add to the project
 * @param {bool[]} areAdminsList The areAdminsList[i] define if usernameList[i] is an admin
 * @returns new Promise, which returns the string 'Members added' if it succeeds
 */
function _inviteMembersToProject(projectId, usernameList, areAdminsList) {
  return new Promise(function(resolve, reject) {
    if (usernameList.length !== areAdminsList.length) {
      reject(
        new Error(
          'The usernameList and the areAdminsList lenght must be the same'
        )
      )
    }
    let i
    let sql = ''
    for (i = 0; i < usernameList.length; i++) {
      sql = sql.concat(
        'INSERT INTO project_team (project_id, username, is_admin) VALUES (',
        con.escape(projectId),
        ',',
        con.escape(usernameList[i]),
        ',',
        con.escape(areAdminsList[i]),
        ');\n'
      )
    }
    con.query(sql, function(err, result) {
      if (err) reject(err)
      resolve('Members added')
    })
  })
}

/**
 * Returns a promise that delete a list of members from a project in the database
 * @param {int} projectId The projet's id which has members to remove
 * @param {string[]} usernameList The list of users to remove from the project
 * @returns new Promise, which returns the string 'Members deleted' if it succeeds
 */
function _deleteMembersFromProject(projectId, usernameList) {
  return new Promise(function(resolve, reject) {
    let i
    let sql = ''
    for (i = 0; i < usernameList.length; i++) {
      sql = sql.concat(
        'DELETE FROM project_team WHERE project_id = ',
        con.escape(projectId),
        ' and username = ',
        con.escape(usernameList[i]),
        ';\n'
      )
    }
    con.query(sql, function(err, result) {
      if (err) reject(err)
      resolve('Members deleted')
    })
  })
}

/**
 * Returns a promise that select the members of a project from the database
 * @param {int} project_id The id of the project we want the members
 * @returns new Promise, which returns the list of Id (only) of the members
 */
function _getMembersOfProject(project_id) {
  return new Promise(function(resolve, reject) {
    const sql = 'SELECT username FROM project_team WHERE project_id = '.concat(
      con.escape(project_id)
    )
    con.query(sql, function(err, result) {
      if (err) reject(err)
      const id_list = []
      for (let i = 0; i < result.length; i++) {
        id_list.push(result[i].username)
      }
      resolve(id_list)
    })
  })
}

/**
 * Returns a promise that select the members of a project that are admins from the database
 * @param {int} project_id The id of the project we want the admins
 * @returns new Promise, which returns the list of Id (only) of the admins
 */
function _getAdminsOfProject(project_id) {
  return new Promise(function(resolve, reject) {
    const sql = 'SELECT username FROM project_team WHERE project_id = '.concat(
      con.escape(project_id),
      " and is_admin = '1'"
    )
    con.query(sql, function(err, result) {
      if (err) reject(err)
      const id_list = []
      for (let i = 0; i < result.length; i++) {
        id_list.push(result[i].username)
      }
      resolve(id_list)
    })
  })
}

// ================ Members ================
// https://medium.com/@mridu.sh92/a-quick-guide-for-authentication-using-bcrypt-on-express-nodejs-1d8791bb418f

/**
 * Returns a promise which insert a new app user in the database.
 * This method encrypt the passwords using bcrypt before sending them
 * @param {string} username The username of the new app user
 * @param {string} password The password of the new app user
 * @returns new Promise, which returns the id of the new user
 */
function _storeMember(username, password) {
  return new Promise(function(resolve, reject) {
    bcrypt.hash(password, 10, function(err, hashedPassword) {
      if (err) throw err
      const sql = 'INSERT INTO member (username, password) VALUES ('.concat(
        con.escape(username),
        ',',
        con.escape(hashedPassword),
        ')'
      )
      con.query(sql, function(err, result) {
        if (err) {
          reject(err)
          return
        }
        resolve(result.insertId)
      })
    })
  })
}

/**
 * Returns a promise which get the id of the project which the user is part of
 * @param {string} username The username of the user you want the projects
 * @returns new Promise, which returns the list of projects ids
 */
function _getProjectsIdsOfMember(username) {
  return new Promise(function(resolve, reject) {
    // TODO: Vérifier si le couple user/project_id n'existe pas déjà
    const sql = 'SELECT project_id FROM project_team WHERE username = '.concat(
      con.escape(username)
    )
    con.query(sql, function(err, result) {
      if (err) reject(err)
      const id_list = []
      for (let i = 0; i < result.length; i++) {
        id_list.push(result[i].project_id)
      }
      resolve(id_list)
    })
  })
}

/**
 * Returns a new promise which returns all the informations of a project from the database
 * Members of the project are obtained through the _getMembersOfProject method
 * Admins of the project are obtains through the _getAdminsOfProject method
 * @param {int} project_id The id of the project we get the infos from.
 * @returns new Promise, which returns a new Project containing all the infos of a project
 */
function _getProjectFromProjectId(project_id) {
  return new Promise(function(resolve, reject) {
    _getMembersOfProject(project_id).then(
      members => {
        _getAdminsOfProject(project_id).then(
          admins => {
            const p = new Promise(function(resolve, reject) {
              const sql = 'SELECT * FROM project WHERE id = '.concat(
                con.escape(project_id)
              )
              con.query(sql, function(err, result) {
                if (err) {
                  reject(err)
                  return
                }
                const project = new Project.Project(
                  result[0].id,
                  result[0].name,
                  result[0].description,
                  members,
                  admins,
                  result[0].userGitHub,
                  result[0].repositoryGitHub
                )
                resolve(project)
              })
            })
            p.then(projects => {
              resolve(projects)
            })
          },
          raison => {
            reject(raison)
          }
        )
      },
      raison => {
        reject(raison)
      }
    )
  })
}

/**
 * Returns a promise which gets all the projects of a member from the database
 * @param {string} username The username of the member for whom we get the projects
 * @returns new Promise, which returns a list of Projects objects
 */
function _getProjectsOfMember(username) {
  return new Promise(function(resolve, reject) {
    _getProjectsIdsOfMember(username).then(
      id_list => {
        const promise_list = []
        for (let i = 0; i < id_list.length; i++) {
          const promise = _getProjectFromProjectId(id_list[i])
          promise_list.push(promise)
        }
        Promise.all(promise_list).then(function(project_list) {
          resolve(project_list)
        })
      },
      raison => {
        reject(raison)
      }
    )
  })
}

/**
 * Returns a promise which select the ids of the tasks assingned to a member from the database
 * @param {string} username The username of the member for whom the tasks of
 * @returns new Promise, which returns a list of task ids
 */
function _getTaskIdsAssignedToMember(username) {
  return new Promise(function(resolve, reject) {
    // TODO: Vérifier si le couple user/project_id n'existe pas déjà
    const sql = 'SELECT task_id FROM assigned_task WHERE username = '.concat(
      con.escape(username)
    )
    con.query(sql, function(err, result) {
      if (err) {
        reject(err)
        return
      }
      const id_list = []
      for (let i = 0; i < result.length; i++) {
        id_list.push(result[i].task_id)
      }
      resolve(id_list)
    })
  })
}

/**
 * Returns a promise which check if the credentials entered exist in the database
 * @param {string} username The login username
 * @param {string} password The login password
 * @returns new Promise, which return true if the username and password are valid. False otherwise
 */
function _areUsernameAndPasswordCorrect(username, password) {
  return new Promise(function(resolve, reject) {
    const sql = 'SELECT * FROM member WHERE username = '.concat(
      con.escape(username)
    )
    con.query(sql, function(err, result) {
      if (err) {
        reject(err)
        return
      }
      if (result.length === 0) {
        resolve(false)
        return
      }
      const hashedPassword = result[0].password
      bcrypt.compare(password, hashedPassword, function(err, result) {
        if (err) reject(err)
        if (result === true) {
          resolve(true)
        } else {
          resolve(false)
        }
      })
    })
  })
}

/**
 * Returns a promise which checks if a username already exists in the database
 * @param {string} username The username to check
 * @returns new Promise, which returns true if the username already exists, false otherwise.
 */
function _doesUsernameExists(username) {
  return new Promise(function(resolve, reject) {
    const sql = 'SELECT username FROM member WHERE username = '.concat(
      con.escape(username)
    )
    con.query(sql, function(err, result) {
      if (err) reject(err)
      if (result.length === 0) {
        resolve(false)
      } else {
        resolve(true)
      }
    })
  })
}

/**
 * Returns a promise, which delete a member from the database
 * @param {string} username The username of the members
 * @returns new Promise, which return a string 'Member deleted' if it succeeds.
 */
function _deleteMember(username) {
  return new Promise(function(resolve, reject) {
    const sql = "DELETE FROM assigned_task WHERE username ='".concat(
      username,
      "'; ",
      "DELETE FROM project_team WHERE username ='",
      username,
      "'; ",
      "DELETE FROM member WHERE username ='",
      username,
      "';"
    )
    con.query(sql, function(err, result) {
      if (err) reject(err)
      resolve('Member deleted')
    })
  })
}

// ================ Issues ================

/**
 * Returns a promise that adds an issue in the database
 * @param {int} projectId The id of the project related to the issue
 * @param {string} name The name of the issue
 * @param {string} description The description of the issue
 * @param {string} priority The priority of the issue
 * @param {int} difficulty The difficulty of the issue
 * @returns new Promise, which returns the Id of the newly added issue
 */
function _addIssueToProject(
  projectId,
  name,
  description,
  priority,
  difficulty
) {
  return new Promise(function(resolve, reject) {
    const sql = 'INSERT INTO issue (project_id, name, description, priority, difficulty) VALUES ('.concat(
      con.escape(projectId),
      ',',
      con.escape(name),
      ',',
      con.escape(description),
      ',',
      con.escape(priority),
      ',',
      con.escape(difficulty),
      ')'
    )
    con.query(sql, function(err, result) {
      if (err) {
        reject(err)
        return
      }
      resolve(result.insertId)
    })
  })
}

/**
 * Returns a promise that modify an issue in the database
 * @param {int} issueId The id of the issue to modify
 * @param {string} name The new name of the issue
 * @param {string} description The new description of the issue
 * @param {string} priority The new priority of the issue
 * @param {int} difficulty The new difficulty of the issue
 * @returns new Promise, which returns the number of modified issue
 */
function _modifyIssue(issueId, name, description, priority, difficulty) {
  return new Promise(function(resolve, reject) {
    var sql = 'UPDATE issue SET'.concat(
      ' name = ',
      con.escape(name),
      ',',
      ' description = ',
      con.escape(description),
      ',',
      ' priority = ',
      con.escape(priority),
      ',',
      ' difficulty = ',
      con.escape(difficulty),
      ' WHERE id = ',
      con.escape(issueId),
      ';\n'
    )
    con.query(sql, function(err, result) {
      if (err) reject(err)
      resolve(result.affectedRows)
    })
  })
}

/**
 * Returns a promise that gets all the informations of all the issues of a project from the database
 * @param {int} project_id The id of the project
 * @returns new Promise, which returns a list of Issue objects
 */
function _getAllProjectIssues(project_id) {
  return new Promise(function(resolve, reject) {
    const sql = 'SELECT * FROM issue WHERE project_id = '.concat(
      con.escape(project_id)
    )
    con.query(sql, function(err, result) {
      if (err) reject(err)
      const issue_list = []
      for (let i = 0; i < result.length; i++) {
        issue_list.push(
          new Issue.Issue(
            result[i].id,
            result[i].project_id,
            result[i].name,
            result[i].description,
            result[i].priority,
            result[i].difficulty
          )
        )
      }
      resolve(issue_list)
    })
  })
}

/**
 * Returns a promise that deletes an issue and it's dependancies from the database
 * @param {int} issueId The id of the issue to delete
 * @returns new Promise, which returns a string 'Issue removed' if it succeeds
 */
function _deleteIssue(issueId) {
  return new Promise(function(resolve, reject) {
    let sql = "DELETE FROM issue_state WHERE issue_sprint_id IN (SELECT id FROM issue_of_sprint WHERE issue_id ='".concat(
      issueId,
      "'); ",
      "DELETE FROM issue_of_task WHERE issue_id = '",
      issueId,
      "'; ",
      "DELETE FROM issue_of_test WHERE issue_id = '",
      issueId,
      "'; ",
      "DELETE FROM issue_of_sprint WHERE issue_id = '",
      issueId,
      "'; ",
      "DELETE FROM issue WHERE id = '",
      issueId,
      "';"
    )
    con.query(sql, function(err, result) {
      if (err) reject(err)
      resolve('Issue removed')
    })
  })
}

/**
 * Returns a promise which returns all the informations of an issue from the database
 * @param {int} issueId The Id of the issue
 * @returns new Promise, which returns an Issue object
 */
function _getIssueById(issueId) {
  return new Promise(function(resolve, reject) {
    const sql = 'SELECT * FROM issue WHERE id = '.concat(con.escape(issueId))
    con.query(sql, function(err, result) {
      if (err) reject(err)
      const issue = new Issue.Issue(
        result[0].id,
        result[0].project_id,
        result[0].name,
        result[0].description,
        result[0].priority,
        result[0].difficulty
      )
      resolve(issue)
    })
  })
}

// ================ Tasks ================

/**
 * Returns a promise which gets all the task ids of a project from the database
 * @param {int} project_id The project id
 * @returns new Promise, which returns a list of the tasks ids
 */
function _getAllTasksIdsByProject(project_id) {
  return new Promise(function(resolve, reject) {
    const sql = 'SELECT id FROM task WHERE project_id = '.concat(
      con.escape(project_id)
    )
    con.query(sql, function(err, result) {
      if (err) reject(err)
      const id_list = []
      for (let i = 0; i < result.length; i++) {
        id_list.push(result[i].id)
      }
      resolve(id_list)
    })
  })
}

/**
 * Returns a promise which gets all the task ids of a project which are in a specific state from the database
 * @param {int} project_id The project id
 * @param {string} state The state of the tasks (To Do/Doing/Done)
 * @returns new Promise, which returns a list of the tasks ids
 */
function _getAllTasksIdsByProjectAndState(project_id, state) {
  return new Promise(function(resolve, reject) {
    const sql = 'SELECT id FROM task WHERE project_id = '.concat(
      con.escape(project_id),
      ' AND state = ',
      con.escape(state)
    )
    con.query(sql, function(err, result) {
      if (err) reject(err)
      const id_list = []
      for (let i = 0; i < result.length; i++) {
        id_list.push(result[i].id)
      }
      resolve(id_list)
    })
  })
}

/**
 * Returns a promise that gets all the informations of a task from the database
 * @param {int} task_id The Id the task
 * @returns new Promise, which returns a Task object
 */
function _getTaskById(task_id) {
  return new Promise(function(resolve, reject) {
    _getIssuesOfTask(task_id).then(
      issues => {
        _getMembersAssignedToTask(task_id).then(members => {
          _getTaskDependencies(task_id).then(dependencies => {
            const sql = 'SELECT * FROM task WHERE id = '.concat(
              con.escape(task_id)
            )
            con.query(sql, function(err, result) {
              if (err) reject(err)
              const task = new Task.Task(
                result[0].id,
                result[0].project_id,
                result[0].name,
                result[0].description,
                result[0].state,
                result[0].start_date,
                result[0].realisation_time,
                result[0].description_of_done,
                dependencies,
                members,
                issues
              )
              resolve(task)
            })
          })
        })
      },
      raison => {
        reject(raison)
      }
    )
  })
}

/**
 * Returns a promise that get all the informations regardings the tasks of a project from the database
 * @param {int} project_id The id of the project
 * @returns new Promise, which returns a list of Task objects
 */
function _getAllTasksOfProject(project_id) {
  return new Promise(function(resolve, reject) {
    _getAllTasksIdsByProject(project_id).then(
      id_list => {
        const promise_list = []
        for (let i = 0; i < id_list.length; i++) {
          const promise = _getTaskById(id_list[i])
          promise_list.push(promise)
        }
        Promise.all(promise_list).then(function(task_list) {
          resolve(task_list)
        })
      },
      raison => {
        console.log(raison)
      }
    )
  })
}

/**
 * Returns a promise that returns all informations of the tasks of a project that are in a specific state from the database
 * @param {int} project_id The id of the project
 * @param {string} state The state of the tasks (To Do/Doing/Done)
 * @returns new Promise, which returns a list of Task objects
 */
function _getAllTasksOfProjectByState(project_id, state) {
  return new Promise(function(resolve, reject) {
    _getAllTasksIdsByProjectAndState(project_id, state).then(
      id_list => {
        const promise_list = []
        for (let i = 0; i < id_list.length; i++) {
          const promise = _getTaskById(id_list[i])
          promise_list.push(promise)
        }
        Promise.all(promise_list).then(function(task_list) {
          resolve(task_list)
        })
      },
      raison => {
        console.log(raison)
      }
    )
  })
}

/**
 * Returns a promise that adds a task in the database
 * @param {int} projectId The id of the project
 * @param {string} name The name of the task
 * @param {string} description The description of the task
 * @param {string} state The state of the task
 * @param {string} date_beginning The date the task has begun
 * @param {int} realisation_time How long the task is supposed to take
 * @param {string} DoD The definition of done of the task
 * @param {int[]} dependencies Tasks that must be completed before this one
 * @param {string[]} members The list of members assigned to the task
 * @param {int[]} issues The list of issues related to this task
 * @returns new Promise, which returns the id of the new task
 */
function _addTask(
  projectId,
  name,
  description,
  state,
  date_beginning,
  realisation_time,
  DoD,
  dependencies /* list of task id */,
  members /* list username */,
  issues /* list of issue id */
) {
  return new Promise(function(resolve, reject) {
    const sql = 'INSERT INTO task (project_id, name, description, state, start_date, realisation_time, description_of_done) VALUES ('.concat(
      con.escape(projectId),
      ',',
      con.escape(name),
      ',',
      con.escape(description),
      ',',
      con.escape(state),
      ',',
      con.escape(date_beginning),
      ',',
      con.escape(realisation_time),
      ',',
      con.escape(DoD),
      ');'
    )
    con.query(sql, function(err, result) {
      if (err) throw err
      const taskId = result.insertId
      _setTaskDependencies(taskId, dependencies).then(
        _setTaskToMembers(taskId, members)
          .then(_setTaskToIssue(taskId, issues))
          .then(resolve(taskId))
      )
    })
  })
}

/**
 * Returns a promise that modify a task in the database
 * @param {int} taskId The id of the task to modify
 * @param {string} name The name of the task
 * @param {string} description The description of the task
 * @param {string} state The state of the task
 * @param {string} date_beginning The date the task has begun
 * @param {int} realisation_time How long the task is supposed to take
 * @param {string} DoD The definition of done of the task
 * @returns new Promise, which returns the number of affected rows
 */
function _modifyTask(
  taskId,
  name,
  description,
  state,
  startDate,
  realisationTime,
  DoD
) {
  return new Promise(function(resolve, reject) {
    var sql = 'UPDATE task SET'.concat(
      ' name = ',
      con.escape(name),
      ',',
      ' description = ',
      con.escape(description),
      ',',
      ' state = ',
      con.escape(state),
      ',',
      ' start_date = ',
      con.escape(startDate),
      ',',
      ' realisation_time = ',
      con.escape(realisationTime),
      ',',
      ' description_of_done = ',
      con.escape(DoD),
      ' WHERE id = ',
      con.escape(taskId),
      ';\n'
    )
    con.query(sql, function(err, result) {
      if (err) reject(err)
      resolve(result.affectedRows)
    })
  })
}

/**
 * Returns a promise which acutalize the dependencies of a task in the database (DELETE existing ones then INSERT current ones)
 * @param {int} taskId The id of the task
 * @param {int[]} dependsOnTasksIdList The list of task id that this task depends on
 * @returns new Promise, which returns 'New dependencies added' if it succeeds
 */
function _setTaskDependencies(taskId, dependsOnTasksIdList) {
  return new Promise(function(resolve, reject) {
    var sql = 'DELETE FROM task_dependencies WHERE task_id = '.concat(
      con.escape(taskId),
      ';\n'
    )
    if (dependsOnTasksIdList) {
      for (let i = 0; i < dependsOnTasksIdList.length; i++) {
        sql = sql.concat(
          'INSERT INTO task_dependencies (task_id, depend_on_task_id) VALUES (',
          con.escape(taskId),
          ',',
          con.escape(dependsOnTasksIdList[i]),
          '); \n'
        )
      }
      con.query(sql, function(err, result) {
        if (err) reject(err)
        resolve('New dependencies added')
      })
    } else {
      resolve('No dependency to add')
    }
  })
}

/**
 * Returns a promise which actualize the list of members assigned to a task in the database (DELETE existing ones then INSERT current ones)
 * @param {int} taskId The id of the task
 * @param {string} usernameList The list of members id assigned to the task
 * @returns new Promise, which returns a string describing the result
 */
function _setTaskToMembers(taskId, usernameList) {
  // TODO : check if username exists
  return new Promise(function(resolve, reject) {
    let i
    let sql = 'DELETE FROM assigned_task WHERE task_id = '.concat(
      con.escape(taskId),
      ';\n'
    )
    if (usernameList) {
      if (typeof usernameList === 'string') {
        sql = sql.concat(
          'INSERT INTO assigned_task (task_id, username) VALUES (',
          con.escape(taskId),
          ',',
          con.escape(usernameList),
          ');\n'
        )
      } else {
        for (i = 0; i < usernameList.length; i++) {
          sql = sql.concat(
            'INSERT INTO assigned_task (task_id, username) VALUES (',
            con.escape(taskId),
            ',',
            con.escape(usernameList[i]),
            ');\n'
          )
        }
      }
      con.query(sql, function(err, result) {
        if (err) reject(err)
        resolve('Task assigned to members')
      })
    } else {
      resolve('No member to assign the task')
    }
  })
}

/**
 * Returns a promise that gets the list of members assigned to a task from the database
 * @param {int} taskId The id of the task
 * @returns new Promise, which returns the list of members id
 */
function _getMembersAssignedToTask(taskId) {
  return new Promise(function(resolve, reject) {
    const sql = 'SELECT username FROM assigned_task WHERE task_id = '.concat(
      con.escape(taskId)
    )
    con.query(sql, function(err, result) {
      if (err) reject(err)
      const id_list = []
      for (let i = 0; i < result.length; i++) {
        id_list.push(result[i].username)
      }
      resolve(id_list)
    })
  })
}

/**
 * Returns a promise that gets the task dependencies from the database
 * @param {int} taskId The id of the task
 * @returns new Promise, which returns a list of Task objects
 */
function _getTaskDependencies(taskId) {
  return new Promise(function(resolve, reject) {
    const sql = 'SELECT * FROM task WHERE id IN (SELECT depend_on_task_id FROM task_dependencies WHERE task_id ='.concat(
      con.escape(taskId),
      ')'
    )
    con.query(sql, function(err, result) {
      if (err) reject(err)
      const deps = []
      for (let i = 0; i < result.length; i++) {
        deps.push(
          new Task.Task(
            result[i].id,
            result[i].project_id,
            result[i].name,
            result[i].description,
            result[i].state,
            result[i].start_date,
            result[i].realisation_time,
            result[i].description_of_done,
            [],
            [],
            []
          )
        )
      }
      resolve(deps)
    })
  })
}

/**
 * Returns a promise that get from the database a list of tasks id related to selected issues.
 * @param {int} issueIdList The list of issues id
 * @returns new Promise, which returns a list of task ids
 */
function _getTasksIdsOfIssues(issueIdList) {
  return new Promise(function(resolve, reject) {
    if (issueIdList.length === 0) {
      resolve([])
    }
    let sqlIn = '('
    for (let i = 0; i < issueIdList.length; i++) {
      if (i === issueIdList.length - 1) {
        sqlIn = sqlIn.concat(con.escape(issueIdList[i]), ')')
      } else {
        sqlIn = sqlIn.concat(con.escape(issueIdList[i]), ',')
      }
    }
    const sql = 'SELECT DISTINCT task_id FROM issue_of_task WHERE issue_id IN '.concat(
      sqlIn
    )

    con.query(sql, function(err, result) {
      if (err) {
        reject(err)
        return
      }

      let id_list = []
      for (let i = 0; i < result.length; i++) {
        id_list.push(result[i].task_id)
      }
      resolve(id_list)
    })
  })
}

/**
 * Returns a promise that get from the database all the informations abou the tasks related to a list of issues
 * @param {int} issueIdList The id list of issues
 * @returns new Promise, which returns a list of Task objects
 */
function _getTasksOfIssues(issueIdList) {
  return new Promise(function(resolve, reject) {
    _getTasksIdsOfIssues(issueIdList).then(
      id_list => {
        const promise_list = []
        for (let i = 0; i < id_list.length; i++) {
          const promise = _getTaskById(id_list[i])
          promise_list.push(promise)
        }
        Promise.all(promise_list).then(function(task_list) {
          resolve(task_list)
        })
      },
      raison => {
        console.log(raison)
      }
    )
  })
}

/**
 * Returns a promise that update the state of a task in the database
 * @param {int} taskId The id of the task
 * @param {string} state The new state of the task
 * @returns new Promise, which returns the amount of affected rows
 */
function _updateTaskState(taskId, state) {
  return new Promise(function(resolve, reject) {
    var sql = 'UPDATE task SET state = '.concat(state, ' WHERE id = ', taskId)
    con.query(sql, function(err, result) {
      if (err) reject(err)
      resolve(result.affectedRows)
    })
  })
}

/**
 * Returns a promise that delete a task from the database
 * @param {int} taskId The id of the task
 * @returns new Promise, which returns a string 'Issue removed' if it succeeds
 */
function _deleteTask(taskId) {
  return new Promise(function(resolve, reject) {
    let sql = "DELETE FROM task_dependencies WHERE task_id ='".concat(
      taskId,
      "'; ",
      "DELETE FROM issue_of_task WHERE task_id = '",
      taskId,
      "'; ",
      "DELETE FROM task_checklist WHERE task_id = '",
      taskId,
      "'; ",
      "DELETE FROM assigned_task WHERE task_id = '",
      taskId,
      "'; ",
      "DELETE FROM task WHERE id = '",
      taskId,
      "';"
    )
    con.query(sql, function(err, result) {
      if (err) reject(err)
      resolve('Issue removed')
    })
  })
}

/**
 * Returns a promise that set in the database a task to a list of issues
 * @param {int} task_id The id of the task
 * @param {int} issueId_list The list of ids of issues
 * @returns new Promise, which returns a string describing the result
 */
function _setTaskToIssue(task_id, issueId_list) {
  return new Promise(function(resolve, reject) {
    let i = 0
    var sql = 'DELETE FROM issue_of_task WHERE task_id = '.concat(
      con.escape(task_id),
      ';\n'
    )
    if (issueId_list) {
      for (i = 0; i < issueId_list.length; i++) {
        sql = sql.concat(
          'INSERT INTO issue_of_task (task_id, issue_id) VALUES (',
          con.escape(task_id),
          ',',
          con.escape(issueId_list[i]),
          ');\n'
        )
      }
      con.query(sql, function(err, result) {
        if (err) reject(err)
        resolve('Issues linked to task')
      })
    } else {
      resolve('No issues to link')
    }
  })
}

/**
 * Returns a promise that gets the list of issues linked to a specific task from the database
 * @param {int} task_id The id of the task
 * @returns new Promise, which returns the list of ids of the issues
 */
function _getIssuesIdsOfTask(task_id) {
  return new Promise(function(resolve, reject) {
    const sql = 'SELECT issue_id FROM issue_of_task WHERE task_id = '.concat(
      con.escape(task_id)
    )
    con.query(sql, function(err, result) {
      if (err) reject(err)
      const id_list = []
      for (let i = 0; i < result.length; i++) {
        id_list.push(result[i].issue_id)
      }
      resolve(id_list)
    })
  })
}

/**
 * Returns a promise that gets all the informations related to the issues linked to a task from the database
 * @param {int} task_id The id of the task
 * @returns new Promise, which returns the liste of Issues objects
 */
function _getIssuesOfTask(task_id) {
  return new Promise(function(resolve, reject) {
    _getIssuesIdsOfTask(task_id).then(
      id_list => {
        const promise_list = []
        for (let i = 0; i < id_list.length; i++) {
          const promise = _getIssueById(id_list[i])
          promise_list.push(promise)
        }
        Promise.all(promise_list).then(function(task_list) {
          resolve(task_list)
        })
      },
      raison => {
        console.log(raison)
      }
    )
  })
}

// ================ Checklist ================

/**
 * Returns a promise that add in the database a checklist for a task.
 * @param {int} taskId The id of the task
 * @param {string} description The description of the checklist
 * @param {bool} isDone The state of the checklist
 * @returns new Promise, which returns a string describing the result
 */
function _setTaskChecklist(taskId, description, isDone) {
  return new Promise(function(resolve, reject) {
    const sql = 'INSERT INTO task_checklist (task_id, description, is_done) VALUES ('.concat(
      con.escape(taskId),
      ',',
      con.escape(description),
      ',',
      con.escape(isDone),
      ');\n'
    )
    con.query(sql, function(err, result) {
      if (err) {
        reject(err)
        return
      }
      resolve('Chechlist assigned to the task')
    })
  })
}

/**
 * Returns a promise that modify the description of a checklist in the database
 * @param {int} checklistId The id of the checklist
 * @param {string} description The new description of the checklist
 * @returns new Promise, which returns 'Chechlist modified' if it succeeds
 */
function _modifyTaskDescription(checklistId, description) {
  return new Promise(function(resolve, reject) {
    var sql = 'UPDATE task_checklist SET '.concat(
      'description = ',
      con.escape(description),
      '  WHERE id = ',
      con.escape(checklistId)
    )
    con.query(sql, function(err, result) {
      if (err) {
        reject(err)
        return
      }
      resolve('Checklist modified')
    })
  })
}

/**
 * Returns a promise which modify the state of a checklist in the database
 * @param {int} checklistId The id of the checklist
 * @param {bool} isDone The new state of the checklist
 * @returns new Promise, which returns the number of affected entries
 */
function _modifyTaskState(checklistId, isDone) {
  return new Promise(function(resolve, reject) {
    var sql = 'UPDATE task_checklist SET '.concat(
      'is_done = ',
      con.escape(isDone),
      ' WHERE id = ',
      con.escape(checklistId)
    )
    con.query(sql, function(err, result) {
      if (err) reject(err)
      resolve(result.affectedRows)
    })
  })
}

/**
 * Returns a promise that get the checklists of a task in the database
 * @param {int} task_id The id of the task
 * @returns new Promise, which returns the checklists ids and descriptions
 */
function _getTaskChecklist(task_id) {
  return new Promise(function(resolve, reject) {
    const sql = 'SELECT * FROM task_checklist WHERE task_id = '.concat(
      con.escape(task_id)
    )
    con.query(sql, function(err, result) {
      if (err) reject(err)
      const id_list = []
      for (let i = 0; i < result.length; i++) {
        id_list.push([result[i].description, result[i].is_done])
      }
      resolve(id_list)
    })
  })
}

/**
 * Returns a promise that get from the database an item of a checklist
 * @param {int} itemId The id of the item
 * @returns new Promise, which returns the informations of the intems (ids, descriptions, state)
 */
function _getChecklistItemById(itemId) {
  return new Promise(function(resolve, reject) {
    const sql = 'SELECT * FROM task_checklist WHERE id = '.concat(
      con.escape(itemId)
    )
    con.query(sql, function(err, result) {
      if (err) reject(err)
      const id_list = []
      for (let i = 0; i < result.length; i++) {
        id_list.push([result[i].id, result[i].description, result[i].is_done])
      }
      resolve(id_list)
    })
  })
}

// ================ Tests ================

/**
 * Returns a promise that add a test in the database
 * @param {int} projectId The id of the project related to the test
 * @param {string} name The name of the test
 * @param {string} description The description of the test
 * @param {string} expected_result The expected result of the test
 * @param {string} last_version_validated The last version the test passed
 * @param {string} state The current state of the test
 * @returns new Promise, which returns the id of the newly added test
 */
function _addTest(
  projectId,
  name,
  description,
  expected_result,
  last_version_validated,
  state
) {
  return new Promise(function(resolve, reject) {
    const sql = 'INSERT INTO test (project_id, name, description, expected_result, last_version_validated, state) VALUES ('.concat(
      '',
      con.escape(projectId),
      ',',
      con.escape(name),
      ',',
      con.escape(description),
      ',',
      con.escape(expected_result),
      ',',
      con.escape(last_version_validated),
      ',',
      con.escape(state),
      '',
      ')'
    )
    con.query(sql, function(err, result) {
      if (err) {
        console.log('New test added')
        reject(err)
        return
      }
      resolve(result.insertId)
    })
  })
}

/**
 * Returns a promise that get from the database the informations regarding a test
 * @param {int} test_id The id of the test
 * @returns new Promise, which returns a Test obejct
 */
function _getTestById(test_id) {
  return new Promise(function(resolve, reject) {
    _getIssuesOfTest(test_id).then(
      issues => {
        const sql = 'SELECT * FROM test WHERE id = '.concat(con.escape(test_id))
        con.query(sql, function(err, result) {
          if (err) reject(err)
          const test = new Test.Test(
            result[0].id,
            result[0].project_id,
            result[0].name,
            result[0].description,
            result[0].expected_result,
            result[0].last_version_validated,
            result[0].state,
            issues
          )
          resolve(test)
        })
      },
      raison => {
        reject(raison)
      }
    )
  })
}

/**
 * Returns a promise that links a test to a list of issues in the database
 * @param {int} test_id The id of the test
 * @param {int} issueId_list The list of issue ids
 * @returns new Promise, which returns a string describing the result
 */
function _setIssuesToTest(test_id, issueId_list) {
  return new Promise(function(resolve, reject) {
    let i = 0
    var sql = 'DELETE FROM issue_of_test WHERE test_id = '.concat(
      con.escape(test_id),
      ';\n'
    )
    for (i = 0; i < issueId_list.length; i++) {
      sql = sql.concat(
        'INSERT INTO issue_of_test (test_id, issue_id) VALUES (',
        con.escape(test_id),
        ',',
        con.escape(issueId_list[i]),
        ');\n'
      )
    }
    con.query(sql, function(err, result) {
      if (err) reject(err)
      resolve('Issues linked to test')
    })
  })
}

/**
 * Returns a promise that gets the list of issues linked to a test in the database
 * @param {int} test_id The id of the test
 * @returns new Promise, which returns a list of issue ids
 */
function _getIssuesIdsOfTest(test_id) {
  return new Promise(function(resolve, reject) {
    const sql = 'SELECT issue_id FROM issue_of_test WHERE test_id = '.concat(
      con.escape(test_id)
    )
    con.query(sql, function(err, result) {
      if (err) reject(err)
      const id_list = []
      for (let i = 0; i < result.length; i++) {
        id_list.push(result[i].issue_id)
      }
      resolve(id_list)
    })
  })
}

/**
 * Returns a promise that get from the database all the informations related to the issues linked to a specific test
 * @param {int} test_id The id of the test
 * @returns new Promise, which returns a list of Issue objects
 */
function _getIssuesOfTest(test_id) {
  return new Promise(function(resolve, reject) {
    _getIssuesIdsOfTest(test_id).then(
      id_list => {
        const promise_list = []
        for (let i = 0; i < id_list.length; i++) {
          const promise = _getIssueById(id_list[i])
          promise_list.push(promise)
        }
        Promise.all(promise_list).then(function(test_list) {
          resolve(test_list)
        })
      },
      raison => {
        reject(raison)
      }
    )
  })
}

/**
 * Returns a promise that delete a test from the database
 * @param {int} test_id The id of the test
 * @returns new Promise, which returns a string 'Test removed' if it succeeds
 */
function _deleteTest(test_id) {
  return new Promise(function(resolve, reject) {
    const sql = "DELETE FROM issue_of_test WHERE test_id ='".concat(
      test_id,
      "'; ",
      "DELETE FROM test WHERE id ='",
      test_id,
      "';"
    )
    con.query(sql, function(err, result) {
      if (err) reject(err)
      resolve('Test removed')
    })
  })
}

/**
 * Returns a promise which modify the informations related to a specific test in the database
 * @param {int} testId The id of the test
 * @param {string} name The new name of the test
 * @param {string} description The new description of the test
 * @param {string} expected_result The new expected result of the test
 * @param {string} last_version_validated The new last version this test was validated
 * @param {string} state The new state of the test
 * @returns new Promise, which returns the number of affected rows
 */
function _modifyTest(
  testId,
  name,
  description,
  expected_result,
  last_version_validated,
  state
) {
  return new Promise(function(resolve, reject) {
    var sql = 'UPDATE test SET'.concat(
      ' name = ',
      con.escape(name),
      ',',
      ' description = ',
      con.escape(description),
      ',',
      ' expected_result = ',
      con.escape(expected_result),
      ',',
      ' last_version_validated = ',
      con.escape(last_version_validated),
      ',',
      ' state = ',
      con.escape(state),
      ' WHERE id = ',
      con.escape(testId),
      ';\n'
    )
    con.query(sql, function(err, result) {
      console.log('Test updated')
      if (err) {
        reject(err)
        return
      }
      resolve(result.affectedRows)
    })
  })
}

/**
 * Returns a promise that gets every test id related to a project from the database
 * @param {int} project_id The id of the project
 * @returns new Promise, which returns the list of test ids
 */
function _getAllTestsIdsFromProject(project_id) {
  return new Promise(function(resolve, reject) {
    const sql = 'SELECT id FROM test WHERE project_id = '.concat(
      con.escape(project_id)
    )
    con.query(sql, function(err, result) {
      if (err) reject(err)
      const id_list = []
      for (let i = 0; i < result.length; i++) {
        id_list.push(result[i].id)
      }
      resolve(id_list)
    })
  })
}

/**
 * Returns a promise that get all informations related to the tests of a project from the database
 * @param {int} project_id The id of the project
 * @returns new Promise, which returns a list of Test objects
 */
function _getAllTestsFromProject(project_id) {
  return new Promise(function(resolve, reject) {
    _getAllTestsIdsFromProject(project_id).then(
      id_list => {
        const promise_list = []
        for (let i = 0; i < id_list.length; i++) {
          const promise = _getTestById(id_list[i])
          promise_list.push(promise)
        }
        Promise.all(promise_list).then(function(test_list) {
          resolve(test_list)
        })
      },
      raison => {
        reject(raison)
      }
    )
  })
}

/**
 * Returns a promise that update the state of a test in the database
 * @param {int} testId The id of the test
 * @param {string} state The new state of the test
 * @returns new Promise, which returns the number of affected rows
 */
function _updateTestState(testId, state) {
  return new Promise(function(resolve, reject) {
    var sql = 'UPDATE test SET state = '.concat(
      con.escape(state),
      ' WHERE id = ',
      con.escape(testId)
    )
    con.query(sql, function(err, result) {
      if (err) reject(err)
      resolve(result.affectedRows)
    })
  })
}

// ================ Sprints ================

/*
_addSprint(3, 'Un objectif fort en couleur 2 !', '2019-06-10', '2019-06-20', [
  125,
  122
])
_getAllSprintFromProject(3).then(
  valeur => {
    console.log(valeur)
  },
  raison => {
    console.log(raison)
  }
)
*/

/**
 * Returns a promise that add a sprint into the database
 * @param {int} project_id The id of the project related to the sprint
 * @param {string} objective The objective of the sprint
 * @param {string} date_begin The date the sprint begins
 * @param {string} date_end The date the sprint ends
 * @param {int[]} issue_list The list of issues of the sprint
 * @param {int} release_id The id of the release of the sprint
 * @returns new Promise, which returns the id of the newly added sprint
 */
function _addSprint(
  project_id,
  objective,
  date_begin,
  date_end,
  issue_list,
  release_id
) {
  return new Promise(function(resolve, reject) {
    const sql = 'INSERT INTO sprint (project_id, objective, date_begin, date_end, release_id) VALUES ('.concat(
      con.escape(project_id),
      ',',
      con.escape(objective),
      ',',
      con.escape(date_begin),
      ',',
      con.escape(date_end),
      ',',
      con.escape(release_id),
      ')'
    )
    con.query(sql, function(err, result) {
      if (err) {
        reject(err)
        return
      }
      _setIssuesToSprint(result.insertId, issue_list).then(value => {
        resolve(result.insertId)
      })
    })
  })
}

/**
 * Returns a promise that update a sprint informations in the database
 * @param {int} sprint_id The id of the sprint
 * @param {string} objective The new objective of the sprint
 * @param {string} date_begin The new date the sprint will begin
 * @param {string} date_end The new date the sprint will end
 * @param {int[]} issue_list The new list of issue linked
 * @returns new Promise, which returns the number of affected rows
 */
function _updateSprint(sprint_id, objective, date_begin, date_end, issue_list) {
  return new Promise(function(resolve, reject) {
    var sql = 'UPDATE sprint SET'.concat(
      ' objective = ',
      con.escape(objective),
      ',',
      ' date_begin = ',
      con.escape(date_begin),
      ',',
      ' date_end = ',
      con.escape(date_end),
      ' WHERE id = ',
      con.escape(sprint_id),
      ';\n'
    )
    con.query(sql, function(err, result) {
      if (err) {
        reject(err)
        return
      }
      _setIssuesToSprint(sprint_id, issue_list).then(value =>
        resolve(result.affectedRows)
      )
    })
  })
}

/**
 * Returns a promise that update the release of a sprint in the database
 * @param {int} sprint_id The id of the sprint
 * @param {int} release_id The id of the release
 * @returns new Promise, which returns the number of affected rows
 */
function _updateSprintRelease(sprint_id, release_id) {
  return new Promise(function(resolve, reject) {
    var sql = 'UPDATE sprint SET'.concat(
      ' release_id = ',
      con.escape(release_id),
      ' WHERE id = ',
      con.escape(sprint_id),
      ';\n'
    )
    con.query(sql, function(err, result) {
      if (err) {
        reject(err)
        return
      }
      resolve(result.affectedRows)
    })
  })
}

/**
 * Returns a promise that actualise a list of issues to a sprint in the database (DELETE existing ones then INSERT current ones)
 * @param {int} sprint_id The id of a sprint
 * @param {int} issueId_list The list of issue ids
 * @returns new Promise, which returns a string 'Issues linked to sprint' if it succeeds
 */
function _setIssuesToSprint(sprint_id, issueId_list) {
  return new Promise(function(resolve, reject) {
    let i = 0
    var sql = 'DELETE FROM issue_of_sprint WHERE sprint_id = '.concat(
      con.escape(sprint_id),
      ';\n'
    )
    for (i = 0; i < issueId_list.length; i++) {
      sql = sql.concat(
        'INSERT INTO issue_of_sprint (sprint_id, issue_id) VALUES (',
        con.escape(sprint_id),
        ',',
        con.escape(issueId_list[i]),
        ');\n'
      )
    }

    con.query(sql, function(err, result) {
      if (err) reject(err)
      resolve('Issues linked to sprint')
    })
  })
}

/**
 * Returns a promise that delete a sprint from the database
 * @param {int} id The id of the sprint
 * @returns new Promise, which returns 'Project Deleted' if it succeeds
 */
function _deleteSprint(id) {
  return new Promise(function(resolve, reject) {
    const sql = "DELETE FROM issue_of_sprint WHERE sprint_id='".concat(
      id,
      "';",
      "DELETE FROM sprint WHERE id ='",
      id,
      "';"
    )
    con.query(sql, function(err, result) {
      if (err) resolve(err)
      resolve('Project Deleted')
    })
  })
}

/**
 * Returns a promise that gets all the informations regarding the sprints of a specific project in the database
 * @param {int} project_id The id of the project
 * @returns new Promise, which returns a list of Sprint objects
 */
function _getAllSprintFromProject(project_id) {
  return new Promise(function(resolve, reject) {
    _getAllSprintIdsOfProject(project_id).then(
      id_list => {
        const promise_list = []
        for (let i = 0; i < id_list.length; i++) {
          const promise = _getSprintById(id_list[i])
          promise_list.push(promise)
        }
        Promise.all(promise_list).then(function(sprint_list) {
          resolve(sprint_list)
        })
      },
      raison => {
        console.log(raison)
      }
    )
  })
}

/**
 * Returns a promise that get every sprint if related to a project from the database
 * @param {int} project_id The id of the project
 * @returns new Promise, which returns a list of sprint ids
 */
function _getAllSprintIdsOfProject(project_id) {
  return new Promise(function(resolve, reject) {
    const sql = 'SELECT id FROM sprint WHERE project_id = '.concat(
      con.escape(project_id),
      ' ORDER BY date_begin'
    )
    con.query(sql, function(err, result) {
      if (err) {
        reject(err)
        return
      }
      const id_list = []
      for (let i = 0; i < result.length; i++) {
        id_list.push(result[i].id)
      }
      resolve(id_list)
    })
  })
}

/**
 * Returns a promise that get all the information of a specific sprint from the database
 * @param {int} sprint_id The id of the sprint
 * @returns new Promise, which returns the id of a sprint
 */
function _getSprintById(sprint_id) {
  return new Promise(function(resolve, reject) {
    const sql = 'SELECT * FROM sprint WHERE id = '.concat(con.escape(sprint_id))
    con.query(sql, function(err, result) {
      if (err) {
        reject(err)
        return
      }
      _getIssuesOfSprint(sprint_id).then(issue_list => {
        let sprint
        if (result[0].release_id === undefined) {
          sprint = new Sprint.Sprint(
            result[0].id,
            result[0].project_id,
            result[0].objective,
            result[0].date_begin,
            result[0].date_end,
            issue_list,
            -1
          )
        } else {
          sprint = new Sprint.Sprint(
            result[0].id,
            result[0].project_id,
            result[0].objective,
            result[0].date_begin,
            result[0].date_end,
            issue_list,
            result[0].release_id
          )
        }
        let issueIdList = []
        issue_list.forEach(issue => {
          issueIdList.push(issue.id)
        })
        _getTasksOfIssues(issueIdList).then(tasks => {
          tasks.forEach(task => {
            if (task.state === 'To Do') {
              sprint.addTaskToDo(task)
            } else if (task.state === 'Doing') {
              sprint.addTaskDoing(task)
            } else {
              sprint.addTaskDone(task)
            }
          })
          resolve(sprint)
        })
      })
    })
  })
}

/**
 * Returns a promise that get from the database every ids related to the issues of a specific sprint
 * @param {int} sprint_id The id of the sprint
 * @returns new Promise, which returns a list of issue ids
 */
function _getIssuesIdsOfSprint(sprint_id) {
  return new Promise(function(resolve, reject) {
    const sql = 'SELECT issue_id FROM issue_of_sprint WHERE sprint_id = '.concat(
      con.escape(sprint_id)
    )
    con.query(sql, function(err, result) {
      if (err) reject(err)
      const id_list = []
      for (let i = 0; i < result.length; i++) {
        id_list.push(result[i].issue_id)
      }
      resolve(id_list)
    })
  })
}

/**
 * Returns a promise that get from the database every informations related to the issues of a specific sprint
 * @param {int} sprint_id The id of the sprint
 * @returns new Promise, which returns a list of Issue objects
 */
function _getIssuesOfSprint(sprint_id) {
  return new Promise(function(resolve, reject) {
    _getIssuesIdsOfSprint(sprint_id).then(
      id_list => {
        const promise_list = []
        for (let i = 0; i < id_list.length; i++) {
          const promise = _getIssueById(id_list[i])
          promise_list.push(promise)
        }
        Promise.all(promise_list).then(function(task_list) {
          resolve(task_list)
        })
      },
      raison => {
        console.log(raison)
      }
    )
  })
}

/**
 * Returns a promise that get from the database the release id of a sprint
 * @param {int} sprint_id The id of the sprint
 * @returns new Promise, which returns a list of release ids
 */
function _getReleaseIdOfSprint(sprint_id) {
  return new Promise(function(resolve, reject) {
    const sql = 'SELECT release_id FROM issue_of_sprint WHERE sprint_id = '.concat(
      con.escape(sprint_id)
    )
    con.query(sql, function(err, result) {
      if (err) reject(err)
      const id_list = []
      for (let i = 0; i < result.length; i++) {
        id_list.push(result[i].release_id)
      }
      resolve(id_list)
    })
  })
}

// ================ Documentation ================

/**
 * Returns a promise that insert a new documentation to a release in the database
 * @param {int} release_id The id of the release
 * @param {string} url The link to the documentation
 * @returns new Promise, which returns the id of the newly added documentation
 */
function _addDocToRelease(release_id, url) {
  return new Promise(function(resolve, reject) {
    const sql = 'INSERT INTO documentation_of_release (url, release_id) VALUES ('.concat(
      con.escape(url),
      ',',
      con.escape(release_id),
      ')'
    )
    con.query(sql, function(err, result) {
      if (err) {
        reject(err)
        return
      }
      resolve(result.insertId)
    })
  })
}

/**
 * Returns a promise that update the documentation to a release in the database
 * @param {int} release_id The id of the release
 * @param {string} url The new link to the documentation
 * @returns new Promise, which return the number of affected rows
 */
function _updateDoc(release_id, url) {
  return new Promise(function(resolve, reject) {
    let sql = 'UPDATE documentation_of_release SET'.concat(
      ' url = ',
      con.escape(url),
      ' WHERE release_id = ',
      con.escape(release_id),
      ';\n'
    )
    con.query(sql, function(err, result) {
      console.log('Doc updated')
      if (err) {
        reject(err)
        return
      }
      resolve(result.affectedRows)
    })
  })
}

/**
 * Returns a promise that get the documentation informations of a release in the database
 * @param {int} release_id The id of a release
 * @result new Promise, which returns a new Doc object
 */
function _getDocFromReleaseId(release_id) {
  return new Promise(function(resolve, reject) {
    const sql = 'SELECT * FROM documentation_of_release WHERE release_id = '.concat(
      con.escape(release_id)
    )
    con.query(sql, function(err, result) {
      if (err) reject(err)
      if (result.length !== 0) {
        const doc = new Doc.Doc(
          result[0].id,
          result[0].url,
          result[0].release_id
        )
        resolve(doc)
      } else {
        const doc = new Doc.Doc('', '', release_id)
        resolve(doc)
      }
    })
  })
}

/**
 * Returns a promise that get the documentation for a list of release from the database
 * @param {int[]} list_releases The list of releases ids
 * @returns new Promise, which return a list of Doc objects
 */
function _getDocsFromReleases(list_releases) {
  return new Promise(function(resolve, reject) {
    const promise_list = []
    for (let i = 0; i < list_releases.length; i++) {
      const promise = _getDocFromReleaseId(list_releases[i].id)
      promise_list.push(promise)
    }
    Promise.all(promise_list).then(function(test_list) {
      resolve(test_list)
    }),
      raison => {
        reject(raison)
      }
  })
}

/**
 * Returns a promise that remove a documentation related to a release from the database
 * @param {int} release_id The id of the release
 * @returns new Promise, which returns a string 'Doc Deleted' if it succeeds
 */
function _deleteDoc(release_id) {
  return new Promise(function(resolve, reject) {
    const sql = 'DELETE FROM documentation_of_release WHERE release_id = '.concat(
      con.escape(release_id)
    )
    con.query(sql, function(err, result) {
      if (err) resolve(err)
      resolve('Doc Deleted')
    })
  })
}

// ================ Overview ================

/**
 * Returns a promise that gets from the database the amount of tasks related to every issue
 * @param {int} projectId The id of a project
 * @returns new Project, which returns the result of the query
 */
function _getCountIssuesProject(projectId) {
  return new Promise(function(resolve, reject) {
    let sql = "SELECT count(*) as total FROM issue WHERE issue.project_id ='".concat(
      projectId,
      "';"
    )
    con.query(sql, function(err, result) {
      if (err) reject(err)
      resolve(result)
    })
  })
}

/**
 * Returns a promise that gets from the database the amount of issues related to the last sprint
 * @param {int} projectId The id of the project
 * @returns new Promise, which return the result of the query
 */
function _getCountIssuesLastSprint(projectId) {
  return new Promise(function(resolve, reject) {
    let sql = "SELECT count(*) as total FROM issue, issue_of_sprint  WHERE issue.project_id ='".concat(
      projectId,
      "' AND issue.id = issue_of_sprint.issue_id AND issue_of_sprint.sprint_id IN (SELECT id FROM sprint WHERE project_id ='",
      projectId,
      "' AND date_end IN (SELECT max(date_end) FROM sprint WHERE project_id = '",
      projectId,
      "'))"
    )
    con.query(sql, function(err, result) {
      if (err) reject(err)
      resolve(result)
    })
  })
}

/**
 * Return a promise that get from the database the amount of task of an issue by each state
 * @param {int} issueId The id of the issue
 * @returns new Promise, which returns the result of the query (issueId, total, totalToDo, totalDoing, totalDone)
 */
function _getCountTasksStatesFromIssues(issueId) {
  return new Promise(function(resolve, reject) {
    let sql = "SELECT issue_of_task.issue_id, count(*) AS total, sum(case when state = 'To Do' then 1 else 0 end) AS totalToDo, sum(case when state = 'Doing' then 1 else 0 end) AS totalDoing, sum(case when state = 'Done' then 1 else 0 end) AS totalDone FROM task, issue_of_task WHERE task.id = issue_of_task.task_id AND issue_of_task.issue_id = '".concat(
      issueId,
      "' GROUP BY issue_of_task.issue_id"
    )
    con.query(sql, function(err, result) {
      if (err) reject(err)
      resolve(result)
    })
  })
}

/**
 * Returns a promise which returns the id of the current sprint of a project
 * @param {int} projectId The id of a project
 * @returns new Promise, which returns the result of the query
 */
function _getCurrentSprint(projectId) {
  return new Promise(function(resolve, reject) {
    let sql = "SELECT id FROM sprint WHERE project_id = '".concat(
      projectId,
      "' AND id IN (SELECT id FROM sprint WHERE CURDATE() <= date_end AND project_id = '",
      projectId,
      "') AND id IN (SELECT id FROM sprint WHERE CURDATE() >= date_begin AND project_id = '",
      projectId,
      "')"
    )
    con.query(sql, function(err, result) {
      if (err) reject(err)
      resolve(result)
    })
  })
}

/**
 * Returns a promise that get from the database the amount of tasks in an sprint and the amount of task in each state for a sprint
 * @param {int} sprintId The id of the sprint
 * @returns new Promise, which returns the result of the query (sprintId, total, totalToDo, totalDoing, totalDone)
 */
function _getCountTasksStatesFromSprint(sprintId) {
  return new Promise(function(resolve, reject) {
    let sql = 'SELECT issue_of_sprint.sprint_id, count(DISTINCT task.id) AS total, '.concat(
      "sum(DISTINCT case when state = 'To Do' then 1 else 0 end) AS totalToDo, ",
      "sum(DISTINCT case when state = 'Doing' then 1 else 0 end) AS totalDoing, ",
      "sum(DISTINCT case when state = 'Done' then 1 else 0 end) AS totalDone ",
      'FROM task, issue_of_task, issue_of_sprint ',
      'WHERE task.id = issue_of_task.task_id ',
      'AND issue_of_task.issue_id = issue_of_sprint.issue_id ',
      "AND issue_of_sprint.sprint_id = '",
      sprintId,
      "' GROUP BY issue_of_sprint.sprint_id"
    )
    con.query(sql, function(err, result) {
      if (err) reject(err)
      resolve(result)
    })
  })
}

module.exports = {
  _changeDatabaseRouteForTests,
  _getProjectsIdsOfMember,
  _getProjectFromProjectId,
  _getProjectsOfMember,
  _getTaskIdsAssignedToMember,
  _areUsernameAndPasswordCorrect,
  _createProject,
  _modifyProject,
  _deleteProject,
  _inviteMembersToProject,
  _deleteMembersFromProject,
  _getMembersOfProject,
  _getAdminsOfProject,
  _storeMember,
  _deleteMember,
  _doesUsernameExists,
  _addIssueToProject,
  _modifyIssue,
  _getAllProjectIssues,
  _deleteIssue,
  _getIssueById,
  _getAllTasksIdsByProject,
  _getAllTasksIdsByProjectAndState,
  _getTaskById,
  _getAllTasksOfProject,
  _getAllTasksOfProjectByState,
  _addTask,
  _modifyTask,
  _setTaskDependencies,
  _setTaskToMembers,
  _getMembersAssignedToTask,
  _getTaskDependencies,
  _updateTaskState,
  _deleteTask,
  _setTaskChecklist,
  _modifyTaskDescription,
  _modifyTaskState,
  _getTaskChecklist,
  _getChecklistItemById,
  _getIssuesOfTask,
  _setTaskToIssue,
  _addTest,
  _setIssuesToTest,
  _deleteTest,
  _modifyTest,
  _getTestById,
  _getIssuesIdsOfTest,
  _getIssuesOfTest,
  _getAllTestsFromProject,
  _updateTestState,
  _addSprint,
  _getAllSprintFromProject,
  _deleteSprint,
  _updateSprint,
  _updateSprintRelease,
  _getSprintById,
  _getIssuesIdsOfSprint,
  _getReleaseIdOfSprint,
  _addDocToRelease,
  _updateDoc,
  _getDocFromReleaseId,
  _deleteDoc,
  _getDocsFromReleases,
  _getCountIssuesProject,
  _getCountIssuesLastSprint,
  _getCountTasksStatesFromIssues,
  _getCurrentSprint,
  _getCountTasksStatesFromSprint
}

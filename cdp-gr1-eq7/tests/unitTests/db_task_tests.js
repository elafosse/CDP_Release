const db = require('../../backend/db_connection')

var assert = require('chai').assert
var should = require('chai').should()
var expect = require('chai').expect

let newProjectId = -1
let taskId1 = -1
let taskId2 = -1
let issueId = -1

let username = 'New Username Test'
let password = 'hello'

describe('Database Task Tests', function() {
  before(function() {
    return db
      ._createProject('Name', 'Description', 'gitHubLogin', 'gitHubRepo')
      .then(result => {
        newProjectId = result
        return db
          ._addIssueToProject(
            newProjectId,
            'Issue Test',
            'A test description',
            'HIGH',
            15
          )
          .then(() => {
            return db
              ._addIssueToProject(
                newProjectId,
                'Name',
                'Description !:;,n',
                'HIGH',
                15
              )
              .then(issue_id => {
                issueId = issue_id
                return db._storeMember(username, password)
              })
          })
      })
  })

  after(function() {
    return db._deleteProject(newProjectId).then(() => {
      return db._deleteMember(username)
    })
  })

  it('Create new empty task', function() {
    return db
      ._addTask(
        newProjectId,
        'Nom',
        'Task Description',
        'To Do',
        '2019-05-10',
        10,
        'Big dod',
        [],
        [],
        []
      )
      .then(taskId => {
        taskId1 = taskId
        expect(taskId).to.be.a('number')
      })
  })

  it('Create new task with dependency, member assigned and an issue', function() {
    return db
      ._addTask(
        newProjectId,
        'Nom 2',
        'Task Description 2',
        'Doing',
        '2019-06-10',
        5,
        'Big dod',
        [taskId1],
        [username],
        [issueId]
      )
      .then(taskId => {
        taskId2 = taskId
        expect(taskId).to.be.a('number')
      })
  })

  it('Get tasks of project', function() {
    return db._getAllTasksOfProject(newProjectId).then(tasks => {
      assert.equal(tasks[0].name, 'Nom')
      assert.equal(tasks[0].description, 'Task Description')
      assert.equal(tasks[0].state, 'To Do')
      assert.equal(tasks[0].start_date.getDate(), 10)
      assert.equal(tasks[0].start_date.getMonth(), 05 - 1)
      assert.equal(tasks[0].start_date.getYear(), 119)
      assert.equal(tasks[0].realisation_time, 10)
      assert.equal(tasks[0].dod, 'Big dod')
      expect(tasks[0].members).to.be.empty
      expect(tasks[0].dependancies).to.be.empty
      expect(tasks[0].issues).to.be.empty

      assert.equal(tasks[1].name, 'Nom 2')
      assert.equal(tasks[1].description, 'Task Description 2')
      assert.equal(tasks[1].state, 'Doing')
      assert.equal(tasks[1].start_date.getDate(), 10)
      assert.equal(tasks[1].start_date.getMonth(), 06 - 1)
      assert.equal(tasks[1].start_date.getYear(), 119)
      assert.equal(tasks[1].realisation_time, 5)
      assert.equal(tasks[1].dod, 'Big dod')
      expect(tasks[1].members.length).to.equal(1)
      expect(tasks[1].dependancies.length).to.equal(1)
      expect(tasks[1].issues.length).to.equal(1)
    })
  })

  it('Modify task', function() {
    return db
      ._modifyTask(
        taskId1,
        'Name Modified',
        'Description',
        'Done',
        '2019-06-10',
        50,
        'Big dod modified'
      )
      .then(() => {
        return db._setTaskDependencies(taskId1, [taskId2]).then(() => {
          return db._setTaskToMembers(taskId1, username).then(() => {
            return db._getTaskById(taskId1).then(task => {
              assert.equal(task.name, 'Name Modified')
              assert.equal(task.description, 'Description')
              assert.equal(task.state, 'Done')
              assert.equal(task.start_date.getDate(), 10)
              assert.equal(task.start_date.getMonth(), 06 - 1)
              assert.equal(task.start_date.getYear(), 119)
              assert.equal(task.realisation_time, 50)
              assert.equal(task.dod, 'Big dod modified')
              expect(task.members.length).to.equal(1)
              expect(task.dependancies.length).to.equal(1)
              expect(task.issues.length).to.equal(0)
            })
          })
        })
      })
  })

  it('Remove task', function() {
    return db._deleteTask(taskId1).then(result => {
      return db._deleteTask(taskId2).then(result => {
        return db._getAllTasksOfProject(newProjectId).then(tasks => {
          assert.equal(tasks.length, 0)
        })
      })
    })
  })
})

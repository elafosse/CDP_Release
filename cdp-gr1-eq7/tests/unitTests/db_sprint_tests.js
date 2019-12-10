const db = require('../../backend/db_connection')

var assert = require('chai').assert
var should = require('chai').should()
var expect = require('chai').expect

let newProjectId = -1
let issue1 = -1
let issue2 = -1
let sprint1 = -1
let sprint2 = -1
let sprint3 = -1

describe('Database Sprint Tests', function() {
  before(function() {
    return db
      ._createProject('Name', 'Description', 'gitHubLogin', 'gitHubRepo')
      .then(result => {
        newProjectId = result
        return db
          ._addIssueToProject(
            newProjectId,
            'Name',
            'Description !:;,n',
            'HIGH',
            15
          )
          .then(id => {
            issue1 = id
            return db
              ._addIssueToProject(
                newProjectId,
                'Name',
                'Description !:;,n',
                'HIGH',
                15
              )
              .then(id => {
                issue2 = id
              })
          })
      })
  })

  after(function() {
    return db._deleteProject(newProjectId)
  })

  it('Create new sprint with 0 issue', function() {
    return db
      ._addSprint(newProjectId, 'Objective', '2019-11-22', '2019-11-28', [], -1)
      .then(result => {
        sprint1 = result
        expect(result).to.be.a('number')
      })
  })

  it('Create new sprint with 1 issue', function() {
    return db
      ._addSprint(
        newProjectId,
        "Objective ;:,'' !",
        '2019-11-22',
        '2019-11-28',
        [issue1],
        -1
      )
      .then(result => {
        sprint2 = result
        expect(result).to.be.a('number')
      })
  })

  it('Create new sprint with 2 issue', function() {
    return db
      ._addSprint(
        newProjectId,
        'Objective',
        '2019-11-22',
        '2019-11-28',
        [issue1, issue2],
        -1
      )
      .then(result => {
        sprint3 = result
        expect(result).to.be.a('number')
      })
  })

  it('Get sprints of a project', function() {
    return db._getAllSprintFromProject(newProjectId).then(sprints => {
      assert.equal(sprints[0].objective, 'Objective')
      assert.equal(sprints[0].date_begin.getDate(), 22)
      assert.equal(sprints[0].date_begin.getMonth(), 11 - 1)
      assert.equal(sprints[0].date_begin.getYear(), 119)
      assert.equal(sprints[0].release, -1)
      expect(sprints[0].listIssues).to.be.empty

      assert.equal(sprints[1].objective, "Objective ;:,'' !")
      assert.equal(sprints[1].date_begin.getDate(), 22)
      assert.equal(sprints[1].date_begin.getMonth(), 11 - 1)
      assert.equal(sprints[1].date_begin.getYear(), 119)
      assert.equal(sprints[1].release, -1)
      expect(sprints[1].listIssues.length).to.equal(1)

      assert.equal(sprints[2].objective, 'Objective')
      assert.equal(sprints[2].date_begin.getDate(), 22)
      assert.equal(sprints[2].date_begin.getMonth(), 11 - 1)
      assert.equal(sprints[2].date_begin.getYear(), 119)
      assert.equal(sprints[2].release, -1)
      expect(sprints[2].listIssues.length).to.equal(2)
    })
  })

  it('Modify sprint', function() {
    return db
      ._updateSprint(
        sprint1,
        'Objective Modified',
        '2020-01-22',
        '2020-11-28',
        [issue1]
      )
      .then(() => {
        return db._updateSprintRelease(sprint1, 2).then(() => {
          return db._getSprintById(sprint1).then(sprint => {
            assert.equal(sprint.objective, 'Objective Modified')
            assert.equal(sprint.date_begin.getDate(), 22)
            assert.equal(sprint.date_begin.getMonth(), 0)
            assert.equal(sprint.date_begin.getYear(), 120)
            assert.equal(sprint.release, 2)
            expect(sprint.listIssues.length).to.equal(1)
          })
        })
      })
  })

  it('Delete sprints from a project', function() {
    return db._deleteSprint(sprint1).then(() => {
      return db._deleteSprint(sprint2).then(() => {
        return db._deleteSprint(sprint3).then(() => {
          return db._getAllSprintFromProject(newProjectId).then(sprints => {
            expect(sprints).to.be.empty
          })
        })
      })
    })
  })
})

const db = require('../../backend/db_connection')

var assert = require('chai').assert
var should = require('chai').should()
var expect = require('chai').expect

let newProjectId = -1
let issue1 = -1
let issue2 = -1

describe('Database Issues Tests', function() {
  db._changeDatabaseRouteForTests();
  before(function() {
    return db
      ._createProject('Name', 'Description', 'gitHubLogin', 'gitHubRepo')
      .then(result => {
        newProjectId = result
      })
  })

  after(function() {
    return db._deleteProject(newProjectId)
  })

  it('Create new issue', function() {
    return db
      ._addIssueToProject(newProjectId, 'Name', 'Description !:;,n', 'HIGH', 15)
      .then(result => {
        issue1 = result
        expect(result).to.be.a('number')
        return db
          ._addIssueToProject(
            newProjectId,
            'Name 2',
            'Description2 !:;,n',
            'LOW',
            35
          )
          .then(result => {
            issue2 = result
            expect(result).to.be.a('number')
          })
      })
  })

  it('Get issues of project', function() {
    return db._getAllProjectIssues(newProjectId).then(issues => {
      assert.equal(issues[0].name, 'Name')
      assert.equal(issues[0].description, 'Description !:;,n')
      assert.equal(issues[0].priority, 'HIGH')
      assert.equal(issues[0].difficulty, 15)

      assert.equal(issues[1].name, 'Name 2')
      assert.equal(issues[1].description, 'Description2 !:;,n')
      assert.equal(issues[1].priority, 'LOW')
      assert.equal(issues[1].difficulty, 35)
    })
  })

  it('Modify issue', function() {
    return db
      ._modifyIssue(issue1, 'Name Modified', 'Description', 'HIGH', 15)
      .then(() => {
        return db._getIssueById(issue1).then(issue => {
          assert.equal(issue.name, 'Name Modified')
        })
      })
  })

  it('Remove issue', function() {
    return db._deleteIssue(issue1).then(result => {
      return db._deleteIssue(issue2).then(result => {
        return db._getAllProjectIssues(newProjectId).then(issues => {
          assert.equal(issues.length, 0)
        })
      })
    })
  })
})

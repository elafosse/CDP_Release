const db = require('../../backend/db_connection')

var assert = require('chai').assert
var should = require('chai').should()
var expect = require('chai').expect

let username1 = 'New Username Test1'
let username2 = 'New Username Test2'
let password = 'hello'

let newProjectId = -1

describe('Database Project Tests', function() {
  before(function() {
    return db._storeMember(username1, password).then(() => {
      return db._storeMember(username2, password)
    })
  })

  after(function() {
    return db._deleteMember(username1).then(() => {
      return db._deleteMember(username2)
    })
  })

  it('Create new Project', function() {
    return db
      ._createProject('Name', 'Description', 'gitHubLogin', 'gitHubRepo')
      .then(result => {
        newProjectId = result
        expect(result).to.be.a('number')
      })
  })

  it('Invite member to a project', function() {
    return db
      ._inviteMembersToProject(newProjectId, [username1], [true])
      .then(() => {
        return db._getMembersOfProject(newProjectId).then(result => {
          assert.equal(result[0], username1)
        })
      })
  })

  it('Remove member from a project', function() {
    return db
      ._deleteMembersFromProject(newProjectId, [username1], [true])
      .then(() => {
        return db._getMembersOfProject(newProjectId).then(result => {
          assert.equal(result.length, 0)
        })
      })
  })

  it('Invite multiple members to a project', function() {
    return db
      ._inviteMembersToProject(
        newProjectId,
        [username1, username2],
        [true, false]
      )
      .then(() => {
        return db._getMembersOfProject(newProjectId).then(result => {
          expect(result).to.have.members([username1, username2])
        })
      })
  })

  it('Get project by id', function() {
    return db._getProjectFromProjectId(newProjectId).then(result => {
      assert.equal(result.name, 'Name')
      assert.equal(result.description, 'Description')
      assert.equal(result.id, newProjectId)
      assert.equal(result.userGitHub, 'gitHubLogin')
      assert.equal(result.repositoryGitHub, 'gitHubRepo')
      assert.equal(result.listAdmins[0], username1)
    })
  })

  it('Modify project', function() {
    return db
      ._modifyProject(
        newProjectId,
        'New Name !',
        'Description',
        'gitHubLogin',
        'gitHubRepo'
      )
      .then(result => {
        return db._getProjectFromProjectId(newProjectId).then(result => {
          assert.equal(result.name, 'New Name !')
        })
      })
  })

  it('Remove project', function() {
    return db._deleteProject(newProjectId).then(result => {
      assert.equal(result, 'Project Deleted')
    })
  })
})

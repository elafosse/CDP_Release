const db = require('../../backend/db_connection')

var assert = require('assert')
var should = require('chai').should()
var expect = require('chai').expect

let username = 'New Username Test'
let password = 'hello'

describe('Database User Tests', function() {
  it('Create user', function() {
    return db._storeMember(username, password).then(() => {
      return db._doesUsernameExists(username).then(userExists => {
        assert.equal(userExists, true)
      })
    })
  })

  it('Check username and password when right', function() {
    return db
      ._areUsernameAndPasswordCorrect(username, password)
      .then(result => {
        expect(result).to.be.equal(true)
      })
  })

  it('Check username and password when wrong', function() {
    return db
      ._areUsernameAndPasswordCorrect(username, password.concat('something'))
      .then(result => {
        expect(result).to.be.equal(false)
      })
  })

  it('Delete user', function() {
    return db._deleteMember(username).then(() => {
      return db._doesUsernameExists(username).then(userExists => {
        assert.equal(userExists, false)
      })
    })
  })
})

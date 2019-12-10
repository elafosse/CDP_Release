/**
 * Represent the account of a user.
 * @constructor Create a Member object.
 * @param {string} username - The username of the user. It is unique.
 * @param {string} password - The password of the user. It can be the same for different members.
 * @param {Array} listProjects - The list of the projects the user is taking part in. It does not matter if the user is an administrator of the project or not.
 */
class Member {
  constructor(username, password, listProjects) {
    this.username = username
    this.password = password
    this.listProjects = listProjects
  }
}

/**
 * Export the Member class so it can be used in other files.
 */
module.exports = {
  Member: Member
}

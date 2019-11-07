class Project {
    constructor(id, name, description, listMembers, admin){
    this.name = name
    this.description = description
    this.id = id
    this.listMembers = listMembers
    this.admin = admin
  }
}

module.exports = {
  Project:Project
}

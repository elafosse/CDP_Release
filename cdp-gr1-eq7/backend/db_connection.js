var mysql = require('mysql');
var bcrypt = require('bcrypt');

const Project = require('./classes/Project');
const Issue = require('./classes/Issue');
const Task = require('./classes/Task');

//https://stackoverflow.com/questions/30545749/how-to-provide-a-mysql-database-connection-in-single-file-in-nodejs
var con = mysql.createConnection({
    host: "www.remotemysql.com",
    user: "wjJ627V9qY",
    database: "wjJ627V9qY",
    password: "qpxKOx6Pe8",
    multipleStatements: true
});

//TODO : checker les paramètres vides

// ================ Projects ================

function createProject(name, description) {
    let sql = "INSERT INTO project (name, description) VALUES (".concat("'", name, "'", ',', "'", description, "'", ')');
    console.log(sql);
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("New project added : (".concat(name, ',', description, ')'));
    });
}

function _createProject(name, description) {
    return new Promise(function (resolve, reject) {
        let sql = "INSERT INTO project (name, description) VALUES (".concat("'", name, "'", ',', "'", description, "'", ')');
        console.log(sql);
        con.query(sql, function (err, result) {
            if (err) reject(-1);
            resolve(result.insertId);
        });
    });
}

function deleteProject(id) {
    //TODO: check if username is the project admin. 
    let sql = "DELETE FROM project WHERE id = ".concat("'", id, "'");
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Project deleted");
    });
}

function _deleteProject(id) {
    return new Promise(function (resolve, reject) {
        let sql = "DELETE FROM project WHERE id = ".concat("'", id, "'");
        con.query(sql, function (err, result) {
            if (err) result(err);
            resolve("Project Deleted");
        });
    });
}

function inviteMembersToProject(projectId, usernameList, areAdminsList) {
    if (usernameList.length != areAdminsList.length) {
        throw "The usernameList and the areAdminsList lenght must be the same";
    }
    let i;
    let sql = "";
    for (i = 0; i < usernameList.length; i++) {
        sql = sql.concat("INSERT INTO project_team (project_id, username, is_admin) VALUES ('",
            projectId, "','", usernameList[i], "'", ',', areAdminsList[i], ');\n');

    }
    console.log(sql);
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Member ".concat(usernameList[i], ' added to project'));
    });
}

function _inviteMembersToProject(projectId, usernameList, areAdminsList) {
    return new Promise(function (resolve, reject) {
        if (usernameList.length != areAdminsList.length) {
            reject("The usernameList and the areAdminsList lenght must be the same");
        }
        let i;
        let sql = "";
        for (i = 0; i < usernameList.length; i++) {
            sql = sql.concat("INSERT INTO project_team (project_id, username, is_admin) VALUES ('",
                projectId, "','", usernameList[i], "'", ',', areAdminsList[i], ');\n');

        }
        console.log(sql);
        con.query(sql, function (err, result) {
            if (err) reject(err);
            resolve("Members added");
        });
    });
}

function deleteMembersFromProject(projectId, usernameList) {
    let i;
    let sql = "";
    for (i = 0; i < usernameList.length; i++) {
        //TODO: check if the user is not the admin of the project
        sql = sql.concat("DELETE FROM project_team WHERE project_id = ",
            projectId, " and username = ", "'", usernameList[i], "';\n");
    }
    console.log(sql);
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Member ".concat(usernameList[i], ' removed from project'));
    });
}

function _deleteMembersFromProject(projectId, usernameList) {
    return new Promise(function (resolve, reject) {
        let i;
        let sql = "";
        for (i = 0; i < usernameList.length; i++) {
            //TODO: check if the user is not the admin of the project
            sql = sql.concat("DELETE FROM project_team WHERE project_id = ",
                projectId, " and username = ", "'", usernameList[i], "';\n");
        }
        con.query(sql, function (err, result) {
            if (err) reject(err);
            resolve("Members deleted");
        });
    });
}

function getMembersOfProject(project_id) {
    let sql = "SELECT username FROM project_team WHERE project_id = '"
        .concat(project_id, "\'");
    console.log(sql);
    con.query(sql, function (err, result) {
        if (err) throw err;
        let id_list = [];
        for (let i = 0; i < result.length; i++) {
            id_list.push(result[i].username);
        }
        console.log(id_list);
        return id_list;
    });
}

function _getMembersOfProject(project_id) {
    return new Promise(function (resolve, reject) {
        let sql = "SELECT username FROM project_team WHERE project_id = '"
            .concat(project_id, "\'");
        console.log(sql);
        con.query(sql, function (err, result) {
            if (err) reject(err);
            let id_list = [];
            for (let i = 0; i < result.length; i++) {
                id_list.push(result[i].username);
            }
            resolve(id_list);
        });
    });
}

function getAdminsOfProject(project_id) {
    let sql = "SELECT username FROM project_team WHERE project_id = '"
        .concat(project_id, "\' and is_admin = '1'");
    console.log(sql);
    con.query(sql, function (err, result) {
        if (err) throw err;
        let id_list = [];
        for (let i = 0; i < result.length; i++) {
            id_list.push(result[i].username);
        }
        console.log(id_list);
        return id_list;
    });
}

function _getAdminsOfProject(project_id) {
    return new Promise(function (resolve, reject) {
        let sql = "SELECT username FROM project_team WHERE project_id = '"
            .concat(project_id, "\' and is_admin = '1'");
        console.log(sql);
        con.query(sql, function (err, result) {
            if (err) reject(err);
            let id_list = [];
            for (let i = 0; i < result.length; i++) {
                id_list.push(result[i].username);
            }
            resolve(id_list);
        });
    });
}

// ================ Members ================
//https://medium.com/@mridu.sh92/a-quick-guide-for-authentication-using-bcrypt-on-express-nodejs-1d8791bb418f

function storeMember(username, password) {
    bcrypt.hash(password, 10, function (err, hashedPassword) {
        if (err) throw err;
        let sql = "INSERT INTO member (username, password) VALUES (".concat("'", username, "','", hashedPassword, "'", ')');
        console.log(sql);
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("New member stored : ".concat(username));
        });
    });
}

function _storeMember(username, password) {
    return new Promise(function (resolve, reject) {
        bcrypt.hash(password, 10, function (err, hashedPassword) {
            if (err) throw err;
            let sql = "INSERT INTO member (username, password) VALUES (".concat("'", username, "','", hashedPassword, "'", ')');
            console.log(sql);
            con.query(sql, function (err, result) {
                if (err) reject(-1);
                resolve(result.insertId);
            });
        });
    });
}

function getProjectsIdsOfMember(username) {
    // TODO: Vérifier si le couple user/project_id n'existe pas déjà
    let sql = "SELECT project_id FROM project_team WHERE username = '"
        .concat(username, "\'");
    console.log(sql);
    con.query(sql, function (err, result) {
        if (err) throw err;
        let id_list = [];
        for (let i = 0; i < result.length; i++) {
            id_list.push(result[i].project_id);
        }
        console.log(id_list);
        return id_list;
    });
}

function _getProjectsIdsOfMember(username) {
    return new Promise(function (resolve, reject) {
        // TODO: Vérifier si le couple user/project_id n'existe pas déjà
        let sql = "SELECT project_id FROM project_team WHERE username = '"
            .concat(username, "\'");
        con.query(sql, function (err, result) {
            if (err) reject(err);
            let id_list = [];
            for (let i = 0; i < result.length; i++) {
                id_list.push(result[i].project_id);
            }
            resolve(id_list);
        });
    });
}

function getProjectsOfMember(username) {
    let project_list = [];
    // TODO: Vérifier si le couple user/project_id n'existe pas déjà
    let sql = "SELECT project_id FROM project_team WHERE username = '"
        .concat(username, "\'");
    console.log(sql);
    con.query(sql, function (err, result) {
        if (err) throw err;
        sql = "";
        for (let i = 0; i < result.length; i++) {
            sql = sql.concat("SELECT * FROM project WHERE id = ".concat(result[i].project_id, ";\n"));
        }
        console.log(result);
        con.query(sql, function (err, result) {
            if (err) throw err;

            for (let i = 0; i < result.length; i++) {
                let p = new Project(
                    result[i][0].name,
                    result[i][0].description,
                    result[i][0].id,
                    null,
                    null,
                )
                project_list.push(p);
            }
            console.log(project_list);
            return project_list;
        });
    });
}

function _getProjectFromProjectId(project_id) {
    return new Promise(function (resolve, reject) {
        _getMembersOfProject(project_id).then((members) => {
            _getAdminsOfProject(project_id).then((admins) => {
                return new Promise(function (resolve, reject) {
                    let sql = "SELECT * FROM project WHERE id = '"
                        .concat(project_id, "\'");
                    console.log(sql);
                    con.query(sql, function (err, result) {
                        let project = new Project.Project(
                            result[0].id,
                            result[0].name,
                            result[0].description,
                            members,
                            admins
                        )
                        console.log(project);

                        resolve(project);
                    });
                });
            }, (raison) => {
                reject(raison);
            });
        }, (raison) => {
            reject(raison);
        });
    });
    
}

function _getProjectsOfMember(username) {
    return new Promise(function (resolve, reject) {
        _getProjectsIdsOfMember(username).then((id_list) => {
            let project_list = [];
            for (let i = 0; i < id_list.length; i++) {
                _getProjectFromProjectId(id_list[i]).then((project) => {
                    project_list.push(project);
                }, (raison) => {
                    reject(raison);
                });
            }
            resolve(project_list);
        }, (raison) => {
            reject(raison);
        });
    });
    
}

function getTaskIdsAssignedToMember(username) {
    // TODO: Vérifier si le couple user/project_id n'existe pas déjà
    let sql = "SELECT task_id FROM assigned_task WHERE username = '"
        .concat(username, "\'");
    console.log(sql);
    con.query(sql, function (err, result) {
        if (err) throw err;
        let id_list = [];
        for (let i = 0; i < result.length; i++) {
            id_list.push(result[i].task_id);
        }
        console.log(id_list);
        return id_list;
    });
}

function _getTaskIdsAssignedToMember(username) {
    return new Promise(function (resolve, reject) {
        // TODO: Vérifier si le couple user/project_id n'existe pas déjà
        let sql = "SELECT task_id FROM assigned_task WHERE username = '"
            .concat(username, "\'");
        con.query(sql, function (err, result) {
            if (err) reject(err);
            let id_list = [];
            for (let i = 0; i < result.length; i++) {
                id_list.push(result[i].task_id);
            }
            resolve(id_list);
        });
    });
}

function areUsernameAndPasswordCorrect(username, password) {
    let sql = "SELECT password FROM member WHERE username = '"
        .concat(username, "\'");
    console.log(sql);
    con.query(sql, function (err, result) {
        if (err) return err;
        let hashedPassword = result[0].password;
        bcrypt.compare(password, hashedPassword, function (err, result) {
            if (result == true) {
                //True
            }
            else {
                //False
            }
        });
    });
}

function _areUsernameAndPasswordCorrect(username, password) {
    return new Promise(function (resolve, reject) {
        let sql = "SELECT password FROM member WHERE username = '"
            .concat(username, "\'");
        console.log(sql);
        con.query(sql, function (err, result) {
            if (err) return err;
            let hashedPassword = result[0].password;
            bcrypt.compare(password, hashedPassword, function (err, result) {
                if (err) reject(err);
                if (result === true) {
                    resolve(true);
                }
                else {
                    resolve(false)
                }
            });
        });
    });
}

function deleteMember(username) {
    let sql = "DELETE FROM member WHERE username = '"
        .concat(username, "\'");
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Member deleted");
    });

}

function _deleteMember(username) {
    return new Promise(function (resolve, reject) {
        let sql = "DELETE FROM member WHERE username = '"
            .concat(username, "\'");
        con.query(sql, function (err, result) {
            if (err) reject(err);
            resolve("Member deleted");
        });
    });
}

function isUsernameAvailable(username) {
    let sql = "SELECT username FROM member WHERE username = '"
        .concat(username, "\'");
    con.query(sql, function (err, result) {
        if (err) return err;
        if (result === []) {
            return true;
        }
        else {
            return false;
        }
    });
}

function _isUsernameAvailable(username) {
    return new Promise(function (resolve, reject) {
        let sql = "SELECT username FROM member WHERE username = '"
            .concat(username, "\'");
        con.query(sql, function (err, result) {
            if (err) reject(err);
            if (result === []) {
                resolve(true);
            }
            else {
                resolve(false);
            }
        });
    });
}

// ================ Issues ================

/*
 * 
function f(name) {
    return new Promise(function (resolve, reject) {

    });
}

f("hello").then((valeur) => {
    console.log(valeur);
}, (raison) => {
    console.log("Pas ajouté");
});

*/

function _addIssueToProject(projectId, name, description, priority, difficulty) {
    return new Promise(function (resolve, reject) {
        let sql = "INSERT INTO issue (project_id, name, description, priority, difficulty) VALUES ("
            .concat("'", projectId, "','", name, "','", description, "','", priority, "',", difficulty, ")");
        console.log(sql);
        con.query(sql, function (err, result) {
            if (err) reject(-1);
            resolve(result.insertId);
        });
    });
}

function _modifyIssue(issueId, name, description, priority, difficulty) {
    return new Promise(function (resolve, reject) {
        var sql = "UPDATE issue SET".concat(
            " name = '", name, "',",
            " description = '", description, "',",
            " priority = '", priority, "',",
            " difficulty = '", difficulty, "'",
            " WHERE id = '", issueId, "';\n");
        console.log(sql);
        con.query(sql, function (err, result) {
            if (err) reject(err);
            resolve(result.affectedRows);
        });
    });
}

function _getAllProjectIssues(project_id) {
    return new Promise(function (resolve, reject) {
        let sql = "SELECT * FROM issue WHERE project_id = '"
            .concat(project_id, "\'");
        con.query(sql, function (err, result) {
            if (err) reject(err);
            let issue_list = [];
            for (let i = 0; i < result.length; i++) {
                issue_list.push(
                    new Issue.Issue(
                        result[i].id,
                        result[i].project_id,
                        result[i].name,
                        result[i].description,
                        result[i].priority,
                        result[i].difficulty)
                );
            }
            resolve(issue_list);
        });
    });
}

function _deleteIssue(issueId) {
    return new Promise(function (resolve, reject) {
        let sql = "DELETE FROM issue WHERE id = '"
            .concat(issueId, "'");
        con.query(sql, function (err, result) {
            if (err) reject(err);
            resolve("Issue removed");
        });
    });
}

function _getIssueById(issueId) {
    return new Promise(function (resolve, reject) {
        let sql = "SELECT * FROM issue WHERE id = '"
            .concat(issueId, "\'");
        con.query(sql, function (err, result) {
            if (err) reject(err);
            let issue = new Issue.Issue(
                result[0].id,
                result[0].project_id,
                result[0].name,
                result[0].description,
                result[0].priority,
                result[0].difficulty)
            resolve(issue);
        });
    });
}

// ================ Tasks ================

function _getAllTasksIdsByProject(project_id) {
    return new Promise(function (resolve, reject) {
        let sql = "SELECT id FROM task WHERE project_id = '"
            .concat(project_id, "\'");
        con.query(sql, function (err, result) {
            if (err) reject(err);
            let id_list = [];
            for (let i = 0; i < result.length; i++) {
                id_list.push(
                    result[i].id
                );
            }
            resolve(id_list);
        });
    });
}

function _getTaskById(task_id) {
    return new Promise(function (resolve, reject) {
        _getMembersAssignedToTask(task_id).then((members) => {
            _getTaskDependencies(task_id).then((dependencies) => {
                let sql = "SELECT * FROM task WHERE id = '"
                    .concat(task_id, "\'");
                con.query(sql, function (err, result) {
                    if (err) reject(err);
                    let task = new Task.Task(
                        result[0].id,
                        result[0].project_id,
                        result[0].name,
                        result[0].description,
                        result[0].state,
                        result[0].date_beginning,
                        result[0].realisation_time,
                        result[0].description_of_done,
                        dependencies,
                        members
                    )
                    resolve(task);
                });
            });
        }, (raison) => {
            reject(raison);
        });
    }, (raison) => {
        reject(raison);
    });
}

function _getAllTasksOfProject(project_id) {
    return new Promise(function (resolve, reject) {
        _getAllTasksIdsByProject(project_id).then((id_list) => {
            let promise_list = [];
            for (let i = 0; i < id_list.length; i++) {
                let promise = _getTaskById(id_list[i]);
                promise_list.push(promise); 
            }
            Promise.all(promise_list).then(function (task_list) {
                resolve(task_list);
            });
        }, (raison) => {
            console.log(raison);
        });

    });
}

function _addTask(projectId, name, description, state, date_beginning, realisation_time, DoD, dependencies /*list int*/, members /*list User*/) {
    return new Promise(function (resolve, reject) {
        let sql = "INSERT INTO task (project_id, name, description, state, start_date, realisation_time, description_of_done) VALUES ("
            .concat(
                "'", projectId, "'", ',',
                "'", name, "'", ',',
                "'", description, "'", ',',
                "'", state, "'", ',',
                "'", date_beginning, "'", ',',
                "'", realisation_time, "'", ',',
                "'", DoD, "'", ');');
        console.log(sql);
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("New task added");
            let taskId = result.insertId;
            _setTaskDependencies(taskId, dependencies).then(_setTaskToMembers(taskId, members));
        });
    });
}

function _modifyTask(taskId, name, description, state, startDate, realisationTime, DoD) {
    return new Promise(function (resolve, reject) {
        var sql = "UPDATE task SET".concat(
            " name = '", name, "',",
            " description = '", description, "',",
            " state = '", state, "',",
            " start_date = '", startDate, "',",
            " realisation_time = '", realisationTime, "',",
            " description_of_done = '", DoD, "'",
            " WHERE id = '", taskId, "';\n");
        console.log(sql);
        con.query(sql, function (err, result) {
            if (err) reject(err);
            resolve(result.affectedRows);
        });
    });
}

function _setTaskDependencies(taskId, dependsOnTasksIdList) {
    return new Promise(function (resolve, reject) {
        var sql = "DELETE FROM task_dependencies WHERE task_id = '".concat(taskId, "';\n");
        for (let i = 0; i < dependsOnTasksIdList.length; i++) {
            sql = sql.concat("INSERT INTO task_dependencies (task_id, depend_on_task_id) VALUES (",
                "'", taskId, "'", ',',
                "'", dependsOnTasksIdList[i], "'", '); \n');
        }
        con.query(sql, function (err, result) {
            if (err) reject(err);
            resolve("New dependencies added");
        });
    });
}

function _setTaskToMembers(taskId, usernameList) {
    //TODO : check if username exists
    return new Promise(function (resolve, reject) {
        let i;
        let sql = "" //"DELETE FROM assigned_task WHERE task_id = '".concat(taskId, "';\n");
        for (i = 0; i < usernameList.length; i++) {
            sql = sql.concat("INSERT INTO assigned_task (task_id, username) VALUES ('",
                taskId, "','", usernameList[i], "'", ');\n');

        }
        con.query(sql, function (err, result) {
            if (err) reject(err);
            resolve("Task assigned to members");
        });
    });
}

function _getMembersAssignedToTask(taskId) {
    return new Promise(function (resolve, reject) {
        let sql = "SELECT username FROM assigned_task WHERE task_id = '"
            .concat(taskId, "\'");
        con.query(sql, function (err, result) {
            if (err) reject(err);
            let id_list = [];
            for (let i = 0; i < result.length; i++) {
                id_list.push(
                    result[i].username);
            }
            resolve(id_list);
        });
    });
}

function _getTaskDependencies(taskId) {
    return new Promise(function (resolve, reject) {
        let sql = "SELECT depend_on_task_id FROM task_dependencies WHERE task_id = '"
            .concat(taskId, "\'");
        con.query(sql, function (err, result) {
            if (err) reject(err);
            let id_list = [];
            for (let i = 0; i < result.length; i++) {
                id_list.push(result[i].depend_on_task_id);
            }
            resolve(id_list);
        });
    });
}

function _updateTaskState(taskId, state) {
    return new Promise(function (resolve, reject) {
        var sql = "UPDATE task SET state = ".concat("'", state, "'", " WHERE id = '", taskId, "'");
        con.query(sql, function (err, result) {
            if (err) reject(err);
            result(result.affectedRows);
        });
    });
}

function _deleteTask(taskId) {
    return new Promise(function (resolve, reject) {
        let sql = "DELETE FROM task WHERE id = '"
            .concat(taskId, "'");
        console.log(sql);
        con.query(sql, function (err, result) {
            if (err) reject(err);
            resolve("Issue removed");
        });
    });
}

// ================ Checklist ================

function _setTaskChecklist(taskId, description, isDone) {
    return new Promise(function (resolve, reject) {
        let sql = "INSERT INTO task_checklist (task_id, description, is_done) VALUES ('".concat(
            taskId, "','",
            description, "',",
            isDone, ");\n");
        con.query(sql, function (err, result) {
            if (err) (err);
            resolve("Task assigned to members");
        });
    });
}

function _modifyTaskDescription(checklistId, description) {
    return new Promise(function (resolve, reject) {
        var sql = "UPDATE task_checklist SET "
            .concat("description = '", description, "'  WHERE id = '", checklistId, "'");
        console.log(sql);
        con.query(sql, function (err, result) {
            if (err) reject(err);
            resolve("Task modified");
        });
    });
}

function _modifyTaskState(checklistId, isDone) {
    return new Promise(function (resolve, reject) {
        var sql = "UPDATE task_checklist SET "
            .concat("is_done = ", isDone, " WHERE id = '", checklistId, "'");
        con.query(sql, function (err, result) {
            if (err) reject(err);
            resolve(result.affectedRows);
        });
    });
}

function _getTaskChecklist(task_id) {
    return new Promise(function (resolve, reject) {
        let sql = "SELECT * FROM task_checklist WHERE task_id = '"
            .concat(task_id, "\'");
        con.query(sql, function (err, result) {
            if (err) reject(err);
            let id_list = [];
            for (let i = 0; i < result.length; i++) {
                id_list.push([result[i].description, result[i].is_done]);
            }
            resolve(id_list);
        });
    });
}

function _getChecklistItemById(itemId) {
    return new Promise(function (resolve, reject) {
        let sql = "SELECT * FROM task_checklist WHERE id = '"
            .concat(itemId, "\'");
        console.log(sql);
        con.query(sql, function (err, result) {
            if (err) reject(err);
            let id_list = [];
            for (let i = 0; i < result.length; i++) {
                id_list.push([
                    result[i].id,
                    result[i].description,
                    result[i].is_done]);
            }
            resolve(id_list);
        });
    });
}

module.exports = {
  _getProjectsIdsOfMember,
  _getProjectFromProjectId,
  _getProjectsOfMember,
  _getTaskIdsAssignedToMember,
  _areUsernameAndPasswordCorrect,
  _createProject,
  _deleteProject,
  _inviteMembersToProject,
  _deleteMembersFromProject,
  _getMembersOfProject,
  _getAdminsOfProject,
  _storeMember,
  _deleteMember,
  _isUsernameAvailable,
  _addIssueToProject,
  _modifyIssue,
  _getAllProjectIssues,
  _deleteIssue,
  _getIssueById,
  _getAllTasksIdsByProject,
  _getTaskById,
  _getAllTasksOfProject,
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
  _getChecklistItemById
}
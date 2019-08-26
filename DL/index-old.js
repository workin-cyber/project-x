

const
fs = require('fs'),
path = require('path'),
tasksPath = path.join(__dirname, './tasks.json')

// Get: task Do: adding one task to tasks list
async function create(task) {

const tasks = await read()

if (tasks.find(t => t.id == task.id))
    throw 'Task already exist'

tasks.unshift(task)
writeToJson(tasks)

return task

}


//Get: nothing or filter Return: list of all tasks (Array) or by filter
async function read(filter) {

let tasks

try {
    tasks = require(tasksPath)
} catch (error) {
    tasks = []
}

if (!Array.isArray(tasks))
    tasks = []

if (filter)
    tasks = tasks.filter(filter)

return tasks
}

//Get: id Return: the task with the id
async function readOne(id) {

const list = await read(t => t.id == id),
    task = list[0]

return task

}

//Get: updated task Return succes/error
async function update(task) {

if (!task.id) throw 'must specify id'

const tasks = await read(),
    index = tasks.findIndex(t => t.id == task.id)

if (index == -1) throw 'Task does not exist'

Object.assign(tasks[index], task)

writeToJson(tasks)

return tasks[index]
}

async function del(id) {

const tasks = await read(),
    index = tasks.findIndex(t => t.id == id)

if (index == -1) throw 'Task does not exist'

tasks.splice(index, 1)

writeToJson(tasks)

return 'success'

}

module.exports = { create, read, readOne, update, del }

function writeToJson(tasks) {
fs.writeFileSync(tasksPath, JSON.stringify(tasks))
}
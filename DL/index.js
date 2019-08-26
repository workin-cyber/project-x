const mysql = require('mysql');
const con = mysql.createConnection({
    host: "remotemysql.com",
    user: "27q3WlFqgk",
    password: "r3ccVILha5",
    database: "27q3WlFqgk"
});

con.connect(async function (err) {
    if (err) throw err;
    console.log("DB Connected!")
})

function run_query(sqlString) {
    return new Promise((resolve, reject) => {
        con.query(sqlString, (err, result) => {
            if (err) reject(err.sqlMessage || err)
            resolve(result)
        })
    })
}

function build_query(table, filter) {
    let queryStr = `SELECT * FROM ${table} `
    if (filter) {
        queryStr += "WHERE "
        for (let f in filter) {
            queryStr += `${f}=${filter[f]}`
        }
    }
    return queryStr
}

async function read(table, filter) {
    try {
        let query_string = build_query(table, filter)
        return run_query(query_string)
    }
    catch (err) {
        console.log("this is error: " + err)
        throw err
    }
}

async function create(query_string){

    try {
        return run_query(query_string)
    }
    catch (err) {
        console.log("this is error: " + err)
        throw err
    }
    
}

async function update(query_string) {

    try {
        return run_query(query_string)
    }
    catch (err) {
        console.log("this is error: " + err)
        throw err
    }
}

async function getResults(err, result) {
    console.log("err : " + err)
    console.log("the result : ")
    console.log(result)
    if (err) throw err;
    return result;
}

module.exports = { read, create , update}
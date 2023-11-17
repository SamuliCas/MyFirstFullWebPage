const express = require('express')
const mysql = require('mysql')
const cors = require('cors')

const app = express()
app.use(cors())

const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: '',
    database: 'mydb'
})

app.get('/users', (req, res)=> {
    const sql = "SELECT * FROM users";
    db.query(sql, (err, data)=> {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.get("/api", (req, res) =>{
    res.json({"users": ["userOne", "userTwo", "userThree"] })
})

app.listen(5000, () => { console.log("Server started on port 5000") })
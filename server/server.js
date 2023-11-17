const express = require('express')
const mysql = require('mysql')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json()); 

// Create a MySQL database connection
const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: '',
    database: 'mydb'
})

// Define a route to fetch all users from the database
app.get('/users', (req, res)=> {
    const sql = "SELECT * FROM users";
    db.query(sql, (err, data)=> {
        if(err) return res.json(err);
        return res.json(data);
    })
})

// Define a route to add a new user to the database
app.post('/addUser', (req, res) => {
    const { username, password } = req.body;

    // Validate that both username and password are provided  
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required." });
    }
  
    const sql = "INSERT INTO users (username, password) VALUES (?, ?)";
    db.query(sql, [username, password], (err, result) => {
      if (err) {
        console.error("Error adding user to the database:", err);
        return res.status(500).json({ error: "Internal server error." });
      }
      
      // Respond with an empty JSON object (success)  
      res.json({});
    });
  });

// app.get("/api", (req, res) =>{
//     res.json({"users": ["userOne", "userTwo", "userThree"] })
// })

app.listen(5000, () => { console.log("Server started on port 5000") })
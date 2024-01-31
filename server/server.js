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
    database: 'todolist'
})

// Define a route to fetch all things to do from the database
app.get('/ThingToDo', (req, res)=> {
    const sql = "SELECT * FROM todo";
    db.query(sql, (err, data)=> {
        if(err) return res.json(err);
        return res.json(data);
    })
})

// Define a route to add thing to do to database
app.post('/addThingToDo', (req, res) => {
    const ThingToDo = req.body;

    // Validate that thind to do is provided  
    if (!ThingToDo) {
      return res.status(400).json({ error: "Thing to do required." });
    }
    
    const { name, completed } = ThingToDo;

    const sql = "INSERT INTO todo (name, completed) VALUES (?, ?)";
    db.query(sql, [name, completed], (err, result) => {
      if (err) {
        console.error("Error adding thing to do to the database:", err);
        return res.status(500).json({ error: "Internal server error." });
      }
      
      // Respond with an empty JSON object (success)  
      res.json({});
    });
  });

  app.put('/updateCompleted/:id', (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;

    // Validate that the completed value is a boolean
    if (typeof completed !== 'boolean') {
        return res.status(400).json({ error: "Invalid completed value. Must be a boolean." });
    }

    const sql = "UPDATE todo SET completed = ? WHERE id = ?";
    db.query(sql, [completed ? 1 : 0, id], (err, result) => {
        if (err) {
            console.error("Error updating completed to the database:", err);
            return res.status(500).json({ error: "Internal server error." });
        }

        // Check if any rows were affected
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Task not found." });
        }

        res.json({ message: "Task updated successfully." });
    });
});

app.listen(5000, () => { console.log("Server started on port 5000") })
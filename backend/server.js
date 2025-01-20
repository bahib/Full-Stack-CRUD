const express = require('express'); // Import express
const cors = require('cors'); // Import cors
const mysql = require('mysql'); // Import mysql

const app = express(); // Make express app

app.use(express.json()); // Middleware for parsing request body

app.use(cors()); // Use cors

// Create database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crud'
});



// Create an api endpoint
app.get("/", (req, res) => {
    // res.send('Hello from the server side'); // Send a message to the client

    // Select data student from database
    const sqlSelect = "SELECT * FROM student";
    db.query(sqlSelect, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

// Create an api endpoint for creating a student record in the database
app.post("/create", (req, res) => {
    const { first_name, last_name, email, phone_number, enrollment_date } = req.body;

    const sqlInsert = "INSERT INTO student (first_name, last_name, email, phone_number, enrollment_date) VALUES (?, ?, ?, ?, ?)";
    db.query(sqlInsert, [first_name, last_name, email, phone_number, enrollment_date], (err, result) => {
        if (err) {
            console.error("Error inserting values:", err);
            res.status(500).send(err); // Envoyer une réponse en cas d'erreur
        } else {
            console.log("Values inserted"); // Vérifiez que ce message s'affiche dans le terminal
            res.status(200).send("Values inserted"); // Envoyer le message de confirmation
        }
    });
});

// Create an api endpoint for updating a student record in the database
app.put("/edit/:id", (req, res) => {
    const { id, first_name, last_name, email, phone_number, enrollment_date } = req.body;

    const sqlUpdate = "UPDATE student SET `first_name` = ?, `last_name` = ?, `email` = ?, `phone_number` = ?, `enrollment_date` = ? WHERE ID = ?";
    db.query(sqlUpdate, [first_name, last_name, email, phone_number, enrollment_date, id], (err, result) => {
        if (err) {
            console.error("Error updating values:", err);
            res.status(500).send(err);
        } else {
            console.log("Values updated");
            res.status(200).send("Values updated");
        }
    });
});

app.listen(8081, () => {
    console.log('Server is running on port 8081');
    });

const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// PostgreSQL connection pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'EurekaDB',
  password: '99@#77',
  port: 5432,
});

// Middleware to parse JSON and URL-encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route to handle form submission
app.post('/upload', async (req, res) => {
  try {
    const { SelectEvent, Group_Leader, College, Mobile_no, Email,  Second_Member, Third_Member, Fourth_Member } = req.body;

    for(var i=2;i<=4;i++){
        
        
}

    // Insert form data into the database
    await pool.query('INSERT INTO Student_Data (event_name, leader, college, mobile_no, email, member2, member3, member4) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [SelectEvent, Group_Leader, College, Mobile_no, Email, Second_Member, Third_Member, Fourth_Member]);

    res.send('Form data has been successfully submitted to the database.');
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

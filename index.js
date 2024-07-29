const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const { Pool } = require('pg');
const path = require('path');
const app = express();
const port = 3000;

app.set('view','ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'views')));
// Multer configuration for handling file uploads


const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ej_database',
  password: '88888888',
  port: 5432,
});
 app.get('/index',(req,res)=>{``
  res.redirect("/index.html")
 })
app.post('/upload',  async (req, res) => {
  try {
    const {
      SelectEvent,
      'Select Event': deptname,
      topic,
      leadername,
      college,
      mobileno,
      email,
      numMembers,
      member2,
      member3,
      member4,
      
    } = req.body;
    // Get the uploaded image data

    // Convert the buffer to a hex string to store in the database
  

    const tablename = SelectEvent + "_" + deptname;
    let query, values;
    if (SelectEvent === "eureka") {
      query = `
        INSERT INTO ${tablename} (event_name, topic_name, group_leader_name, college_name, mobile_no, email, member2_name, member3_name)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      `;
      values = [SelectEvent, topic, leadername, college, mobileno, email, member2, member3];
    } else {
      query = `
        INSERT INTO ${tablename} (event_name, group_leader_name, college_name, mobile_no, email, member2_name, member3_name, member4_name)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      `;    
      values = [SelectEvent, leadername, college, mobileno, email, member2, member3, member4];
    }

    await pool.query(query, values);
    res.redirect("/submit.html")
  } catch (error) {
    console.error('Error processing form submission:', error);
    res.status(500).send('An error occurred while processing the form');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient('https://qcohrcnfiuzkzrqbgfzo.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFjb2hyY25maXV6a3pycWJnZnpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU4NDQwNDIsImV4cCI6MjAyMTQyMDA0Mn0.3p7hcsx9qt0gISAUih7gGnG2Y09HpWaVDDXloo6Svxk');

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());

app.get('/api/getMembers', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('members-gws')
      .select('*');

    if (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(data);
    }
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// host: 'aws-0-ap-south-1.pooler.supabase.com',
// port: 5432,
// user: 'postgres.qcohrcnfiuzkzrqbgfzo',
// password: 'S5iraRUQC0yxudWo',
// database: 'postgres',

// const pool = new Pool({
//   user: "postgres.qcohrcnfiuzkzrqbgfzo",
//   host: `aws-0-ap-south-1.pooler.supabase.com`,
//   database: "postgres",
//   password: "S5iraRUQC0yxudWo",
//   port: 5432, // Default PostgreSQL port
// });

// app.get("/api/getMembers", async (req, res) => {
//   try {
//     const client = await pool.connect();
//     const result = await client.query("SELECT * FROM members-gws");
//     const data = result.rows;
//     client.release();

//     res.json(data);
//   } catch (err) {
//     console.error("Error executing query", err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

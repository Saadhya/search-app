const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient(process.env.REACT_APP_SUPBASE_URL, process.env.REACT_APP_SUPBASE_KEY);

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

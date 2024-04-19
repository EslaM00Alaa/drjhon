

const express = require("express"),
  client = require("../../database/db"),
  validatePatient = require("../../models/patient"),
  router = express.Router();


  

  router.post("/", async (req, res) => {
    try {
      // Validate the request body
      const { error } = validatePatient(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
  
      // Extract patient data from the request body
      const { id, name, phone, whatsapp, job, mail, questionans } = req.body;
  
      // Insert the new patient into the database
      const result = await client.query(
        "INSERT INTO patients (id, name, phone, whatsapp, job, mail, questionans) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
        [id, name, phone, whatsapp, job, mail, questionans]
      );
  
      // Send the newly added patient as the response
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error("Error adding patient:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  

  
  router.get("/search/:name", async (req, res) => {
    try {
      // Extract the name query parameter from the request URL
      const nameQuery = req.params.name;
  
      // Check if the name query parameter is provided
      if (!nameQuery) {
        return res.status(400).json({ error: "Name query parameter is required" });
      }
  
      // Search for patients whose names contain the specified string using the LIKE operator
      const result = await client.query(
        "SELECT * FROM patients WHERE name LIKE $1",
        [`%${nameQuery}%`]
      );
  
      // Send the search results as the response
      res.json(result.rows);
    } catch (error) {
      console.error("Error searching patients:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });













module.exports = router;

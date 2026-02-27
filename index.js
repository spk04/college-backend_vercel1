  const express = require("express");
  const connectDB = require("./config/db");

  const Student = require("./models/Student");

  const app = express();

  connectDB();
  app.use(express.json());
  app.use(express.static("public"));




  app.post("/register", async (req, res) => {
    try {
      console.log("Incoming body:", req.body);
      const { name, username, password, branch, year, cgpa } = req.body;

      const student = new Student({
        name,
        username,
        password,
        branch,
        year,
        cgpa
      });

      await student.save();

      res.status(201).send("Student registered successfully");
    } catch (error) {
      console.error("REGISTER ERROR:", error); 
      res.status(500).send(error.message); 
    }
  });



  app.post("/login", async (req, res) => {
    try {
      const { username, password } = req.body;

      const student = await Student.findOne({ username, password });

      if (!student) {
        return res.status(401).send("Invalid username or password");
      }

      res.status(200).send("Login successful");
    } catch (error) {
      res.status(500).send("Login failed");
    }
  });


  app.patch("/students/:username", async (req, res) => {
    try {
      const { cgpa } = req.body;

      const student = await Student.findOneAndUpdate(
        { username: req.params.username },
        { cgpa: cgpa },
        { new: true }
      );

      if (!student) {
        return res.status(404).send("Student not found");
      }

      res.status(200).send("CGPA updated successfully");
    } catch (error) {
      console.error(error);
      res.status(500).send("Failed to update CGPA");
    }
  });


  app.delete("/students/:username", async (req, res) => {
    try {
      const student = await Student.findOneAndDelete({
        username: req.params.username
      });

      if (!student) {
        return res.status(404).send("Student not found");
      }

      res.status(200).send("Student account deleted successfully");
    } catch (error) {
      console.error(error);
      res.status(500).send("Failed to delete account");
    }
  });



  app.get("/students/:username", async (req, res) => {
    try {
      const student = await Student.findOne(
        { username: req.params.username },
        { password: 0 } // hide password
      );

      if (!student) {
        return res.status(404).send("Student not found");
      }

      res.status(200).json(student);
    } catch (error) {
      res.status(500).send("Failed to fetch student details");
    }
  });



  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);

  });

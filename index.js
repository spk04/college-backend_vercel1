const express = require("express");
const connectDB = require("./config/db");

const Student = require("./models/Student");

const app = express();

connectDB();
app.use(express.static("public"));

app.use(express.json());


app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    const student = new Student({
      username,
      password
    });

    await student.save();

    res.status(201).send("Student registered successfully");
  } catch (error) {
    res.status(500).send("Registration failed");
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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);

});

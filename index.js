const PORT = process.env.PORT || 3000;
const Student = require("./models/Student");

const connectDB = require("./config/db");
connectDB();

const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("College Backend Running");
});

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


app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});


const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;

// Home route
app.get("/", (req, res) => {
    res.status(200).send("Welcome to my Node.js and Express Lab!");
});

// About route
app.get("/about", (req, res) => {
    res.status(200).json({
        name: "K. Sama Kruthika",
        section: "S-002 AIML-2B"
    });
});

// Time route
app.get("/time", (req, res) => {
    res.status(200).json({
        currentDateTime: new Date()
    });
});

// 404 route
app.use((req, res) => {
    res.status(404).send("404 - Page Not Found");
});

// Start server
app.listen(PORT, () => {
    console.log(`Express server running at http://localhost:${PORT}`);
});

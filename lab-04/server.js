
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt");
const path = require("path");
const jwt = require("jsonwebtoken");
const app = express();
app.use(express.json());

const dbPath = path.join(__dirname, "database", "users.db");
const db = new sqlite3.Database(dbPath);

const JWT_SECRET = "MY_SECRET_KEY";
const PORT = process.env.PORT || 3000;

// Create users table
db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        password TEXT NOT NULL
    )
`);

// User registration
app.post("/register/", async (req, res) => {
    const { username, name, password } = req.body;

    if (!username || !name || !password) {
        return res.status(400).send("All fields are required");
    }

    db.get(
        "SELECT * FROM users WHERE username = ?",
        [username],
        async (err, user) => {
            if (err) {
                return res.status(500).send("Database error");
            }

            if (user) {
                return res.status(400).send("Username already exists");
            }

            try {
                const hashedPassword = await bcrypt.hash(password, 10);

                db.run(
                    "INSERT INTO users (username, name, password) VALUES (?, ?, ?)",
                    [username, name, hashedPassword],
                    function (err) {
                        if (err) {
                            return res.status(500).send("Registration failed");
                        }

                        return res.status(201).send("User registered successfully");
                    }
                );
            } catch (error) {
                return res.status(500).send("Password hashing failed");
            }
        }
    );
});

// User login
app.post("/login/", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send("Username and password are required");
    }

    db.get(
        "SELECT * FROM users WHERE username = ?",
        [username],
        async (err, user) => {
            if (err) {
                return res.status(500).send("Database error");
            }

            if (!user) {
                return res.status(400).send("Invalid user");
            }

            try {
                const isPasswordCorrect = await bcrypt.compare(
                    password,
                    user.password
                );

                if (!isPasswordCorrect) {
                    return res.status(400).send("Invalid password");
                }

                const payload = {
                    username: user.username
                };

                const jwtToken = jwt.sign(payload, JWT_SECRET);

                return res.status(200).json({
                    jwt_token: jwtToken
                });

            } catch (error) {
                return res.status(500).send("Login failed");
            }
        }
    );
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});

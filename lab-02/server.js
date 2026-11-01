const express = require("express");
const path = require("path");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

const app = express();

app.use(express.json());

const databasePath = path.join(__dirname, "database", "books.db");

let database = null;

// Initialize database and start server
const initializeDBAndServer = async () => {
    try {
        database = await open({
            filename: databasePath,
            driver: sqlite3.Database,
        });

        console.log("Database connected successfully!");

        const PORT = process.env.PORT || 3000;

        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.log(`Database Error: ${error.message}`);
        process.exit(1);
    }
};

initializeDBAndServer();


// 1. GET all books
app.get("/books/", async (request, response) => {
    const query = `SELECT * FROM book;`;

    const books = await database.all(query);

    response.status(200).send(books);
});


// 2. GET a single book
app.get("/books/:bookId/", async (request, response) => {
    const { bookId } = request.params;

    const query = `SELECT * FROM book WHERE id = ?;`;

    const book = await database.get(query, [bookId]);

    if (book === undefined) {
        response.status(404).send({ message: "Book not found" });
    } else {
        response.status(200).send(book);
    }
});


// 3. POST - Add a new book
app.post("/books/", async (request, response) => {
    const { title, author, price, pages } = request.body;

    const query = `
        INSERT INTO book (title, author, price, pages)
        VALUES (?, ?, ?, ?);
    `;

    await database.run(query, [title, author, price, pages]);

    response.status(201).send({ message: "Book added successfully" });
});


// 4. PUT - Update a book
app.put("/books/:bookId/", async (request, response) => {
    const { bookId } = request.params;
    const { title, author, price, pages } = request.body;

    const query = `
        UPDATE book
        SET title = ?, author = ?, price = ?, pages = ?
        WHERE id = ?;
    `;

    const result = await database.run(query, [
        title,
        author,
        price,
        pages,
        bookId,
    ]);

    if (result.changes === 0) {
        response.status(404).send({ message: "Book not found" });
    } else {
        response.status(200).send({ message: "Book updated successfully" });
    }
});


// 5. DELETE - Remove a book
app.delete("/books/:bookId/", async (request, response) => {
    const { bookId } = request.params;

    const query = `DELETE FROM book WHERE id = ?;`;

    const result = await database.run(query, [bookId]);

    if (result.changes === 0) {
        response.status(404).send({ message: "Book not found" });
    } else {
        response.status(200).send({ message: "Book deleted successfully" });
    }
});
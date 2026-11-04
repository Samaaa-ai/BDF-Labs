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
  const {
    limit = 10,
    offset = 0,
    search_q = "",
    order_by = "title",
    order = "ASC",
    min_price,
    max_price,
  } = request.query;

  const allowedColumns = ["id", "title", "author", "price", "pages"];

  const sortColumn = allowedColumns.includes(order_by)
    ? order_by
    : "title";

  const sortOrder = order.toUpperCase() === "DESC" ? "DESC" : "ASC";

  let getBooksQuery = `
    SELECT *
    FROM book
    WHERE title LIKE ?
  `;

  const queryParams = [`%${search_q}%`];

  if (min_price !== undefined) {
    getBooksQuery += ` AND price >= ?`;
    queryParams.push(Number(min_price));
  }

  if (max_price !== undefined) {
    getBooksQuery += ` AND price <= ?`;
    queryParams.push(Number(max_price));
  }

  getBooksQuery += `
    ORDER BY ${sortColumn} ${sortOrder}
    LIMIT ? OFFSET ?;
  `;

  queryParams.push(Number(limit), Number(offset));

  const booksArray = await database.all(getBooksQuery, queryParams);

  response.send(booksArray);
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

  // Input validation
  if (
    !title ||
    !author ||
    price === undefined ||
    pages === undefined ||
    typeof price !== "number" ||
    typeof pages !== "number" ||
    price <= 0 ||
    pages <= 0
  ) {
    response.status(400).send("Invalid Book Details");
    return;
  }

  const addBookQuery = `
    INSERT INTO book (title, author, price, pages)
    VALUES (?, ?, ?, ?);
  `;

  await database.run(addBookQuery, [
    title,
    author,
    price,
    pages,
  ]);

  response.status(201).send("Book Added Successfully");
});



// 4. PUT - Update a book

app.put("/books/:bookId/", async (request, response) => {
  const { bookId } = request.params;
  const { title, author, price, pages } = request.body;

  // Input validation
  if (
    !title ||
    !author ||
    price === undefined ||
    pages === undefined ||
    typeof price !== "number" ||
    typeof pages !== "number" ||
    price <= 0 ||
    pages <= 0
  ) {
    response.status(400).send("Invalid Book Details");
    return;
  }

  const updateBookQuery = `
    UPDATE book
    SET
      title = ?,
      author = ?,
      price = ?,
      pages = ?
    WHERE id = ?;
  `;

  const dbResponse = await database.run(updateBookQuery, [
    title,
    author,
    price,
    pages,
    bookId,
  ]);

  if (dbResponse.changes === 0) {
    response.status(404).send("Book Not Found");
  } else {
    response.status(200).send("Book Details Updated");
  }
});



// 5. DELETE - Remove a book

app.delete("/books/:bookId/", async (request, response) => {
  const { bookId } = request.params;

  const deleteBookQuery = `
    DELETE FROM book
    WHERE id = ?;
  `;

  const dbResponse = await database.run(deleteBookQuery, [bookId]);

  if (dbResponse.changes === 0) {
    response.status(404).send("Book Not Found");
  } else {
    response.status(200).send("Book Removed");
  }
});

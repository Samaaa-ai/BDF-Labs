# Lab 03 – RESTful API Development and Validation

**Name:** Kadiyala Sama Kruthika  
**Section:** S-002  
**Registration Number:** 252U1R6107
## Aim
To develop RESTful APIs using Node.js, Express.js and SQLite, implementing filtering, searching, sorting, pagination, input validation and CRUD operations.

## Technologies Used
- Node.js
- Express.js
- SQLite
- JavaScript
- Postman

## Project Structure

```text
lab-03/
├── database/
│   └── books.db
├── screenshots/
├── server.js
├── package.json
├── package-lock.json
└── README.md
```

## Features Implemented

1. GET API – Retrieve all books.
2. Search – Search books using `search_q`.
3. Filtering – Filter books using minimum and maximum price.
4. Sorting – Sort books using `order_by` and `order`.
5. Pagination – Retrieve specific records using `limit` and `offset`.
6. POST API – Add a new book with input validation.
7. PUT API – Update existing book details.
8. DELETE API – Delete a book using its ID.
9. Error handling – Handle invalid input and nonexistent book IDs.

## Installation and Execution

```bash
npm install
npm run dev
```

Server runs at:

`http://localhost:3000/`

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/books/` | Get all books |
| GET | `/books/:bookId/` | Get a specific book |
| POST | `/books/` | Add a new book |
| PUT | `/books/:bookId/` | Update book details |
| DELETE | `/books/:bookId/` | Delete a book |

## Screenshots

Postman testing screenshots are available in the `screenshots` folder.

## Conclusion

Successfully implemented RESTful APIs using Express.js and SQLite. Practiced CRUD operations, query parameters, filtering, sorting, pagination, input validation and HTTP status codes.
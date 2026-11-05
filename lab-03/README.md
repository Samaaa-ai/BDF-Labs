# BDF Lab 03 – RESTful API Development and Validation

## Student Details

- **Name:** Kadiyala Sama Kruthika
- **Section:** S-002 AIML-2B
- **Registration Number:** 252U1R6107

## Aim

To develop and integrate RESTful APIs using Node.js, Express.js and SQLite, implementing CRUD operations, searching, filtering, sorting, pagination and input validation.

## Technologies Used

- Node.js
- Express.js
- SQLite
- SQLite3
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
├── .gitignore
└── README.md
```

## Installation

Install the required dependencies:

```bash
npm install
```

## Run the Application

Start the development server:

```bash
npm run dev
```

Server URL:

```text
http://localhost:3000
```

## Database Details

**Database:** books.db

**Table:** book

| Column | Data Type |
|---|---|
| id | INTEGER PRIMARY KEY |
| title | TEXT |
| author | TEXT |
| price | INTEGER |
| pages | INTEGER |

The database contains sample book records used for API operations and testing.

## API Endpoints

| HTTP Method | Endpoint | Description |
|---|---|---|
| GET | `/books/` | Retrieve books with search, filtering, sorting and pagination |
| GET | `/books/:bookId/` | Retrieve a book by ID |
| POST | `/books/` | Add a new book with input validation |
| PUT | `/books/:bookId/` | Update existing book details |
| DELETE | `/books/:bookId/` | Delete a book by ID |

## Features Implemented

- **GET All Books:** Retrieve all book records.
- **Search:** Search books using the `search_q` query parameter.
- **Filtering:** Filter books using `min_price` and `max_price`.
- **Sorting:** Sort records using `order_by` and `order` (ASC/DESC).
- **Pagination:** Retrieve records using `limit` and `offset`.
- **POST:** Insert new book records with input validation.
- **PUT:** Update existing book details.
- **DELETE:** Remove book records using their IDs.
- **Error Handling:** Handle invalid input and nonexistent book IDs using appropriate HTTP status codes.

## Screenshots

### 1. GET All Books

[GET All Books](screenshots/01-get-all-books.png)

### 2. GET with Limit

[GET Limit](screenshots/02-get-limit.png)

### 3. GET with Offset

[GET Offset](screenshots/03-get-offset.png)

### 4. GET Search

[GET Search](screenshots/04-get-search.png)

### 5. GET Sorting – Ascending

[GET Sort ASC](screenshots/05-get-sort-asc.png)

### 6. GET Sorting – Descending

[GET Sort DESC](screenshots/06-get-sort-desc.png)

### 7. GET Price Filtering

[GET Price Filter](screenshots/07-get-price-filter.png)

### 8. POST Valid Book

[POST Valid Book](screenshots/08-post-valid-book.png)

### 9. POST Invalid Book

[POST Invalid Book](screenshots/09-post-invalid-book.png)

### 10. PUT Valid Book

[PUT Valid Book](screenshots/10-put-valid-book.png)

### 11. PUT Invalid ID

[PUT Invalid ID](screenshots/11-put-invalid-id.png)

### 12. PUT Invalid Details

[PUT Invalid Details](screenshots/12-put-invalid-details.png)

### 13. DELETE Valid Book

[DELETE Valid Book](screenshots/13-delete-valid-book.png)

### 14. DELETE Invalid ID

[DELETE Invalid ID](screenshots/14-delete-invalid-id.png)

## Conclusion

Successfully developed and tested RESTful APIs using Node.js, Express.js and SQLite. Implemented CRUD operations, searching, filtering, sorting, pagination and input validation. Practiced handling HTTP status codes and testing API functionality using Postman.

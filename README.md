# 📚 Library Management System

> A RESTful Library Management System built with Node.js, Express.js, MongoDB, and JWT Authentication. The system enables librarians to manage books and members while allowing members to borrow and return books securely through role-based authorization.

![Node.js](https://img.shields.io/badge/Node.js-Express-success)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-green)
![JWT](https://img.shields.io/badge/Auth-JWT-blue)
![License](https://img.shields.io/badge/License-MIT-orange)

---

## 📖 Overview

The Library Management System is a backend REST API designed to simplify library operations. It provides secure authentication, role-based authorization, book inventory management, and book borrowing/return workflows.

The application supports two user roles:

- **Librarian**
  - Manage books
  - View all members
  - Remove members

- **Member**
  - Browse books
  - Borrow books
  - Return books
  - View borrowed books

---

## 🌟 Key Features

- 🔐 Secure JWT-based Authentication
- 👥 Role-Based Authorization (Librarian & Member)
- 📚 Complete CRUD Operations for Books
- 🔍 Case-insensitive Book Search
- 🏷️ Category-based Book Filtering
- 📄 Pagination for Efficient Data Retrieval
- 📖 Borrow & Return Book Workflow
- 📊 Track Book Availability
- 🔒 Password Encryption using bcrypt
- ✅ Input Validation with express-validator
- ⚡ RESTful API Design

---

## ✨ Features

### 🔐 Authentication

- User Registration
- User Login
- JWT Authentication
- Password Hashing using bcrypt

---

### 👥 Role-Based Authorization

#### Librarian

- Add new books
- Update books
- Delete books
- View all books
- View all members
- Remove members

#### Member

- View available books
- Borrow books
- Return borrowed books
- View borrowed books

---

### 📚 Book Management

- Add new books
- Update existing books
- Delete books
- View all books
- View book details
- Search books by title (case-insensitive)
- Filter books by category
- Paginated book listings
- Track total and available copies

---

### 📖 Borrow Management

- Borrow books
- Return books
- Maintain borrowing history
- Track borrowing status

---

## 🛠 Tech Stack

### Backend

- Node.js
- Express.js

### Database

- MongoDB
- Mongoose

### Authentication

- JWT (JSON Web Token)
- bcrypt

### Validation

- express-validator

### Environment

- dotenv

### Other

- CORS
- Nodemon

---

## 📂 Project Structure

```
src/
│
├── config/
│   └── dbConnection.js
│
├── controllers/
│   ├── authController.js
│   ├── bookController.js
│   └── memberController.js
│
├── middlewares/
│   ├── authMiddleware.js
│   ├── roleMiddleware.js
│   └── errorMiddleware.js
│
├── models/
│   ├── User.js
│   ├── Book.js
│   └── Borrow.js
│
├── routes/
│   ├── authRoutes.js
│   ├── bookRoutes.js
│   └── memberRoutes.js
│
├── services/
│   ├── authServices.js
│   ├── bookServices.js
│   └── memberServices.js
│
├── validators/
│   └── validationRules.js
│
├── app.js
└── server.js
```

---

## 📦 Installation

### Clone Repository

```bash
git clone https://github.com/Sujil75/Library-Management-System.git
```

```bash
cd Library-Management-System
```

---

### Install Dependencies

```bash
npm install
```

---

## 🚀 Deployment

The Library Management System is deployed on **Render**, providing a reliable cloud-hosted environment for the REST API.

### Deployment Platform

- **Hosting:** Render
- **Backend:** Node.js + Express.js
- **Database:** MongoDB Atlas

### Live API

```text
https://library-management-system-im4j.onrender.com
```

Replace the URL above with your actual Render deployment URL.

> **Note:** The application may take a few seconds to respond to the first request after a period of inactivity, as Render's free tier puts services to sleep when idle.

---

### Create Environment Variables

Create a `.env` file in the root directory.

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

DNS_PORT=8.8.8.8,8.8.4.4
```

---

### Run Development Server

```bash
npm run dev
```

---

## 📌 API Endpoints

### Authentication

| Method | Endpoint | Description |
|----------|----------------|----------------|
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login user |

---

### Books

| Method | Endpoint | Access |
|----------|----------------|-------------|
| POST | `/api/books` | Librarian |
| GET | `/api/books` | Librarian, Member |
| GET | `/api/books/:id` | Librarian, Member |
| PUT | `/api/books/:id` | Librarian |
| DELETE | `/api/books/:id` | Librarian |

---

### Borrow Books

| Method | Endpoint | Access |
|----------|---------------------------|------------|
| POST | `/api/books/:id/borrow` | Member |
| POST | `/api/books/:id/return` | Member |

---

### Members

| Method | Endpoint | Access |
|----------|---------------------------|------------|
| GET | `/api/members` | Librarian |
| DELETE | `/api/members/:id` | Librarian |
| GET | `/api/members/me/books` | Member |

---

## 🔒 Authentication Flow

1. Register an account.
2. Login with email and password.
3. Receive a JWT token.
4. Include the token in every protected request.

```
Authorization: Bearer <JWT_TOKEN>
```

---

## 📚 Database Models

### User

- Name
- Email
- Password (Hashed)
- Role (Member / Librarian)

---

### Book

- Title
- Author
- ISBN
- Category
- Quantity
- Available Quantity

---

### Borrow

- Member ID
- Book ID
- Borrow Date
- Return Date
- Status

---

## 🔍 Search, Filter & Pagination

The Books API supports advanced querying for efficient retrieval.

### Search

Search books by title using a case-insensitive query.

```http
GET /api/books?search=harry
```

---

### Category Filter

Retrieve books belonging to a specific category.

```http
GET /api/books?category=Fantasy
```

---

### Pagination

Limit the number of books returned per request.

```http
GET /api/books?page=1&limit=10
```

---

### Combined Query

Search, filter, and paginate simultaneously.

```http
GET /api/books?page=2&limit=5&search=harry&category=Fantasy
```

#### Query Parameters

| Parameter | Description | Default |
|-----------|-------------|---------|
| `page` | Page number | `1` |
| `limit` | Number of books per page | `10` |
| `search` | Search by book title | `""` |
| `category` | Filter by category | All categories |

This enables efficient browsing of large book collections while minimizing unnecessary data transfer.

---

## 🏷️ Supported Book Categories

To maintain consistency and simplify filtering, this project supports a predefined set of book categories. When adding or updating a book, the **category** field must be one of the following:

| Category |
|----------|
| Fiction |
| Mystery |
| Thriller |
| Romance |
| Fantasy |
| Science Fiction |
| Biography |
| History |
| Technology |

> **Note:** Only the categories listed above are accepted. This ensures standardized classification and enables reliable category-based filtering throughout the application.

---

## 🚀 Future Improvements

- Refresh Token Authentication
- Fine calculation for overdue books
- Book reservation system
- Email notifications
- Dashboard analytics
- Swagger/OpenAPI documentation
- Docker support
- Unit & Integration testing
- Rate limiting
- Logging with Winston/Morgan
- CI/CD pipeline

---

## 🧪 Testing

Future versions will include:

- Jest
- Supertest

for automated API testing.

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository

2. Create a feature branch

```bash
git checkout -b feature/new-feature
```

3. Commit changes

```bash
git commit -m "Add new feature"
```

4. Push branch

```bash
git push origin feature/new-feature
```

5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Sujil S Mathew**

- GitHub: https://github.com/Sujil75

---

## ⭐ Support

If you found this project helpful, please consider giving it a ⭐ on GitHub. It helps others discover the project and motivates further development.
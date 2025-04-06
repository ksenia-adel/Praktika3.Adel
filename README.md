# Book Management RESTful API

A RESTful API for managing books, authors, and categories with user authentication using JWT and role-based access control.

Used dataset contains lists of best-selling books and book series.

https://www.kaggle.com/datasets/drahulsingh/best-selling-books

## Features

- User authentication (signup/signin) with JWT
- Role-based access:
  - **Admin** can view/create/update/delete books, view/post/delete comments, view logs, view/delete users
  - **User** can view books and view/post/delete comments
- Commenting system (per book)
- Activity logging for admin actions
- Sequelize + PostgreSQL + Express.js

---

Clone the repository and install dependencies:

```bash
git clone https://github.com/ksenia-adel/Praktika3.Adel
cd your-project
npm install
```

## Create a .env file:

```bash
DB_USER=yourUser
DB_PASSWORD=yourPassword
DB_DATABASE=yourDatabase
DB_HOST=dev.vk.edu.ee
DB_PORT=5432
DB_DIALECT=postgres
DB_SCHEMA=books
SECRET=yourJWTSecret
```


## NB! If there is no schema "books" in your database, before migration remove <<"schema": "books">> from config/config.json

### Migration and book import into your data base.
```bash
npx sequelize-cli db:migrate
```
```bash
node scripts/importBooks.js
```

## Running the Server

```bash
node server.js
```

# API Endpoints
## Authentication
### Sign Up

```bash
POST /api/auth/signup
```

Example Body[JSON]:

```bash
{
  "username": "admin",
  "email": "admin@example.com",
  "password": "adminpass",
  "role": "Admin"
}

or

{
  "username": "user1",
  "email": "user1@example.com",
  "password": "user1pass",
  "role": "User"
}
```

### Sing In

```bash
POST /api/auth/signin
```

Example Body[JSON]:

```bash
{
  "username": "admin",
  "password": "adminpass"
}

or

{
  "username": "user1",
  "password": "user1pass"
}
```
After signing in, copy generated accessToken. Go to Thunder Client > Headers > header : Authorization, value : << insert your accessToken >>
After that you can switch between authorizations User/Admin.

![image](https://github.com/user-attachments/assets/32f64e3a-cbc9-4343-ba24-70d01ce0befe)

![image](https://github.com/user-attachments/assets/72f2343b-917e-4b83-82e0-6869f7ebb736)



### Delete user permanently (only Admin)
```bash
DELETE api/users/:userId
```

## Books
### Get all books
```bash
GET /api/books
```
### Add a book (only Admin)
```bash
POST /api/books
```
Example Body[JSON]:
```bash
{
  "title": "The War of the Worlds",
  "publicationYear": 1898,
  "authorNames": ["H. G. Wells"],
  "categoryNames": ["Science fiction"]
}
```
### Update book info (only Admin)
```bash
PUT /api/books/:id
```
Example Body[JSON]:
```bash
{
  "title": "The War of the Worlds",
  "publicationYear": 1890,
  "authorNames": ["H. G. Wells"],
  "categoryNames": ["Science fiction"]
}
```
### Delete book (only Admin)
```bash
DELETE /api/books/:id
```

## Comments (all users)

### Add a comment 
```bash
POST /api/comments/:bookId
```
Example Body[JSON]: 
```bash
{
  "content": "väga huvitav raamat!"
}
```
### Get comments for book by bookId
```bash
GET /api/comments/:bookId
```

### Delete comment
```bash
 DELETE /api/comments/:commentId
```
## Activity logs (only Admin)
```bash
GET /api/logs
```

## User Roles

Admin: Full access

User: View books, view/post/delete comments

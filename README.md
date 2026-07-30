# 4xCollection

> A modern full-stack MERN e-commerce platform designed to provide a seamless online shopping experience with secure authentication, product management, order processing, and an administrative dashboard.

> **Project Status:** 🚧 Backend Completed | Frontend Under Development

---

## 📖 Overview

4xCollection is a full-stack e-commerce application built using the MERN stack. The project aims to provide a scalable and modular architecture for both customers and administrators.

Customers can browse products, manage their shopping cart, maintain wishlists, save delivery addresses, and place orders. Administrators can manage users, categories, products, orders, and monitor store performance through an admin dashboard.

The backend follows RESTful API principles, JWT-based authentication, role-based authorization, and a modular MVC architecture.

---

## ✨ Features

### Authentication

- User Registration
- Secure Login
- JWT Authentication
- Refresh Token
- Logout
- Change Password
- Get Current User

### User Features

- User Profile
- Address Management
- Shopping Cart
- Wishlist
- Order History

### Product Management

- Create Product
- Update Product
- Delete Product
- View Products
- Product Variants
- Image Upload with Cloudinary

### Category Management

- Create Category
- Update Category
- Delete Category
- View Categories

### Shopping

- Add to Cart
- Update Cart Quantity
- Remove Cart Item
- Clear Cart
- Wishlist Management

### Order Management

- Create Order
- View Orders
- Cancel Order
- Inventory Management

### Admin Features

- Dashboard Statistics
- User Management
- Product Management
- Category Management
- Order Management
- Update Order Status

---

## 🚀 Current Progress

### ✅ Completed

- Backend REST API
- Authentication & Authorization
- User Module
- Admin User Management
- Category Module
- Product Module
- Cart Module
- Wishlist Module
- Address Module
- Order Module
- Admin Dashboard

### 🚧 In Progress

- Customer Frontend
- Admin Dashboard Frontend

### 📌 Planned (Version 2)

- Product Search
- Product Filtering
- Sorting
- Pagination
- Reviews & Ratings
- Coupons
- Payment Gateway Integration
- Analytics
- Notifications

---

## 🛠 Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt
- Multer
- Cloudinary

### Frontend (Under Development)

- React
- Vite
- Tailwind CSS
- Redux Toolkit

### Development Tools

- Git
- GitHub
- Postman
- VS Code

---

## 📁 Project Structure

```
4xCollection/
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── app.js
│   │   └── index.js
│   │
│   ├── package.json
│   └── .env.example
│
├── frontend/          (Coming Soon)
│
└── README.md
```

---

## 📌 Backend Modules

### Authentication

- Register
- Login
- Logout
- Refresh Token

### Users

- Current User
- Change Password
- Admin User Management

### Categories

- Create Category
- Update Category
- Delete Category
- Get Categories

### Products

- Create Product
- Update Product
- Delete Product
- Get Products
- Get Product Details

### Cart

- Add Product
- Update Quantity
- Remove Product
- Clear Cart

### Wishlist

- Add Product
- Remove Product
- View Wishlist

### Address

- Add Address
- Update Address
- Delete Address
- Set Default Address

### Orders

- Create Order
- Get My Orders
- Get Order Details
- Cancel Order

### Admin

- Dashboard
- User Management
- Order Management

---

## 🔐 Authentication

Protected endpoints require a valid JWT Access Token.

Example:

```
Authorization: Bearer <access_token>
```

---

## ⚙️ Installation

### Clone the repository

```bash
git clone https://github.com/ashokbudha/4xcollection.git

cd 4xCollection/server
```

### Install dependencies

```bash
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file inside the backend directory.

```env
PORT=8000

MONGODB_URI=

CORS_ORIGIN=

ACCESS_TOKEN_SECRET=

ACCESS_TOKEN_EXPIRY=

REFRESH_TOKEN_SECRET=

REFRESH_TOKEN_EXPIRY=

CLOUDINARY_CLOUD_NAME=

CLOUDINARY_API_KEY=

CLOUDINARY_API_SECRET=
```

---

## ▶️ Running the Project

Development mode

```bash
npm run dev
```

Production mode

```bash
npm start
```

The server will start at

```
http://localhost:8000
```

---

## 📦 API Base URL

```
http://localhost:8000/api/v1
```

Example endpoints

```
POST    /users/register
POST    /users/login
GET     /products
POST    /cart/add
POST    /orders
GET     /dashboard
```

---

## 🗄 Database

MongoDB is used as the primary database.

Main Collections

- Users
- Categories
- Products
- Carts
- Wishlists
- Addresses
- Orders

---

## 🔒 Security Features

- JWT Authentication
- Role-based Authorization
- Password Hashing using bcrypt
- Protected Routes
- Cloudinary Image Storage
- Input Validation
- Secure HTTP Cookies

---

## 🛣 Roadmap

### Version 1

- [x] Authentication
- [x] User Module
- [x] Category Module
- [x] Product Module
- [x] Cart Module
- [x] Wishlist Module
- [x] Address Module
- [x] Order Module
- [x] Admin Dashboard
- [x] Admin User Management

### Version 1.1

- [ ] Customer Frontend
- [ ] Admin Dashboard Frontend

### Version 2

- [ ] Product Search
- [ ] Filtering
- [ ] Sorting
- [ ] Pagination
- [ ] Reviews & Ratings
- [ ] Coupons
- [ ] Payment Integration
- [ ] Analytics
- [ ] Notifications

---

## 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/your-feature
```

3. Commit your changes

```bash
git commit -m "Add your feature"
```

4. Push to your branch

```bash
git push origin feature/your-feature
```

5. Open a Pull Request

---

## 👨‍💻 Author

**Ashok Budha**

Computer Science Student | MERN Stack Developer | 

GitHub: https://github.com/ashokbudha

---
**Gyanendra**

Computer Science Student | MERN Stack Developer | 

GitHub: https://github.com/username

---


## 📄 License

This project is licensed under the MIT License.

---

## ⭐ Support

If you found this project helpful, consider giving it a ⭐ on GitHub.
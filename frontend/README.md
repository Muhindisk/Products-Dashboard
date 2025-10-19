# Product Dashboard Fullstack Project

## Overview
This project is a fullstack MERN application consisting of:
- **Express.js Backend**: A RESTful API for managing products, built with Express and MongoDB.
- **React Frontend**: A modern dashboard for viewing, adding, editing, and deleting products, built with React and Vite.

---

## Features
- List all products
- Add new products
- Edit existing products
- Delete products
- Responsive UI
- MongoDB Atlas integration
- Error handling and validation

---

## Folder Structure
```
express-js-server-side-framework-Muhindisk/
  server.js
  config/
    db.js
  models/
    products.js
  routes/
    productRoutes.js
  .env
  package.json

react-js-jsx-and-css-mastering-front-end-development-Muhindisk/
  product-dashboard/
    src/
      components/
        Home.jsx
        ProductCard.jsx
        ProductForm.jsx
      lib/
        api.js
      App.jsx
    package.json
```

---

## Setup Instructions

### 1. Backend (Express.js)
1. Navigate to the backend folder:
   ```sh
   cd express-js-server-side-framework-Muhindisk
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file with your MongoDB connection string:
   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   ```
4. Start the server:
   ```sh
   npm run dev
   ```

### 2. Frontend (React)
1. Navigate to the frontend folder:
   ```sh
   cd react-js-jsx-and-css-mastering-front-end-development-Muhindisk/product-dashboard
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```
4. Open your browser at [http://localhost:5173](http://localhost:5173)

---

## API Endpoints
- `GET /api/products` - List all products
- `POST /api/products` - Add a new product
- `PUT /api/products/:id` - Update a product
- `DELETE /api/products/:id` - Delete a product

---

## Screenshots

### Dashboard View
[Dashboard](<Screenshot 2025-10-18 161827.png>)

### Add Product Form
![Product Form](<Screenshot 2025-10-18 161827-1.png>)

### Database
![db](<Screenshot 2025-10-18 162131.png>)
![db](<Screenshot 2025-10-18 162216.png>)
![db](<Screenshot 2025-10-18 162236.png>)
![db](<Screenshot 2025-10-18 162250.png>)
![db](<Screenshot 2025-10-18 162318.png>)
![db](<Screenshot 2025-10-18 162338.png>)

---

## Technologies Used
- Express.js
- MongoDB & Mongoose
- React
- Vite
- Tailwind CSS

---

## Troubleshooting
- Ensure MongoDB is running and accessible
- Check `.env` for correct connection string
- If CORS errors occur, verify frontend and backend ports
- For more help, see the comments in each file

---

## Author
- Stephen Muhindi

---

## License
This project is licensed under the ISC License.

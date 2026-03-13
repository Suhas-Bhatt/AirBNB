# 🏡 AirBNB Clone

An immersive Airbnb-like rental platform built using **Node.js, Express, MongoDB, and EJS**.
This project replicates core Airbnb functionalities such as browsing listings, creating properties, and booking stays.

---

# 🚀 Overview

The **AirBNB Clone** is a full-stack web application designed to demonstrate backend architecture, database design, and dynamic server-side rendering.

Users can:

* Browse available property listings
* Create and manage their own listings
* View listing details
* Book stays with selected dates

This project focuses on **clean backend architecture, MVC structure, and RESTful routes**.

---

# 🌐 Live Demo

🔗 https://rentalhub-4z9w.onrender.com/listings

> ⚠️ The site is hosted on **Render**, so it may take a few seconds to wake up if inactive.

---

# 🧰 Tech Stack

| Layer      | Technology                    |
| ---------- | ----------------------------- |
| Backend    | Node.js, Express.js           |
| Frontend   | EJS Templates                 |
| Database   | MongoDB, Mongoose             |
| Styling    | HTML5, CSS3                   |
| Deployment | Render                        |
| Tools      | Express Middleware, Utilities |

---

# 📁 Project Structure

```
AirBNB/
│
├── app.js              # Application entry point
├── package.json        # Project dependencies
│
├── models/             # Mongoose models
│   ├── listing.js
│   ├── user.js
│   └── booking.js
│
├── views/              # EJS templates
│   ├── listings/
│   ├── layouts/
│   └── partials/
│
├── public/             # Static files
│   ├── css/
│   └── images/
│
├── utils/              # Helper functions
│
└── README.md
```

---

# ⚙️ Installation & Setup

Follow these steps to run the project locally.

## 1️⃣ Clone the repository

```
git clone https://github.com/Suhas-Bhatt/AirBNB.git
```

---

## 2️⃣ Navigate to the project folder

```
cd AirBNB
```

---

## 3️⃣ Install dependencies

```
npm install
```

---

## 4️⃣ Start MongoDB

Open a new terminal and run:

```
mongosh
```

Create or switch database:

```
use airbnb
```

---

## 5️⃣ Run the application

```
npm start
```

or

```
node app.js
```

---

## 6️⃣ Open in browser

```
http://localhost:3000
```

Listings page:

```
http://localhost:3000/listings
```

---

# ✨ Features

* 🔍 Browse property listings
* 🏠 Create new property listings
* ✏️ Edit and update listings
* ❌ Delete listings
* 📅 Book property stays
* 📄 Dynamic server-side rendering using EJS
* 📦 MongoDB database integration

---

# 🌱 Future Enhancements

* 🔐 User Authentication (Login / Register)
* ⭐ Listing Reviews & Ratings
* 🔎 Advanced Search & Filters
* 💳 Payment Gateway Integration
* 📱 Fully Responsive Mobile UI
* ☁️ Cloud image uploads (Cloudinary)
* 🌍 Deployment with Docker

---

# 🤝 Contributing

Contributions are welcome!

If you would like to improve this project:

1. Fork the repository
2. Create a new branch
3. Commit your changes
4. Open a Pull Request

---

# 📬 Contact

Created by **Suhas Bhatt**

GitHub:
https://github.com/Suhas-Bhatt

---

> “Design is not just what it looks like and feels like. Design is how it works.”
> — Steve Jobs

# 🏡 RentalHub — Property Rental Platform

> An Airbnb-inspired full-stack property rental web application built with Node.js, Express, MongoDB, and EJS.

---

## 📌 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Getting Started](#getting-started)
  - [Running Locally](#running-locally)
  - [Running with Docker](#running-with-docker)
- [API Routes](#api-routes)
- [Authentication & Authorization](#authentication--authorization)
- [Image Uploads](#image-uploads)
- [Maps Integration](#maps-integration)
- [Docker Reference](#docker-reference)

---

## Overview

**RentalHub** is a full-stack web application that replicates core Airbnb functionality — allowing users to list, browse, and review rental properties. Each listing includes a location-based map powered by Mapbox, image hosting via Cloudinary, and secure session-based authentication with Passport.js.

---

## Features

- 🔐 **User Authentication** — Register, login, and logout with Passport.js (local strategy)
- 🏘️ **Property Listings** — Create, read, update, and delete rental listings (full CRUD)
- 📸 **Image Uploads** — Upload listing photos directly to Cloudinary
- 🗺️ **Interactive Maps** — Geocoded location maps on every listing via Mapbox GL JS
- ⭐ **Reviews System** — Authenticated users can post and delete reviews on listings
- 🛡️ **Authorization** — Only listing owners can edit/delete their listings; only review authors can delete their reviews
- ✅ **Server-side Validation** — Joi schema validation on all form inputs
- 💬 **Flash Messages** — Success and error feedback on every action
- 🔁 **Session Persistence** — Sessions stored in MongoDB via `connect-mongo`
- 🐳 **Dockerized** — Ready to run with a single `docker compose up -d`

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Runtime** | Node.js v22 |
| **Framework** | Express.js v4 |
| **Templating** | EJS + ejs-mate (layouts) |
| **Database** | MongoDB Atlas (Mongoose ODM) |
| **Authentication** | Passport.js + passport-local + passport-local-mongoose |
| **Session Store** | connect-mongo |
| **File Uploads** | Multer + multer-storage-cloudinary |
| **Cloud Storage** | Cloudinary |
| **Maps** | Mapbox SDK + Mapbox GL JS |
| **Validation** | Joi |
| **Environment** | dotenv |
| **Containerization** | Docker + Docker Compose |

---

## Project Structure

```
RentalHub/
├── controllers/          # Route handler logic
│   ├── listings.js       # CRUD for property listings
│   ├── reviews.js        # Create & delete reviews
│   └── users.js          # Register, login, logout
├── models/               # Mongoose schemas
│   ├── listing.js        # Listing model (title, price, location, geometry, image, reviews, owner)
│   ├── review.js         # Review model (rating, comment, author)
│   └── user.js           # User model (via passport-local-mongoose)
├── routes/               # Express routers
│   ├── listing.js        # /listings routes
│   ├── review.js         # /listings/:id/reviews routes
│   └── user.js           # /register, /login, /logout routes
├── views/                # EJS templates
│   ├── layouts/          # boilerplate.ejs (shared layout)
│   ├── includes/         # Partials (navbar, flash messages, footer)
│   ├── listings/         # index, show, new, edit, error pages
│   └── users/            # login, register pages
├── public/               # Static assets (CSS, JS, images)
├── init/                 # DB seed data & seed script
├── utils/                # ExpressError class & wrapAsync helper
├── middleware.js          # isLoggedIn, isOwner, isReviewAuthor, validate* guards
├── schema.js             # Joi validation schemas
├── cloudConfig.js        # Cloudinary + multer storage config
├── app.js                # Express app entry point
├── Dockerfile            # Multi-stage Docker build
├── docker-compose.yml    # Docker Compose config
└── .env                  # Environment variables (not committed)
```

---

## Environment Variables

Create a `.env` file in the project root with the following keys:

```env
# Cloudinary (image uploads)
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

# Mapbox (maps & geocoding)
MAP_TOKEN=your_mapbox_public_token

# Sessions
SECRET=your_session_secret_key

# MongoDB Atlas
ATLASDB_URL=mongodb+srv://<user>:<password>@cluster.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```

> ⚠️ Never commit `.env` to version control. It is already listed in `.gitignore` and `.dockerignore`.

---

## Getting Started

### Prerequisites

- [Node.js v22+](https://nodejs.org/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) *(for Docker setup)*
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster
- A [Cloudinary](https://cloudinary.com/) account
- A [Mapbox](https://www.mapbox.com/) account

---

### Running Locally

```bash
# 1. Clone the repository
git clone https://github.com/Suhas-Bhatt/RentalHub-Property-Rental-Platform-AirBNB-.git
cd RentalHub-Property-Rental-Platform-AirBNB-

# 2. Install dependencies
npm install

# 3. Create your .env file
# (fill in values as described in the Environment Variables section)

# 4. Start the server
node app.js
```

The app will be available at **http://localhost:3000/listings**

---

### Running with Docker

> Requires [Docker Desktop](https://www.docker.com/products/docker-desktop/) to be running.

```bash
# 1. Clone the repository and create your .env file

# 2. Build and start the container (detached)
docker compose up -d --build

# 3. View logs
docker compose logs -f rentalhub

# 4. Stop the container
docker compose down
```

The app will be available at **http://localhost:3000/listings**

#### Passing env variables via CLI (instead of .env file)

```powershell
# Using --env-file flag
docker compose --env-file .env.production up -d

# Inline variables (PowerShell)
$env:SECRET="mySecret"; docker compose up -d

# docker run with -e flags
docker run -e SECRET=mySecret -e ATLASDB_URL=mongodb+srv://... -p 3000:3000 rentalhub-app
```

---

## API Routes

### Listings

| Method | Route | Description | Auth Required |
|---|---|---|---|
| `GET` | `/listings` | Browse all listings | No |
| `GET` | `/listings/new` | New listing form | ✅ Yes |
| `POST` | `/listings` | Create a listing | ✅ Yes |
| `GET` | `/listings/:id` | View a listing | No |
| `GET` | `/listings/:id/edit` | Edit listing form | ✅ Owner only |
| `PUT` | `/listings/:id` | Update a listing | ✅ Owner only |
| `DELETE` | `/listings/:id` | Delete a listing | ✅ Owner only |

### Reviews

| Method | Route | Description | Auth Required |
|---|---|---|---|
| `POST` | `/listings/:id/reviews` | Add a review | ✅ Yes |
| `DELETE` | `/listings/:id/reviews/:reviewId` | Delete a review | ✅ Author only |

### Users

| Method | Route | Description |
|---|---|---|
| `GET` | `/register` | Registration form |
| `POST` | `/register` | Create account |
| `GET` | `/login` | Login form |
| `POST` | `/login` | Authenticate user |
| `GET` | `/logout` | Logout current user |

---

## Authentication & Authorization

- Authentication is handled by **Passport.js** with the **local strategy** via `passport-local-mongoose`.
- Sessions are persisted in **MongoDB** using `connect-mongo`, with a 7-day expiry.
- Three authorization guards are enforced via **middleware**:
  - `isLoggedIn` — blocks unauthenticated users
  - `isOwner` — ensures only the listing creator can edit/delete
  - `isReviewAuthor` — ensures only the review author can delete it

---

## Image Uploads

- Users can upload a photo when creating or editing a listing.
- Files are handled by **Multer** and stored directly on **Cloudinary** via `multer-storage-cloudinary`.
- The Cloudinary `url` and `filename` are saved on the listing document for later deletion.

---

## Maps Integration

- When a listing is created, its `location` field is **geocoded** using the **Mapbox Geocoding API** (`@mapbox/mapbox-sdk`).
- The resulting GeoJSON `Point` geometry (`[longitude, latitude]`) is stored on the listing.
- On the listing detail page, **Mapbox GL JS** renders an interactive map centered on the property.

---

## Docker Reference

| File | Purpose |
|---|---|
| `Dockerfile` | Multi-stage build — `node:22-alpine` base, installs prod deps only, copies source |
| `.dockerignore` | Excludes `node_modules`, `.env`, `.git` from build context |
| `docker-compose.yml` | Defines the `rentalhub` service, injects `.env`, maps port `3000` |

```bash
docker compose up -d          # Start in background
docker compose up -d --build  # Rebuild image and start
docker compose logs -f        # Stream logs
docker compose down           # Stop and remove containers
docker compose ps             # Check running services
```

---

## License

This project is for educational purposes.

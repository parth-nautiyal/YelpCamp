# 🏕️ YelpCamp - Campground Review Platform 

A full-featured campground review platform built with Node.js, Express, and MongoDB. Users can discover, review, and manage campgrounds with secure authentication.

## 🌐 Live Demo

Check out the live version of the app here: [App Link](https://yelpcamp-qyt5.onrender.com)


## ✨ Features

- **User System**:
  - ✅ Secure registration & login
  - 🔒 Protected routes
  - 👤 User-specific content

- **Campgrounds**:
  - 🏞️ CRUD operations for campgrounds
  - 🔍 Detailed campground pages
  - 📝 Rich description editing

- **Reviews**:
  - ⭐ Rating system
  - ✏️ Review editing
  - 🗑️ Review management

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js | Runtime environment |
| Express | Web framework |
| MongoDB | Database |
| Mongoose | ODM |
| Express-Session | Authentication |

### Frontend
| Technology | Purpose |
|------------|---------|
| EJS | Templating engine |
| Bootstrap | CSS framework |
| JavaScript | Client-side logic |

## 📂 Project Structure

```bash
.
├── controllers/
│   ├── campgrounds.js  # Campground logic
│   ├── reviews.js     # Review logic
│   └── users.js       # User logic
├── models/
│   ├── Campground.js  # Campground schema
│   ├── Review.js      # Review schema
│   └── User.js        # User schema
├── public/
│   └── javascripts/
│       └── validateForms.js  # Client validation
├── routes/
│   ├── campgrounds.js  # Campground routes
│   ├── reviews.js     # Review routes
│   └── users.js       # User routes
├── seeds/            # Sample data
├── utils/            # Helper functions
├── views/            # All EJS templates
├── .env              # Environment config
├── app.js            # Main app file
└── package.json      # Dependencies

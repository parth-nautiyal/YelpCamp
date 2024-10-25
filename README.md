# YelpCamp

YelpCamp is a web application that allows users to view, create, update, and delete campgrounds. It uses **Node.js**, **Express**, **MongoDB**, and **EJS** to provide dynamic functionality and render HTML views. This project demonstrates the use of CRUD operations, routing, and database integration in a web application.

## Features

- View a list of campgrounds
- Add a new campground
- Edit an existing campground
- Delete a campground
- View details of each campground
- Seed the database with sample campgrounds using real city data

## Tech Stack

- **Node.js**: JavaScript runtime
- **Express.js**: Web framework for Node.js
- **MongoDB**: NoSQL database for data storage
- **Mongoose**: ODM for MongoDB
- **EJS**: Templating engine for rendering dynamic HTML pages
- **Method-Override**: Middleware to use HTTP verbs such as PUT and DELETE in forms
- **Body-Parser**: Middleware to parse incoming request bodies

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/yelpcamp.git
    ```

2. Navigate into the project directory:

    ```bash
    cd yelpcamp
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

4. Ensure you have MongoDB running locally or use a MongoDB cloud service such as MongoDB Atlas.

5. Seed the database (optional, but recommended):

    ```bash
    node seeds/index.js
    ```

6. Run the application:

    ```bash
    node app.js
    ```

7. Open your browser and navigate to `http://localhost:3000` to use the app.

## Project Structure

```bash
yelpcamp/
├── models/
│   └── campground.js   # Mongoose schema for campgrounds
├── public/             # Static assets (CSS, images, etc.)
├── seeds/
│   ├── cities.js       # Sample city data for seeding campgrounds
│   ├── index.js        # Main seed file to populate the database
│   └── seedHelpers.js  # Descriptors and place names for generating random camp titles
├── views/
│   ├── home.ejs        # View for displaying all campgrounds
│   ├── new.ejs         # Form for creating a new campground
│   ├── show.ejs        # View for displaying a single campground's details
│   └── edit.ejs        # Form for editing a campground
├── app.js              # Main application file
└── README.md           # Project documentation

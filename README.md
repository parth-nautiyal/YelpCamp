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

# Project Structure

This project, **YelpCamp**, is organized as follows:

```
YelpCamp
├── models
│   └── campground.js
├── node_modules
├── seeds
│   ├── cities.js
│   ├── index.js
│   └── seedHelpers.js
├── views
│   ├── layouts
│   ├── partials
│   ├── edit.ejs
│   ├── home.ejs
│   ├── new.ejs
│   └── show.ejs
├── .gitignore
├── app.js
├── package-lock.json
├── package.json
└── README.md
```

### Description of Important Files and Folders

- **models/**: Contains data models, such as `campground.js`, which defines the campground schema.
- **seeds/**: Holds seeding scripts, including `cities.js`, `index.js`, and `seedHelpers.js` for populating the database with initial data.
- **views/**: Contains the views rendered by the application. Organized into `layouts`, `partials`, and other EJS templates like `edit.ejs`, `home.ejs`, `new.ejs`, and `show.ejs`.
- **app.js**: The main application file where the server is set up and routes are defined.
- **package.json**: Lists dependencies and scripts required for the project.
- **.gitignore**: Specifies files and directories to be ignored by Git, such as `node_modules/`.

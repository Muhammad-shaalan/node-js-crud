# Courses crud in node js, express, mongodb

- I create courses crud using node js & Express.
- I use express validator to validate request body
- I use mongodb to store courses
- I use mongoose

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)

## Installation

1. Clone the repository:

   ```shell
   git clone https://github.com/Muhammad-shaalan/node-js-crud.git

2. Install the dependencies:
    ```shell
    cd nodejs-mongo-crud
    npm install

3.  Setup the environment variables:
    - Create a .env file in the project root.
    - Define the required variables in the .env file. For example:

    ```shell
    PORT=3000
    MONGODB_URI=mongodb://localhost:27017/your-database

## Usage

1. Start the development server:

    ```shell
    npm run dev

2. Open your web browser and navigate to http://localhost:3000 to access the application.

## API Endpoints

1. GET /api/courses?page=1&limit=2: Get a list of all courses.
2. POST /api/courses: Create a new course.
3. GET /api/courses/:id: Get details of a specific course.
4. PATCH /api/courses/:id: Update a specific course.
5. DELETE /api/courses/:id: Delete a specific course.


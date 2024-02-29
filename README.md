# Server API Documentation

## Introduction
This document provides guidelines on how to use the APIs provided by the server.

## Prerequisites
- Node.js installed on your machine.
- Basic knowledge of JavaScript and HTTP requests.

## Setup
1. Clone the repository containing the server code.
2. Install dependencies by running the following command in the terminal:
    ```
    npm install
    ```
3. Create a `.env` file in the root directory of the project and add necessary environment variables. Example:
    ```
    // .env
    MONGO_URI= mongo uri
    DB_PASSWORD=mypassword
    SECRET_KEY= jwt key
    ```
   Replace `localhost`, `myuser`, `mypassword`, and `mydatabase` with your actual database configuration.

## Running the Server
To start the server, run the following command:
```bash
npm start
```
# Authentication API Documentation

## User Model

### Fields
- `username`: String (required, unique)
- `rollNumber`: String (required, unique)
- `email`: String (required, unique)
- `password`: String (required)
- `job`: String (optional)
- `postedJobs`: Array of ObjectIds referencing 'psJobs'
- `appliedJobs`: Array of ObjectIds referencing 'apJobs'
- `postedEvents`: Array of ObjectIds referencing 'psEvents'
- `volunteered`: Array of ObjectIds referencing 'vol'
- `profilePicture`: String (default: "")

## Auth Routes

### Register User

- **URL:** `/api/auth/register`
- **Method:** `POST`
- **Description:** Registers a new user.
- **Request Body:** JSON object with `username`, `email`, `rollNumber`, and `password` fields.
    ```json
    {
        "username": "example_user",
        "email": "user@example.com",
        "rollNumber": "12345",
        "password": "example_password"
    }
    ```
- **Response:** 
    - `200 OK` on successful registration. Response contains the registered user object.
    - `500 Internal Server Error` if registration fails.

### Login

- **URL:** `/api/auth/login`
- **Method:** `POST`
- **Description:** Logs in an existing user.
- **Request Body:** JSON object with `email` and `password` fields.
    ```json
    {
        "email": "user@example.com",
        "password": "example_password"
    }
    ```
- **Response:** 
    - `200 OK` on successful login. Response contains user details and authentication token.
    - `404 Not Found` if user with the provided email does not exist.
    - `400 Bad Request` if password is incorrect.
    - `500 Internal Server Error` if login fails.

# Job Posting API Documentation

## Job Model

### Fields
- `title`: String (required)
- `company`: String (required)
- `companyLogo`: String (optional)
- `location`: String (required)
- `salary`: Number (optional)
- `description`: String (required)
- `createdAt`: Date (default: current date)
- `createdBy`: ObjectId referencing 'User' model
- `applicants`: Array of ObjectIds referencing 'User' model

## Job Routes

### Post Job

- **URL:** `/api/job/post`
- **Method:** `POST`
- **Description:** Posts a new job.
- **Authorization:** Required. Include the authentication token in the request headers.
    ```plaintext
    Authorization: Bearer <token>
    ```
- **Request Body:** JSON object with job details.
    ```json
    {
        "title": "Software Engineer",
        "company": "Example Inc.",
        "location": "New York",
        "salary": 100000,
        "description": "This is a description of the job."
    }
    ```
- **Response:** 
    - `200 OK` on successful job posting. Response contains the posted job object.
    - `500 Internal Server Error` if posting fails.

### Get All Jobs

- **URL:** `/api/job/get/jobs`
- **Method:** `GET`
- **Description:** Retrieves all posted jobs.
- **Response:** 
    - `200 OK` on success. Response contains an array of job objects.
    - `500 Internal Server Error` if retrieval fails.

### Get Job by ID

- **URL:** `/api/job/get/:id`
- **Method:** `GET`
- **Description:** Retrieves a job by its ID.
- **Response:** 
    - `200 OK` on success. Response contains the job object.
    - `500 Internal Server Error` if retrieval fails.

### Apply for Job

- **URL:** `/api/job/apply/:id`
- **Method:** `POST`
- **Description:** Allows a user to apply for a job.
- **Authorization:** Required. Include the authentication token in the request headers.
    ```plaintext
    Authorization: Bearer <token>
    ```
- **Request Parameters:** `id` - Job ID
- **Response:** 
    - `200 OK` on successful application.
    - `400 Bad Request` if user has already applied for the job.
    - `500 Internal Server Error` if application fails.

### Get Applied Jobs by User

- **URL:** `/api/job/get/applied/jobs`
- **Method:** `GET`
- **Description:** Retrieves all jobs applied by the authenticated user.
- **Authorization:** Required. Include the authentication token in the request headers.
    ```plaintext
    Authorization: Bearer <token>
    ```
- **Response:** 
    - `200 OK` on success. Response contains an array of job objects.
    - `500 Internal Server Error` if retrieval fails.

### Get Applicants for a Job

- **URL:** `/api/job/get/applicants/:id`
- **Method:** `GET`
- **Description:** Retrieves all applicants for a specific job.
- **Authorization:** Required. Include the authentication token in the request headers.
    ```plaintext
    Authorization: Bearer <token>
    ```
- **Request Parameters:** `id` - Job ID
- **Response:** 
    - `200 OK` on success. Response contains an array of user objects (applicants).
    - `500 Internal Server Error` if retrieval fails.

## Note
Ensure that you have properly set up environment variables, including `SECRET_KEY`, for JWT token generation and verification.

# Event Management API Documentation

## Event Model

### Fields
- `title`: String (required)
- `location`: String (required)
- `date`: Date (required)
- `speaker`: String (required)
- `volunteers`: ObjectId referencing 'vol' model
- `postedBy`: String (required)

## Event Routes

### Post Event

- **URL:** `/api/event/post`
- **Method:** `POST`
- **Description:** Posts a new event.
- **Authorization:** Required. Include the authentication token in the request headers.
    ```plaintext
    Authorization: Bearer <token>
    ```
- **Request Body:** JSON object with event details.
    ```json
    {
        "title": "Example Event",
        "location": "Example Location",
        "date": "2024-03-01T18:00:00.000Z",
        "speaker": "Example Speaker",
        "createdBy": "user_id"
    }
    ```
- **Response:** 
    - `200 OK` on successful event posting. Response contains the posted event object.
    - `500 Internal Server Error` if posting fails.

### Participate in Event

- **URL:** `/api/event/apply/:id`
- **Method:** `POST`
- **Description:** Allows a user to volunteer for an event.
- **Authorization:** Required. Include the authentication token in the request headers.
    ```plaintext
    Authorization: Bearer <token>
    ```
- **Request Parameters:** `id` - Event ID
- **Request Body:** JSON object with user details.
    ```json
    {
        "name": "John Doe",
        "email": "john@example.com",
        "phNo": "1234567890",
        "description": "I want to volunteer for this event",
        "userId": "user_id"
    }
    ```
- **Response:** 
    - `200 OK` on successful volunteering.
    - `201 Created` if the user has already volunteered for the event.
    - `500 Internal Server Error` if volunteering fails.

### Get All Events

- **URL:** `/api/events`
- **Method:** `GET`
- **Description:** Retrieves all posted events.
- **Authorization:** Required. Include the authentication token in the request headers.
    ```plaintext
    Authorization: Bearer <token>
    ```
- **Response:** 
    - `200 OK` on success. Response contains an array of event objects.
    - `500 Internal Server Error` if retrieval fails.

## Note
Ensure that you have properly set up environment variables and authentication middleware for JWT token handling.


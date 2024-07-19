# Candidate Management Platform
Full Stack - Code Challenge
## Overview

This project implements a web-based platform for managing candidates throughout the recruitment process. It is built using Django for the backend and Django REST Framework (DRF) for creating a RESTful API. The frontend is developed using React.

## Main Decisions

1. **Use of SQLite**:
    - SQLite was chosen as the database for this project primarily due to the short development timeframe. It provides a simple and fast setup, which is ideal for quick development and testing. However, SQLite is not recommended for production environments due to its limitations with concurrent write operations and scalability.
    - In a production scenario, PostgreSQL or a similar robust database would be used to ensure data integrity, performance, and scalability.

2. **Django REST Framework**:
    - DRF was used to quickly set up the API with features such as serialization, authentication, and viewsets. This framework provides a powerful and flexible toolkit for building Web APIs in Django.

3. **Token-Based Authentication**:
    - JWT (JSON Web Tokens) were implemented for secure user authentication. This approach ensures that only authenticated users can access and manipulate the data.

4. **Docker for Containerization**:
    - Docker was used to containerize the application, making it easier to deploy across different environments. This ensures consistency between development and production setups.

## Models

### Client
Represents a client in the system.
- **Fields**: `id`, `name`

### Recruiter
Represents a recruiter in the system.
- **Fields**: `id`, `name`

### Job
Represents a job position offered by a client.
- **Fields**: `id`, `title`, `client`, `description`, `requirements`

### Candidate
Represents a candidate applying for a job.
- **Fields**: `id`, `name`, `job`, `recruiter`, `status`, `birth_date`, `years_of_experience`

## Endpoints

### Authentication

- **Obtain Token**: `POST /api/token/`
    - **Request Body**:
      ```json
      {
        "username": "your_username",
        "password": "your_password"
      }
      ```
    - **Response**:
      ```json
      {
        "access": "your_access_token",
        "refresh": "your_refresh_token"
      }
      ```

- **Refresh Token**: `POST /api/token/refresh/`
    - **Request Body**:
      ```json
      {
        "refresh": "your_refresh_token"
      }
      ```
    - **Response**:
      ```json
      {
        "access": "your_new_access_token"
      }
      ```

### Clients

- **List Clients**: `GET /api/clients/`
- **Create Client**: `POST /api/clients/`
    - **Request Body**:
      ```json
      {
        "name": "Client Name"
      }
      ```
- **Retrieve Client**: `GET /api/clients/{id}/`
- **Update Client**: `PUT /api/clients/{id}/`
- **Delete Client**: `DELETE /api/clients/{id}/`

### Recruiters

- **List Recruiters**: `GET /api/recruiters/`
- **Create Recruiter**: `POST /api/recruiters/`
    - **Request Body**:
      ```json
      {
        "name": "Recruiter Name"
      }
      ```
- **Retrieve Recruiter**: `GET /api/recruiters/{id}/`
- **Update Recruiter**: `PUT /api/recruiters/{id}/`
- **Delete Recruiter**: `DELETE /api/recruiters/{id}/`

### Jobs

- **List Jobs**: `GET /api/jobs/`
- **Create Job**: `POST /api/jobs/`
    - **Request Body**:
      ```json
      {
        "title": "Job Title",
        "client": 1,
        "description": "Job Description",
        "requirements": "Job Requirements"
      }
      ```
- **Retrieve Job**: `GET /api/jobs/{id}/`
- **Update Job**: `PUT /api/jobs/{id}/`
- **Delete Job**: `DELETE /api/jobs/{id}/`

### Candidates

- **List Candidates**: `GET /api/candidates/`
- **Create Candidate**: `POST /api/candidates/`
    - **Request Body**:
      ```json
      {
        "name": "Candidate Name",
        "job": 1,
        "recruiter": 1,
        "status": "active",
        "birth_date": "1990-01-01",
        "years_of_experience": 5
      }
      ```
- **Retrieve Candidate**: `GET /api/candidates/{id}/`
- **Update Candidate**: `PUT /api/candidates/{id}/`
- **Delete Candidate**: `DELETE /api/candidates/{id}/`

### Metrics

- **Get Metrics**: `GET /api/candidates/metrics/`
    - **Response**:
      ```json
      {
        "open_jobs": 10,
        "active_candidates": 5,
        "disqualified_candidates": 3,
        "hired_candidates": 2
      }
      ```

## Running the Project

### Using Docker

1. **Build and Run the Docker Containers**:
    ```bash
    sudo docker-compose up --build
    ```

2. **Apply Migrations**:
    ```bash
    sudo docker-compose exec cman_api python manage.py migrate
    ```

3. **Create a Superuser**:
    ```bash
    sudo docker-compose exec cman_api python manage.py createsuperuser
    ```

### Without Docker

1. **Install Dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

2. **Apply Migrations**:
    ```bash
    python manage.py migrate
    ```

3. **Run the Development Server**:
    ```bash
    python manage.py runserver
    ```

4. **Create a Superuser**:
    ```bash
    python manage.py createsuperuser
    ```


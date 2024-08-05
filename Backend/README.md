# API Documentation

## Introduction

This project provides an API for accessing neighborhood data.

## Prerequisites

- **Node.js** (Ensure Node.js is installed on your machine)
- **npm** (Node Package Manager)
- **MongoDB** (Ensure MongoDB is running locally or accessible in the cloud)

## Endpoints

- **GET /neighborhoods** - Get all neighborhoods with filters
  - **Responses**:
    - **200 OK**: Successfully retrieved data.
    - **400 Bad Request**: Invalid request parameters.
    - **500 Internal Server Error**: Error retrieving data.

## Response Example

```json
[
  {
    "neigborhood": "Hallows",
    "city": "Los Dos Caminos",
    "averageAge": 58,
    "distanceFromCityCenter": 43.5,
    "averageIncome": 44438,
    "publicTransportAvailability": "high",
    "latitude": 10.4980067,
    "longitude": -66.8335096
  },
  {
    "neigborhood": "Stang",
    "state": "B7",
    "city": "Angoulême",
    "averageAge": 20,
    "distanceFromCityCenter": 66.1,
    "averageIncome": 92866,
    "publicTransportAvailability": "low",
    "latitude": 45.6258385,
    "longitude": 0.0629891
  }
] 
```

## Setup

### Install Dependencies

To install the required npm packages, run:

```bash
npm install
```

To run the server, run:

```bash
npm run dev
```

## MongoDB Setup

Start MongoDB server by running the following command:

 ```
    mongod
 ```
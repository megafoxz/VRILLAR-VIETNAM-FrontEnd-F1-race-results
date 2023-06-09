# VRILLAR-VIETNAM-FrontEnd-F1-race-results

This project is a assignment project to apply for front-end developer position at VRILLAR . It contains different directories for organizing the source code.

## Project Structure

The project follows the following directory structure:

```
API
│ index,js
UI
│ src
  ├── assets
  │ ├── svg
  │ └── images
  ├── components
  ├── routes
  ├── services
  ├── layouts
  └── plugins
  │ ├── constants
  │ ├── httpclients
  │ ├── helper
  └── views
```

### API

The API is developed in Node.js and is responsible for scraping data from the [Formula 1 results page](https://www.formula1.com/en/results.html/2023/races.html). It provides two main endpoints:

1. `/race`: Returns data about individual races.
2. `/locations`: Returns data about the different race locations.

### UI

The UI is developed using React and TypeScript. It organizes its source code in the following directories:

- `assets`: Contains various static resources used in the application, such as SVG files and images.
- `components`: Contains all the React components used throughout the application.
- `routes`: Handles the routing logic for the application.
- `services`: Contains files for interacting with external services (like the API).
- `layouts`: Contains layout components used to create the page structure.
- `plugins`: Contains utility code, constants, and the HTTP client configuration for making requests.
- `views`: Contains the main page components (or "views") of the application.

## Installation

### API

1. Navigate to the API directory in your terminal.
2. Run `npm install` to install the dependencies.
3. Run `npm run start` to start the API server.

### UI

1. Navigate to the UI directory in your terminal.
2. Run `npm install` to install the dependencies.
3. Run `npm run start` to start the React application.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

**CAUTION**: Please ensure to start the API before running the UI. Both the API and UI need to be running simultaneously for the application to function correctly.

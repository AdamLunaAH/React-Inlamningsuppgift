# Music Info React App

This is a React-based web application that provides information about music groups, albums, and artists. The app allows users to browse music groups, view detailed information about specific groups, and explore related albums and artists.

## Features

- **Home Page**: Displays an overview of the music database, including the number of music groups, albums, and artists.
- **Music Groups**: Lists all music groups with search and pagination functionality.
- **Group Info**: Shows detailed information about a specific music group, including its members and albums.
- **Dark/Light Mode**: Supports theme switching between light, dark, and auto modes based on system preferences.
- **Responsive Design**: Built with Bootstrap for a mobile-friendly and responsive user interface.

## Technologies Used

- **React**: For building the user interface.
- **React Router**: For client-side routing.
- **Bootstrap**: For styling and responsive design.
- **React-Bootstrap**: For integrating Bootstrap components with React.
- **Web API**: Fetches data from a remote API for music groups, albums, and artists.
- **Context API**: Manages theme switching across the app.

## Project Structure
```bash
music-info-react/
├── public/ # Static assets (HTML, icons, etc.)
├── src/ # Source code
│ ├── app/ # Main layout and routing
│ ├── music-info/ # Components, pages, and styles for the app
│ ├── services/ # API service classes
│ ├── utils/ # Utility functions and context
│ ├── index.js # Entry point for the React app
│ ├── App.js # Main app component
│ ├── App.css # Global styles
│ └── setupTests.js # Test setup
├── package.json # Project dependencies and scripts
└── README.md # Project documentation
```

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd music-info-react

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm start
    ```
4. Open the app in your browser at http://localhost:3000.


## Scripts
- npm start: Runs the app in development mode.
- npm run build: Builds the app for production.
- npm test: Runs the test suite.
- npm run eject: Ejects the app configuration (use with caution).

## Folder Structure
The project follows a modular structure with separate folders for components, pages, services, and utilities.

## API Integration
The app integrates with a Web API hosted at https://seido-webservice-307d89e1f16a.azurewebsites.net/api. The API provides endpoints for fetching music groups, albums, and artists.

## Theme Switching
The app supports light, dark, and auto themes. The theme can be toggled using the button in the bottom-right corner of the app. The selected theme is saved in localStorage and applied across sessions.
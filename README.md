# Address Tracker

## Project Structure

```plaintext
/vue-address-tracker
│
├── /node_modules              # Installed dependencies
├── /public                    # Static assets
│
├── /src                       # Source code
│   ├── /assets                # Static resources like images and fonts and styles
│   ├── /components            # Reusable Vue components
│   ├── /views                 # Pages of the application
│   ├── /router                # Vue Router configuration
│   ├── App.vue                # Main Vue component
│   └── main.js                # Entry point for the Vue app
│
├── /package.json              # Project metadata and dependencies
├── /vite.config.js            # Vite configuration
├── index.html                 # Main HTML file
├── /.env                      # Environment variables for API tokens
└── /README.md                 # This file
```

## Technologies Used

- **Vue.js**: JavaScript framework for building user interfaces.
- **Vite**: Fast build tool for modern web development.
- **Mapbox**: Mapping and location-based services.
- **Axios**: HTTP client for making requests to APIs.

## Overview

This project is a Vue.js application that allows users to select an address and track it via an interactive map. It provides a form for users to enter their address, and it tracks and stores the location using Mapbox. The app allows users to view and submit address information, including GPS coordinates.

## Features

- **Map Integration**: Users can interact with the map to select a location.
- **Address Form**: Users can fill in their address details and submit them.
- **Location Tracking**: The app fetches the user's current GPS location and places a marker on the map.
- **Submit Data**: The address, along with the selected coordinates, is sent to the server for storage.
- **Error Handling**: Displays messages for loading, success, or failure.

## Setup

### Requirements

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/Saro-jafari/vuejs-address-tracker.git
   ```

2. Navigate into the project directory:

   ```bash
   cd my-project
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root of the project and define the following environment variables:

   - `VITE_MAPBOX_ACCESS_TOKEN`: Your Mapbox Access Token.
   - `VITE_APP_API_TOKEN`: Your API Token for data submission.

   Example:

   ```bash
   VITE_MAPBOX_ACCESS_TOKEN=your-mapbox-access-token
   VITE_APP_API_TOKEN=your-api-token
   ```

   You can obtain a Mapbox Access Token by signing up at [Mapbox](https://www.mapbox.com/).

5. Run the development server:

   ```bash
   npm run dev
   ```

   The application will be available at [http://localhost:5173](http://localhost:5173).

### Sample JSON Data

If you do not have a valid API token, you can use sample JSON data to simulate the server's response. Here's an example of what the data might look like:

```json
[
	{
		"id": 660546,
		"address_id": "1573888c-d5cd-4449-aca9-4a8bd185fed2",
		"region": {
			"id": 1,
			"name": "لویزان  -  شیان",
			"city_object": {
				"city_id": 333,
				"city_name": "تهران"
			},
			"state_object": {
				"state_id": 8,
				"state_name": "تهران"
			}
		},
		"address": "Entered by the user",
		"last_name": "اکانت",
		"first_name": "تست",
		"gender": "",
		"lat": 0,
		"lng": 0,
		"coordinate_mobile": " ",
		"coordinate_phone_number": ""
	}
]
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

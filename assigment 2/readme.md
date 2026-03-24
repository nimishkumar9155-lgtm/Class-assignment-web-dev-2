# Async Weather Tracker 🌤️

A dynamic, real-time **Weather Tracking Application** that leverages asynchronous JavaScript to fetch global weather data. This app provides a seamless user experience by integrating geocoding and meteorological APIs to deliver precise local conditions.

---

## 🚀 Key Features

* **Global City Search**: Enter any city name to retrieve instantaneous weather data via the Open-Meteo Geocoding API.
* **Comprehensive Metrics**: Displays essential weather information including:
* Current Temperature (with units)
* Weather Conditions (e.g., "Clear sky", "Partly cloudy")
* Average Hourly Humidity
* Wind Speed


* **Persistent Search History**: Saves your previous searches to `localStorage` so they persist even after refreshing the page.
* **Interactive History**: Quick-access tags in the history section allow you to re-fetch weather data for a city with a single click.
* **Fully Responsive**: Optimized for all devices using CSS Flexbox, Grid, and Media Queries for seamless mobile and desktop viewing.

---

## 🛠️ Technology Stack

* **Frontend**: HTML5, CSS3 (Custom properties, Media Queries)
* **Logic**: Vanilla JavaScript (ES6+)
* **APIs**:
* [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api) for coordinate lookup.
* [Open-Meteo Weather Forecast API](https://open-meteo.com/en/docs) for meteorological data.


* **Data**: Custom `weather_code.json` mapping for interpreting WMO Weather interpretation codes.

---

## 📂 Project Architecture

* `index.html`: The structural foundation, featuring a split-pane layout for search/history and results.
* `style.css`: Implements a modern "Cornflower Blue" and "Orange" aesthetic with smooth scale transitions on hover.
* `logic.js`: The engine of the app. It handles:
* **Asynchronous Flow**: Uses `async/await` to manage sequential API calls (City $\rightarrow$ Coordinates $\rightarrow$ Weather).
* **Data Processing**: Calculates average humidity from hourly arrays using `.reduce()`.
* **DOM Manipulation**: Dynamically generates "Info Strips" to display weather details.


* `weather_code.json`: A lookup table that translates numerical API codes into human-readable strings (e.g., `45` $\rightarrow$ "Fog").

---

## 🔧 Technical Highlight: The Data Flow

The application follows a specific asynchronous pipeline to ensure data accuracy:

1. **Geocoding**: The app first converts the string input (City Name) into geographical coordinates.
2. **Weather Fetch**: Coordinates are passed into the forecast API to retrieve a JSON object containing current and hourly metrics.
3. **Code Translation**: The `weathercode` from the API is matched against the local `weather_code.json` file.
4. **LocalStorage**: The city name is validated and pushed into a local array to update the "Search History" UI.

---

## 🕹️ Getting Started

1. Clone the repository or download the source files.
2. Ensure `weather_code.json` is in the same directory as `logic.js`.
3. Open `index.html` in a web browser.
4. Type a city name (e.g., "London" or "Tokyo") and hit **Search**.

---



document.addEventListener("DOMContentLoaded", function () {
    const apiKey = "319a0731801ce06e0467be7b96aa8002";
    const searchButton = document.getElementById("searchButton");
    const getLocationButton = document.getElementById("getLocationButton");
    searchButton.addEventListener("click", function () {
        const cityInput = document.getElementById("cityInput").value;
        if (cityInput) {
            fetchWeatherData(apiKey, cityInput);
        }
    });

    getLocationButton.addEventListener("click", () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(position => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

                fetch(apiUrl)
                    .then(response => response.json())
                    .then(data => {
                        displayWeatherData(data);
                    })
                    .catch(error => {
                        console.error("Error fetching weather data:", error);
                    });
            });
        } else {
            console.error("Geolocation is not supported in this browser.");
        }
    });

    function fetchWeatherData(apiKey, city) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                displayWeatherData(data);
            })
            .catch(error => {
                console.error("Error fetching weather data:", error);
            });
    }

    function displayWeatherData(data) {
        const weatherInfo = document.getElementById("weatherInfo");
        const cityName = document.getElementById("cityName");
        const description = document.getElementById("description");
        const temperature = document.getElementById("temperature");
        const minTemperature = document.getElementById("minTemperature");
        const maxTemperature = document.getElementById("maxTemperature");
        const humidity = document.getElementById("humidity");
        const pressure = document.getElementById("pressure");

        if (data) {
            cityName.textContent = data.name + ", " + data.sys.country;
            description.textContent = data.weather[0].description;
            temperature.textContent = data.main.temp + "°C";
            minTemperature.textContent = data.main.temp_min + "°C";
            maxTemperature.textContent = data.main.temp_max + "°C";
            humidity.textContent = data.main.humidity + "%";
            pressure.textContent = data.main.pressure + " hPa";

            weatherInfo.classList.remove("hidden");
        } else {
            weatherInfo.classList.add("hidden");
        }
    }
});

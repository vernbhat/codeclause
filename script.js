document.addEventListener("DOMContentLoaded", function () {
  const apiKey = "cc9dae8876c115616739269a4a0c6db1";
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
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

        fetch(apiUrl)
          .then((response) => response.json())
          .then((data) => {
            displayWeatherData(data);
          })
          .catch((error) => {
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
      .then((response) => response.json())
      .then((data) => {
        displayWeatherData(data);
      })
      .catch((error) => {
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

    const weatherIcons = {
      "01d": "fas fa-sun",
      "01n": "fas fa-moon",
      "02d": "fas fa-cloud-sun",
      "02n": "fas fa-cloud-moon",
      "03d": "fas fa-cloud",
      "03n": "fas fa-cloud",
      "04d": "fas fa-cloud",
      "04n": "fas fa-cloud",
      "09d": "fas fa-cloud-showers-heavy",
      "09n": "fas fa-cloud-showers-heavy",
      "10d": "fas fa-cloud-sun-rain",
      "10n": "fas fa-cloud-moon-rain",
      "11d": "fas fa-bolt",
      "11n": "fas fa-bolt",
      "13d": "fas fa-snowflake",
      "13n": "fas fa-snowflake",
      "50d": "fas fa-smog",
      "50n": "fas fa-smog",
    };

    if (data) {
      cityName.textContent = data.name + ", " + data.sys.country;

      const words = data.weather[0].description.split(" ");
      const formattedWords = words.map((word) => {
        const capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1);
        return `<span style="color: #73282b;">${capitalizedWord}</span>`;
      });
      const formattedDescription = formattedWords.join(" ");
      description.innerHTML = " "+ formattedDescription;

      temperature.textContent = data.main.temp;
      minTemperature.textContent = data.main.temp_min;
      maxTemperature.textContent = data.main.temp_max;
      humidity.textContent = data.main.humidity;
      pressure.textContent = data.main.pressure;

      const weatherIcon = document.createElement("i");
      const iconCode = data.weather[0].icon;
      weatherIcon.className = weatherIcons[iconCode] || "fas fa-question";
      description.insertBefore(weatherIcon, description.firstChild);

      weatherInfo.classList.remove("hidden");
    } else {
      weatherInfo.classList.add("hidden");
    }
  }
});

particlesJS("particles-js", {
    particles: {
      number: {
        value: 50, 
      },
      color: {
        value: "#e3f9fa", 
      },
      shape: {
        type: "circle", 
      },
      size: {
        value: 4, 
      },
      move: {
        enable: true, 
        speed: 8, 
      },
      interactivity: {
        events: {
          onhover: {
            enable: true,
            mode: "repulse",
          },
        },
      },
      line_linked: {
        enable: true,
        color: "#5bd7fc", 
        opacity: 0.5,
        width: 2, 
      },
    },
  });
  

const apiKey = import.meta.env.VITE_API_KEY;
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const cityDis = document.querySelector(".city");
const weatherIcon = document.querySelector(".change i");

// tes
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

async function checkWeather(city) {
  try {
    const config = {
      headers: {
        Accept: "application/json",
      },
    };

    const res = await axios.get(`${apiUrl}${city}&appid=${apiKey}`, config);

    const data = res.data;
    if (cityDis && weatherIcon) {
      cityDis.innerHTML = data.name;

      document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "℃";
      document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
      document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

      // * Clear previous weather icon classes
      defaultClass();

      // * change the weather icon
      let changeIcon = data.weather[0].main;

      switch (changeIcon) {
        case "Clouds":
          weatherIcon.classList.add("bi-clouds");
          break;
        case "Clear":
          weatherIcon.classList.add("bi-brightness-high");
          break;
        case "Rain":
          weatherIcon.classList.add("bi-cloud-rain-heavy");
          break;
        case "Drizzle":
          weatherIcon.classList.add("bi-cloud-drizzle");
          break;
        case "Mist":
          weatherIcon.classList.add("bi-cloud-sun");
          break;
        default:
          weatherIcon.classList.add("bi-question-circle");
          break;
      }
    }
  } catch (error) {
    console.error("An error occurred:", error);
    if (cityDis && weatherIcon) {
      cityDis.innerHTML = "Error! City not found.";
      defaultClass();
      weatherIcon.classList.add("bi-ban");
    }
  }
}

function defaultClass() {
  weatherIcon.className = "weather-icon bi d-flex justify-content-center mt-4";
}

searchBtn.addEventListener("click", () => {
  if (searchBox.value !== "") {
    cityDis.innerHTML = "Getting the data...";
    checkWeather(searchBox.value);
  }
});

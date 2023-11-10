document.addEventListener("DOMContentLoaded", () => {
  const apiKey = "fc44c39f99d707ec51ede5ba9f122fc5";
  const apiUrl = "https://api.openweathermap.org/data/2.5/weather";
  const countryInput = document.getElementById("input");
  const btn = document.querySelector(".btn");
  const output = document.querySelector(".output");

  btn.addEventListener("click", () => {
    const countryName = countryInput.value;
    if (countryName.trim() === "") {
      output.textContent = "Error, enter correct country name";
      return;
    }
    fetchCapital(countryName);
  });

  async function fetchCapital(countryName) {
    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${countryName}`
      );
      const data = await response.json();
      if (response.status === 200) {
        const country = data[0];
        const capital = country.capital[0];
        const langs = Object.values(country.languages).join(", ");
        const currencies = Object.values(country.currencies)
          .map((currency) => currency.name)
          .join(", ");
        const flag = country.flags.png;
        output.innerHTML = `
            <h2>${country.name.common}</h2>
            <p><strong>Capital:</strong> ${capital}</p>
            <p><strong>Languages:</strong> ${langs}</p>
            <p><strong>Currencies:</strong> ${currencies}</p>
            <img src="${flag}" alt="Flag" style="width: 150px;">
          `;
        output.style.lineHeight = "15px";
      } else {
        output.textContent = "Country not found.";
      }
    } catch (error) {
      output.textContent = "Failed to fetch data.";
      console.error("Error fetching data: ", error);
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const apiKey = "fc44c39f99d707ec51ede5ba9f122fc5";
  const apiUrl = "https://api.openweathermap.org/data/2.5/weather";
  const weatherDiv = document.querySelector(".weather_output");
  const btn = document.querySelector(".get_weather_btn");
  const cityInput = document.getElementById("city_input");

  btn.addEventListener("click", () => {
    const city = cityInput.value;
    if (city.trim() === "") {
      weatherDiv.textContent = "Please enter correct city";
      return;
    }
    fetchWeatherData(city);
  });

  async function fetchWeatherData(city) {
    try {
      const response = await fetch(
        `${apiUrl}?q=${city}&appid=${apiKey}&units=metric`
      );
      const data = await response.json();
      if (data.cod === 200) {
        const temperature = data.main.temp;
        const description = data.weather[0].description;
        const cityName = data.name;
        const country = data.sys.country;
        weatherDiv.textContent = `Temperature in ${cityName}, ${country}: ${temperature}°C, ${description}`;
        if (temperature < 6) {
          document.body.style.backgroundImage = "url(./img/winter.jpg)";
        }
        if (temperature >= 6 && temperature < 13) {
          document.body.style.backgroundImage = "url(./img/autumn-light.jpg)";
          const h2 = document.querySelectorAll("h2");
          h2.forEach((element) => {
            element.style.color = "black";
          });
        }
        if (temperature >= 13 && temperature < 26) {
          document.body.style.backgroundImage = "url(./img/spring.jpg)";
        }
        if (temperature >= 26) {
          document.body.style.backgroundImage = "url(./img/summer.jpg)";
        }
      } else {
        weatherDiv.textContent = `The city has no found`;
      }
    } catch (error) {
      weatherDiv.textContent = "Не удалось получить данные о погоде.";
      console.error("Error fetching weather data: ", error);
    }
  }
});

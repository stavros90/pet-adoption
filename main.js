async function getForecast() {
  const weatherPromise = await fetch("https://api.weather.gov/gridpoints/OKX/33,35/forecast")
  const weatherData = await weatherPromise.json()

  const Temp = weatherData.properties.periods[0].temperature;

  document.querySelector("#temperature-output").textContent = Temp;
}

getForecast()
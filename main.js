const template = document.querySelector("#pet-card-template")
const wrapper = document.createDocumentFragment()

async function getForecast() {
  const weatherPromise = await fetch("https://api.weather.gov/gridpoints/OKX/33,35/forecast")
  const weatherData = await weatherPromise.json()

  const Temp = weatherData.properties.periods[0].temperature;

  document.querySelector("#temperature-output").textContent = Temp;
}

getForecast()

async function getPets() {
  const petsPromise = await fetch("https://learnwebcode.github.io/bootcamp-pet-data/pets.json")
  const petsData = await petsPromise.json()

  petsData.forEach(pet => {
    const clone = template.content.cloneNode(true)

    clone.querySelector("h3").textContent = pet.name
    clone.querySelector(".pet-description").textContent = pet.description
    clone.querySelector(".pet-age").textContent = createAgeText(pet.birthYear)

    if (!pet.photo) {
      pet.photo = "images/fallback.jpg"
    }

    clone.querySelector(".pet-card-photo img").src = pet.photo
    clone.querySelector(".pet-card-photo img").alt = `A ${pet.species} called ${pet.name}`

    wrapper.appendChild(clone)
  })

  document.querySelector(".list-of-pets").appendChild(wrapper)
}

getPets()

// Custom login for age
function createAgeText(birthYear) {
  const currentYear = new Date().getFullYear()
  const age = currentYear - birthYear

  if (age == 1) return "1 year old"
  if (age == 0) return "Less than a year old"

  return `${age} years old`
}
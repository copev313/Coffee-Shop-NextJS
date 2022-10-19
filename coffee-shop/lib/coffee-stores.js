const getUrlForCoffeStores = (latLong, query, limit) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`
}

export const fetchCoffeeStores = async () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.FOURSQUARE_API_KEY,
    },
  }

  const response = await fetch(
    getUrlForCoffeStores(
      "41.08138629439725%2C-81.51897139781441",
      "coffee%20shop",
      6
    ),
    options
  )

  const data = await response.json()
  return data.results
}

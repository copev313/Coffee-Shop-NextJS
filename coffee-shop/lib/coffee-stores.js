import { createApi } from "unsplash-js"

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
})

const getUrlForCoffeStores = (latLong, query, limit) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`
}

const getCoffeeStoreImages = async () => {
  // Get photos from Unsplash:
  const photos = await unsplash.search.getPhotos({
    query: "coffee shop",
    page: 1,
    perPage: 30,
  })

  // Pull out image URLs from Unsplash response:
  const unsplashResults = photos.response.results
  return unsplashResults.map((result) => result.urls["small"])
}

export const fetchCoffeeStores = async () => {
  const photos = await getCoffeeStoreImages()
  // Create an options object for the Foursquare fetch request:
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.FOURSQUARE_API_KEY,
    },
  }

  // Get coffee stores from Foursquare:
  const response = await fetch(
    getUrlForCoffeStores(
      "41.08138629439725%2C-81.51897139781441",
      "coffee%20shop",
      6
    ),
    options
  )

  // Pull out and return our FourSquare data:
  const data = await response.json()
  return data.results.map((result, i) => {
    const neighborhood = result.location.neighborhood || []
    return {
      id: result.fsq_id,
      name: result.name,
      address: result.location.address,
      neighborhood: neighborhood.length > 0 ? neighborhood[0] : "",
      // Photos is an array, so we can loop here:
      imgUrl: photos.length > 0 ? photos[i] : null,
    }
  })
}

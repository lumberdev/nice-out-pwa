export const fetchSearchLocations = async (searchTerm: string | null) => {
  const result = await fetch(`/api/locationSearch?searchTerm=${searchTerm}`)
    .then((response) => {
      return response.json()
    })
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.log(error)
    })
  return result
}

export const fetchLocationCoordinates = async (id: string | null) => {
  const result = await fetch(`/api/locationCoordinates?id=${id}`)
    .then((response) => {
      return response.json()
    })
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.log(error)
    })
  return result
}

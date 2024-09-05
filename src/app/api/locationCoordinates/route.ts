import { HttpError } from '@/utils/httpError'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const googleLocationID = searchParams.get('id')

    if (!process.env.GOOGLE_API)
      throw new HttpError('Missing Open Weather Credentials', 400)

    const fetchCoords = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?place_id=${locationId}&key=${process.env.GOOGLE_API}`,
    )
      .then((response) => {
        return response.json()
      })
      .then((res) => res.results[0])
      .catch((error) => {
        console.log(error)
      })

    const { geometry, address_components } = fetchCoords
    const cityName = address_components.find(
      (component: { types: string | string[] }) => {
        return component.types.includes('locality')
      },
    )?.long_name
    const subLocalityName = address_components.find(
      (component: { types: string | string[] }) => {
        return component.types.includes('sublocality')
      },
    )?.long_name
    const coords = {
      latitude: geometry.location.lat,
      longitude: geometry.location.lng,
    }
    const data = {
      coords,
      name: cityName || subLocalityName,
      googleLocationID,
      isCurrentlocation: false,
    }

    // // return the data to your front end
    return Response.json(data, { status: 200 })
  } catch (error) {
    let errorMessage = 'An unknown error occurred'
    let status = 500

    if (error instanceof HttpError) {
      errorMessage = error.message
      status = error.status
    } else if (error instanceof Error) {
      errorMessage = error.message
    }

    return new Response(JSON.stringify({ error: errorMessage }), { status })
  }
}

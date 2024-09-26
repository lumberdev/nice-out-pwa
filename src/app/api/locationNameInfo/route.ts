import { HttpError } from '@/utils/httpError'
var tzlookup = require('tz-lookup')

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const lat = searchParams.get('lat')
    const lon = searchParams.get('lon')
    if (!process.env.PRIVATE_KEY)
      throw new HttpError('Missing Open Weather Credentials', 400)

    if (!lat || !lon) throw new HttpError('Missing Coordinates', 400)

    const url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${process.env.OPEN_WEATHER_MAP_API_KEY}`

    // get the data
    const response = await fetch(url, {
      method: 'GET',
    })

    if (!response.ok) {
      throw new HttpError(response.statusText, response.status)
    }

    // get the JSON data
    const data = await response.json()
    let locationTimeZone = ''
    try {
      locationTimeZone = tzlookup(Number(lat), Number(lon))
    } catch (err) {
      console.log(err)
      locationTimeZone = 'Etc/GMT'
    }

    data[0]['timeZone'] = locationTimeZone

    // // return the data to your front end
    return Response.json(data[0], { status: 200 })
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

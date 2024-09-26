import { HttpError } from '@/utils/httpError'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const searchTerm = searchParams.get('searchTerm')

    if (!process.env.GOOGLE_API)
      throw new HttpError('Missing Open Weather Credentials', 400)

    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${searchTerm}&types=locality|postal_code|sublocality&key=${process.env.GOOGLE_API}`

    // get the data
    const response = await fetch(url, {
      method: 'GET',
    })

    if (!response.ok) {
      throw new HttpError(response.statusText, response.status)
    }

    // get the JSON data
    const data = await response.json()

    // // return the data to your front end
    return Response.json(data.predictions, { status: 200 })
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

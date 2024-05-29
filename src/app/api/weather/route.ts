import jwt from 'jsonwebtoken'
import { HttpError } from '@/utils/httpError'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const lat = searchParams.get('lat')
    const lon = searchParams.get('lon')
    if (
      !process.env.PRIVATE_KEY ||
      !process.env.APP_ID ||
      !process.env.TEAM_ID ||
      !process.env.KEY_ID
    )
      throw new HttpError('Missing Credentials', 400)

    // decode the base64 encoded .p8 secret key file stored in PRIVATE_KEY
    const privateKey = Buffer.from(process.env.PRIVATE_KEY, 'base64').toString(
      'ascii',
    )

    // Reference: https://allthecode.co/blog/post/setting-up-weatherkit-rest-api-in-node-js
    // https://developer.apple.com/documentation/weatherkitrestapi/request_authentication_for_weatherkit_rest_api

    // @ts-ignore
    const token = jwt.sign(
      {
        sub: process.env.APP_ID, // the reverse URL App Id you made above
      },
      privateKey,
      {
        issuer: process.env.TEAM_ID, // find your TeamID in your developer account
        expiresIn: '10h', // give it 1 hour of validity
        keyid: process.env.KEY_ID, // this is the ID for the key you created
        algorithm: 'ES256', // this is the algorithm Apple used
        header: {
          // see details below for this
          id: process.env.TEAM_ID + '.' + process.env.APP_ID,
        },
      },
    )

    const url = `https://weatherkit.apple.com/api/v1/weather/en/${lat}/${lon}?dataSets=currentWeather,forecastHourly,forecastDaily`

    // add the token to your headers
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    }

    // get the data
    const response = await fetch(url, {
      method: 'GET',
      headers,
    })

    if (!response.ok) {
      throw new HttpError(response.statusText, response.status)
    }

    // get the JSON data
    const data = await response.json()

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

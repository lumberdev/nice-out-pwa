export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const lat = searchParams.get('lat')
  const lon = searchParams.get('lon')
  try {
    const url = `https://www.meteosource.com/api/v1/flexi/point?lat=${lat}&lon=${lon}&sections=all&timezone=auto&language=en&units=us&key=${process.env.METEO_AI_API_KEY}`
    const res = await fetch(url)
    const data = await res.json()
    return Response.json(data, { status: 200 })
  } catch (error) {
    console.error(error)
    return Response.json({ error: 'It happens' }, { status: 500 })
  }
}

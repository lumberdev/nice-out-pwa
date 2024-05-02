export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const lat = searchParams.get('lat')
  const lon = searchParams.get('lon')
  try {
    const url = `http://localhost:4000?lat=${lat}&lon=${lon}`
    const res = await fetch(url)
    const data = await res.json()
    return Response.json(data, { status: 200 })
  } catch (error) {
    console.error(error)
    return Response.json({ error: 'It happens' }, { status: 500 })
  }
}

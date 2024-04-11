import { PlaceDetailsResponseData, TextSearchResponseData } from '@googlemaps/google-maps-services-js'
import { g } from '../utils/g'

export async function fetchGoogleApi(
  path: 'place/textsearch',
  params: Record<string, string>,
): Promise<TextSearchResponseData>

export async function fetchGoogleApi(
  path: 'place/details',
  params: Record<string, string>,
): Promise<PlaceDetailsResponseData>

export async function fetchGoogleApi(path: string, params: Record<string, string>): Promise<unknown> {
  const url = new URL(`https://maps.googleapis.com/maps/api/${path}/json`)
  let res

  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value)
  }

  url.searchParams.set('key', g.env.GOOGLE_API_KEY)

  try {
    res = await fetch(url.toString())
  } catch (e) {
    console.error('fetch error: ', e)

    return
  }

  try {
    return await res.json()
  } catch (e) {
    console.error('json error: ', e)
  }
}

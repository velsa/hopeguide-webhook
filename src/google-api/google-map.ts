import { AddressObject, getAddressObject } from './address-obj'
import { fetchGoogleApi } from './fetch-google-api'

interface GoogleMapPlaceDetails {
  name: string
  formattedAddress: string
  placeURL: string
  navigationURL: string
  address: AddressObject | undefined
}

export async function getGoogleMapPlaceDetails(address: string): Promise<GoogleMapPlaceDetails> {
  // const mapRes = await new Client().textSearch({
  //   params: {
  //     query: address,
  //     key: GOOGLE_API_KEY,
  //   },
  // })
  const searchData = await fetchGoogleApi('place/textsearch', { query: address })

  if (!searchData?.results?.length) {
    return
  }

  // console.log('textSearch: ', JSON.stringify(searchData, null, 2))

  const { name, place_id, formatted_address } = searchData.results[0]
  const placeData = await fetchGoogleApi('place/details', { place_id, fields: 'address_components' })
  // console.log('placeDetails: ', JSON.stringify(placeData, null, 2))
  const addressObject = getAddressObject(placeData.result.address_components)
  const placeURL = `https://www.google.com/maps/search/?api=1&query=${encode(name)}&query_place_id=${place_id}`
  const navigationURL = `https://www.google.com/maps/dir/?api=1&destination=${encode(address)}&destination_place_id=${place_id}`

  return { name, address: addressObject, formattedAddress: formatted_address, placeURL, navigationURL }
}

function encode(str: string) {
  return encodeURI(str).replace(/%20/g, '+').replace(/,/g, '%2C').replace(/'/g, '%27')
}

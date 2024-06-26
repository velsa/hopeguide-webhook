export interface AddressObject {
  home?: string
  postal_code?: string
  street?: string
  region?: string
  city?: string
  country?: string
}

export function getAddressObject(address_components): AddressObject {
  if (!address_components) {
    return
  }

  const ShouldBeComponent = {
    home: ['street_number'],
    postal_code: ['postal_code'],
    street: ['street_address', 'route'],
    region: [
      'administrative_area_level_1',
      'administrative_area_level_2',
      'administrative_area_level_3',
      'administrative_area_level_4',
      'administrative_area_level_5',
    ],
    city: [
      'locality',
      'sublocality',
      'sublocality_level_1',
      'sublocality_level_2',
      'sublocality_level_3',
      'sublocality_level_4',
    ],
    country: ['country'],
  }
  const address = {
    home: undefined,
    postal_code: undefined,
    street: undefined,
    region: undefined,
    city: undefined,
    country: undefined,
  }

  address_components.forEach((component) => {
    for (const shouldBe in ShouldBeComponent) {
      if (ShouldBeComponent[shouldBe].indexOf(component.types[0]) !== -1) {
        if (shouldBe === 'country') {
          address[shouldBe] = component.short_name
        } else {
          address[shouldBe] = component.long_name
        }
      }
    }
  })

  return address
}

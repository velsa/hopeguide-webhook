import { isEqual } from 'lodash'
import { VACANCIES_IDS_TO_PROPS, VACANCIES_PROPS_TO_IDS, VacanciesResponse } from 'notion-sdk/dbs/vacancies'

export interface VacanciesDiff {
  updated: ('cover' | 'icon')[]
  properties: {
    updated: (keyof typeof VACANCIES_PROPS_TO_IDS)[]
    deleted: (keyof typeof VACANCIES_PROPS_TO_IDS)[]
  }
}

export function diffEvents(newRecord: VacanciesResponse, oldRecord: VacanciesResponse) {
  // console.log(`Checking diff for record ${oldRecord.id}`)

  const changes: VacanciesDiff = {
    updated: [],
    properties: {
      updated: [],
      deleted: [],
    },
  }

  void ['cover', 'icon'].forEach((key) => {
    if (!isEqual(oldRecord[key], newRecord[key])) {
      changes.updated.push(key as 'cover' | 'icon')
    }
  })

  Object.values(oldRecord.properties).forEach((oldProp) => {
    const newProp = Object.values(newRecord.properties).find((prop) => prop.id === oldProp.id)
    const propName = VACANCIES_IDS_TO_PROPS[newProp.id]

    if (!propName && (newProp.type as string) !== 'relation') {
      console.error(`Unknown prop id ${oldProp.id}`)
      console.error('oldProp:', oldProp)
      console.error('newProp:', newProp)

      return
    }

    if (newProp === undefined) {
      changes.properties.deleted.push(propName)
    }

    if (!isEqual(oldProp, newProp)) {
      changes.properties.updated.push(propName)
    }
  })

  return changes
}

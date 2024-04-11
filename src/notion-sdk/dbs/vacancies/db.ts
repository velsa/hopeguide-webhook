import { VacanciesResponse, VacanciesQuery, VacanciesQueryResponse } from './types'
import { VacanciesPatchDTO } from './patch.dto'
import { GenericDatabaseClass, DatabaseOptions } from '../../core/src/generic-db'
import { VACANCIES_PROPS_TO_TYPES, VACANCIES_PROPS_TO_IDS, VacanciesDTOProperties } from './constants'

export class VacanciesDatabase extends GenericDatabaseClass<
  VacanciesResponse,
  VacanciesPatchDTO,
  VacanciesQuery,
  VacanciesQueryResponse,
  VacanciesDTOProperties
> {
  protected notionDatabaseId: string
  
  constructor(options: DatabaseOptions) {
    super(options)

    this.notionDatabaseId = '09a205344b424808bd28bfd999605a37'
  }

  protected queryRemapFilter(filter?: Record<string, unknown>) {
    if (!filter) {
      return undefined
    }

    const notionFilter = {} as any

    Object.entries(filter).forEach(([key, value]) => {
      if (key === 'and' || key === 'or') {
        if (Array.isArray(value)) {
          notionFilter[key] = value.map((v) => this.queryRemapFilter(v))
        } else {
          throw new Error(`Vacancies: Invalid filter value for ${key}: ${value}`)
        }
      } else {
        if (!(key in VACANCIES_PROPS_TO_TYPES)) {
          throw new Error(`Vacancies: Invalid filter key: ${key}`)
        }

        const propType = VACANCIES_PROPS_TO_TYPES[key as keyof typeof VACANCIES_PROPS_TO_TYPES];
        const propId = VACANCIES_PROPS_TO_IDS[key as keyof typeof VACANCIES_PROPS_TO_IDS];

        notionFilter['property'] = propId
        notionFilter[propType] = value
      }
    })
    
    return notionFilter
  }

  protected queryRemapSorts(sorts?: Record<string, string>[]) {
    return sorts?.map((sort) => {
      if ('property' in sort) {
        return {
          property: VACANCIES_PROPS_TO_IDS[sort.property as keyof typeof VACANCIES_PROPS_TO_IDS],
          direction: sort.direction,
        }
      }

      return sort
    })
  }

  protected queryRemapFilterProperties(filterProps?: string[]) {
    return filterProps?.map((p) => VACANCIES_PROPS_TO_IDS[p as keyof typeof VACANCIES_PROPS_TO_IDS])
  }
}

import { WithOptional, Join, PathsToStringProps } from '../../core/types/helper.types'
import {
DatabaseObjectResponse,
StringRequest,
CreatedByPropertyItemObjectResponse,
DatePropertyItemObjectResponse,
FilesPropertyItemObjectResponse,
LastEditedByPropertyItemObjectResponse,
LastEditedTimePropertyItemObjectResponse,
RichTextPropertyItemObjectResponse,
StatusPropertyItemObjectResponse,
TitlePropertyItemObjectResponse,
ExistencePropertyFilter,
QueryDatabaseBodyParameters,
TimestampCreatedTimeFilter,
TimestampLastEditedTimeFilter,
DatePropertyFilter,
FilesPropertyFilter,
PeoplePropertyFilter,
StatusPropertyFilter,
TextPropertyFilter
} from '../../core/types/notion-api.types'
import { VACANCIES_PROPS_TO_IDS } from './constants'

export interface VacanciesResponse extends WithOptional<Omit<DatabaseObjectResponse, 'properties'>, 'title'| 'description'| 'is_inline'| 'url'| 'public_url'> {
  properties: {
    "Время. Комментарий": RichTextPropertyItemObjectResponse,
    "Доступные даты": Omit<StatusPropertyItemObjectResponse, 'status'> & { status: { id: StringRequest, name: 'гибкие часы', color: 'yellow' } | { id: StringRequest, name: 'гибрид', color: 'blue' } | { id: StringRequest, name: 'фиксированное время', color: 'orange' }},
    "Адрес": RichTextPropertyItemObjectResponse,
    "Срочность": Omit<StatusPropertyItemObjectResponse, 'status'> & { status: { id: StringRequest, name: '🌿 Не срочная', color: 'green' } | { id: StringRequest, name: '🔥 Срочная', color: 'orange' }},
    "Published": Omit<StatusPropertyItemObjectResponse, 'status'> & { status: { id: StringRequest, name: 'Not reviewed', color: 'default' } | { id: StringRequest, name: 'In progress', color: 'blue' } | { id: StringRequest, name: 'Done', color: 'green' }},
    "Дата начала ": DatePropertyItemObjectResponse,
    "Контакт для HopeGuide": RichTextPropertyItemObjectResponse,
    "Description_ AI translation": RichTextPropertyItemObjectResponse,
    "Актуально до": DatePropertyItemObjectResponse,
    "Short description_AI translation": RichTextPropertyItemObjectResponse,
    "Как связаться": RichTextPropertyItemObjectResponse,
    "Фото от организации": FilesPropertyItemObjectResponse,
    "Подробное описание вакансии": RichTextPropertyItemObjectResponse,
    "Описание вакансии": TitlePropertyItemObjectResponse,
    "NoteMate logs": RichTextPropertyItemObjectResponse,
    "Created by": CreatedByPropertyItemObjectResponse,
    "Редактор": LastEditedByPropertyItemObjectResponse,
    "Обновлено": LastEditedTimePropertyItemObjectResponse
  }
}

export type VacanciesResponseProperties = keyof VacanciesResponse['properties']
export type VacanciesPath = Join<PathsToStringProps<VacanciesResponse>>

type VacanciesTimeCommentPropertyFilter = TextPropertyFilter

export type VacanciesAvailableDatesPropertyType = VacanciesResponse['properties']['Доступные даты']['status']['name']

type VacanciesAvailableDatesPropertyFilter =
  | {
      equals: VacanciesAvailableDatesPropertyType
    }
  | {
      does_not_equal: VacanciesAvailableDatesPropertyType
    }
  | ExistencePropertyFilter      

type VacanciesAddressPropertyFilter = TextPropertyFilter

export type VacanciesUrgencyPropertyType = VacanciesResponse['properties']['Срочность']['status']['name']

type VacanciesUrgencyPropertyFilter =
  | {
      equals: VacanciesUrgencyPropertyType
    }
  | {
      does_not_equal: VacanciesUrgencyPropertyType
    }
  | ExistencePropertyFilter      


export type VacanciesPublishedPropertyType = VacanciesResponse['properties']['Published']['status']['name']

type VacanciesPublishedPropertyFilter =
  | {
      equals: VacanciesPublishedPropertyType
    }
  | {
      does_not_equal: VacanciesPublishedPropertyType
    }
  | ExistencePropertyFilter      

type VacanciesStartDatePropertyFilter = DatePropertyFilter
type VacanciesContactForHopeGuidePropertyFilter = TextPropertyFilter
type VacanciesDescriptionAiTranslationPropertyFilter = TextPropertyFilter
type VacanciesRelevantUntilPropertyFilter = DatePropertyFilter
type VacanciesShortDescriptionAiTranslationPropertyFilter = TextPropertyFilter
type VacanciesHowToContactPropertyFilter = TextPropertyFilter
type VacanciesPhotoFromOrganizationPropertyFilter = ExistancePropertyFilter
type VacanciesDetailedDescriptionPropertyFilter = TextPropertyFilter
type VacanciesDescriptionPropertyFilter = TextPropertyFilter
type VacanciesNoteMateLogsPropertyFilter = TextPropertyFilter
type VacanciesCreatedByPropertyFilter = PeoplePropertyFilter
type VacanciesEditedByPropertyFilter = PeoplePropertyFilter
type VacanciesLastEditedTimePropertyFilter = DatePropertyFilter

export type VacanciesPropertyFilter = { timeComment: VacanciesTimeCommentPropertyFilter } | { availableDates: VacanciesAvailableDatesPropertyFilter } | { address: VacanciesAddressPropertyFilter } | { urgency: VacanciesUrgencyPropertyFilter } | { published: VacanciesPublishedPropertyFilter } | { startDate: VacanciesStartDatePropertyFilter } | { contactForHopeGuide: VacanciesContactForHopeGuidePropertyFilter } | { descriptionAiTranslation: VacanciesDescriptionAiTranslationPropertyFilter } | { relevantUntil: VacanciesRelevantUntilPropertyFilter } | { shortDescriptionAiTranslation: VacanciesShortDescriptionAiTranslationPropertyFilter } | { howToContact: VacanciesHowToContactPropertyFilter } | { photoFromOrganization: VacanciesPhotoFromOrganizationPropertyFilter } | { detailedDescription: VacanciesDetailedDescriptionPropertyFilter } | { description: VacanciesDescriptionPropertyFilter } | { noteMateLogs: VacanciesNoteMateLogsPropertyFilter } | { createdBy: VacanciesCreatedByPropertyFilter } | { editedBy: VacanciesEditedByPropertyFilter } | { lastEditedTime: VacanciesLastEditedTimePropertyFilter }

export type VacanciesQuery = Omit<QueryDatabaseBodyParameters, 'filter' | 'sorts'> & {
  sorts?: Array<
  | {
      property: keyof typeof VACANCIES_PROPS_TO_IDS
      direction: 'ascending' | 'descending'
    }
  | {
      timestamp: 'created_time' | 'last_edited_time'
      direction: 'ascending' | 'descending'
    }
  >
  filter?:
    | {
        or: Array<
          | VacanciesPropertyFilter
          | TimestampCreatedTimeFilter
          | TimestampLastEditedTimeFilter
          | {
              // or: VacanciesQuery['filter']
              or: Array<VacanciesPropertyFilter>
            }
          | {
              // and: VacanciesQuery['filter']
              and: Array<VacanciesPropertyFilter>
            }
        >
      }
    | {
        and: Array<
          | VacanciesPropertyFilter
          | TimestampCreatedTimeFilter
          | TimestampLastEditedTimeFilter
          | {
              // or: VacanciesQuery['filter']
              or: Array<VacanciesPropertyFilter>
            }
          | {
              // and: VacanciesQuery['filter']
              and: Array<VacanciesPropertyFilter>
            }
        >
      }
    | VacanciesPropertyFilter
    | TimestampCreatedTimeFilter
    | TimestampLastEditedTimeFilter
}

export type VacanciesQueryResponse = {
  results: VacanciesResponse[]
  next_cursor: string | null
  has_more: boolean
}


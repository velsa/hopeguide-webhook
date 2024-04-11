export const VACANCIES_PROP_VALUES = {
"availableDates": [
  "гибкие часы",
  "гибрид",
  "фиксированное время"
] as const,
"urgency": [
  "🌿 Не срочная",
  "🔥 Срочная"
] as const,
"published": [
  "Not reviewed",
  "In progress",
  "Done"
] as const,
}

export const VACANCIES_PROPS_TO_IDS = {
  "timeComment": "%3Ae%7C%3E",
  "availableDates": "%3BV%3DD",
  "address": "AiTY",
  "urgency": "DGzD",
  "published": "FBFv",
  "startDate": "OQaw",
  "contactForHopeGuide": "WUqP",
  "descriptionAiTranslation": "%5Ddi%7D",
  "relevantUntil": "ejJ%40",
  "shortDescriptionAiTranslation": "h~Bl",
  "howToContact": "pBVY",
  "photoFromOrganization": "xlfj",
  "detailedDescription": "zk~U",
  "description": "title",
  "noteMateLogs": "N%7Db%5E",
  "createdBy": "U_FE",
  "editedBy": "d%3FC%5E",
  "lastEditedTime": "oOFV"
} as const
export const VACANCIES_IDS_TO_PROPS = {
  "%3Ae%7C%3E": "timeComment",
  "%3BV%3DD": "availableDates",
  "AiTY": "address",
  "DGzD": "urgency",
  "FBFv": "published",
  "OQaw": "startDate",
  "WUqP": "contactForHopeGuide",
  "%5Ddi%7D": "descriptionAiTranslation",
  "ejJ%40": "relevantUntil",
  "h~Bl": "shortDescriptionAiTranslation",
  "pBVY": "howToContact",
  "xlfj": "photoFromOrganization",
  "zk~U": "detailedDescription",
  "title": "description",
  "N%7Db%5E": "noteMateLogs",
  "U_FE": "createdBy",
  "d%3FC%5E": "editedBy",
  "oOFV": "lastEditedTime"
} as const
export const VACANCIES_PROPS_TO_TYPES = {
  "timeComment": "rich_text",
  "availableDates": "status",
  "address": "rich_text",
  "urgency": "status",
  "published": "status",
  "startDate": "date",
  "contactForHopeGuide": "rich_text",
  "descriptionAiTranslation": "rich_text",
  "relevantUntil": "date",
  "shortDescriptionAiTranslation": "rich_text",
  "howToContact": "rich_text",
  "photoFromOrganization": "files",
  "detailedDescription": "rich_text",
  "description": "title",
  "noteMateLogs": "rich_text",
  "createdBy": "created_by",
  "editedBy": "last_edited_by",
  "lastEditedTime": "last_edited_time"
} as const

  export type VacanciesDTOProperties = keyof typeof VACANCIES_PROPS_TO_IDS
  
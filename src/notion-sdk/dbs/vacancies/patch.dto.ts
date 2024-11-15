import { VacanciesResponse } from "./types"
import { UpdatePageBodyParameters,
RichTextItemRequest
} from '../../core/types/notion-api.types'

type TypeFromRecord<Obj, Type> = Obj extends Record<string, infer T> ? Extract<T, Type> : never

export type VacanciesPropertiesPatch = {
  timeComment?: string | { text: string; url?: string; annotations?: RichTextItemRequest['annotations'] } | RichTextItemRequest[]
  availableDates?: TypeFromRecord<UpdatePageBodyParameters['properties'], { type?: 'status' }>['status']
  address?: string | { text: string; url?: string; annotations?: RichTextItemRequest['annotations'] } | RichTextItemRequest[]
  urgency?: TypeFromRecord<UpdatePageBodyParameters['properties'], { type?: 'status' }>['status']
  published?: TypeFromRecord<UpdatePageBodyParameters['properties'], { type?: 'status' }>['status']
  startDate?: TypeFromRecord<UpdatePageBodyParameters['properties'], { type?: 'date' }>['date']
  contactForHopeGuide?: string | { text: string; url?: string; annotations?: RichTextItemRequest['annotations'] } | RichTextItemRequest[]
  descriptionAiTranslation?: string | { text: string; url?: string; annotations?: RichTextItemRequest['annotations'] } | RichTextItemRequest[]
  relevantUntil?: TypeFromRecord<UpdatePageBodyParameters['properties'], { type?: 'date' }>['date']
  shortDescriptionAiTranslation?: string | { text: string; url?: string; annotations?: RichTextItemRequest['annotations'] } | RichTextItemRequest[]
  howToContact?: string | { text: string; url?: string; annotations?: RichTextItemRequest['annotations'] } | RichTextItemRequest[]
  photoFromOrganization?: TypeFromRecord<UpdatePageBodyParameters['properties'], { type?: 'files' }>['files']
  detailedDescription?: string | { text: string; url?: string; annotations?: RichTextItemRequest['annotations'] } | RichTextItemRequest[]
  description?: string | { text: string; url?: string; annotations?: RichTextItemRequest['annotations'] } | RichTextItemRequest[]
  noteMateLogs?: string | { text: string; url?: string; annotations?: RichTextItemRequest['annotations'] } | RichTextItemRequest[]
  vozrastnoeOgranichenie?: TypeFromRecord<UpdatePageBodyParameters['properties'], { type?: 'number' }>['number']
  svyazanoLiVasheVolonterstvoSReligioznojOrganizaciej?: VacanciesResponse['properties']['Связано ли ваше волонтерство с религиозной организацией?']['select']['name']
  regulyarnostVakansii?: VacanciesResponse['properties']['Регулярность вакансии']['select']['name']
  samonazvanieOrganizaciiDlyaNovyhOrganizacijIzAnkety?: string | { text: string; url?: string; annotations?: RichTextItemRequest['annotations'] } | RichTextItemRequest[]
}

  
export class VacanciesPatchDTO {
  __data: UpdatePageBodyParameters

  constructor(opts: {
    properties?: VacanciesPropertiesPatch
    coverUrl?: string
    icon?: UpdatePageBodyParameters['icon']
    archived?: UpdatePageBodyParameters['archived']
  }) {
    const { properties: props, coverUrl, icon, archived } = opts

    this.__data = {}
    this.__data.properties = {}
    this.__data.cover = coverUrl ? { type: 'external', external: { url: coverUrl } } : undefined
    this.__data.icon = icon
    this.__data.archived = archived
    
    if (props?.timeComment !== undefined) {
      this.__data.properties['%3Ae%7C%3E'] = {
        type: 'rich_text',
        rich_text: typeof props.timeComment === 'string' 
          ? [{ type: 'text', text: { content: props.timeComment } }]
          : Array.isArray(props.timeComment)
            ? props.timeComment
            : props.timeComment === null
              ? []
              : [
                  {
                    type: 'text',
                    text: {
                      content: props.timeComment.text,
                      link: props.timeComment?.url ? { url: props.timeComment.url } : undefined
                    },
                    annotations: props.timeComment.annotations
                  },
                ]
      }
    }

    if (props?.availableDates !== undefined) {
      this.__data.properties['%3BV%3DD'] = {
        type: 'status',
        status: props.availableDates,
      }
    }

    if (props?.address !== undefined) {
      this.__data.properties['AiTY'] = {
        type: 'rich_text',
        rich_text: typeof props.address === 'string' 
          ? [{ type: 'text', text: { content: props.address } }]
          : Array.isArray(props.address)
            ? props.address
            : props.address === null
              ? []
              : [
                  {
                    type: 'text',
                    text: {
                      content: props.address.text,
                      link: props.address?.url ? { url: props.address.url } : undefined
                    },
                    annotations: props.address.annotations
                  },
                ]
      }
    }

    if (props?.urgency !== undefined) {
      this.__data.properties['DGzD'] = {
        type: 'status',
        status: props.urgency,
      }
    }

    if (props?.published !== undefined) {
      this.__data.properties['FBFv'] = {
        type: 'status',
        status: props.published,
      }
    }

    if (props?.startDate !== undefined) {
      this.__data.properties['OQaw'] = {
        type: 'date',
        date: props.startDate,
      }
    }

    if (props?.contactForHopeGuide !== undefined) {
      this.__data.properties['WUqP'] = {
        type: 'rich_text',
        rich_text: typeof props.contactForHopeGuide === 'string' 
          ? [{ type: 'text', text: { content: props.contactForHopeGuide } }]
          : Array.isArray(props.contactForHopeGuide)
            ? props.contactForHopeGuide
            : props.contactForHopeGuide === null
              ? []
              : [
                  {
                    type: 'text',
                    text: {
                      content: props.contactForHopeGuide.text,
                      link: props.contactForHopeGuide?.url ? { url: props.contactForHopeGuide.url } : undefined
                    },
                    annotations: props.contactForHopeGuide.annotations
                  },
                ]
      }
    }

    if (props?.descriptionAiTranslation !== undefined) {
      this.__data.properties['%5Ddi%7D'] = {
        type: 'rich_text',
        rich_text: typeof props.descriptionAiTranslation === 'string' 
          ? [{ type: 'text', text: { content: props.descriptionAiTranslation } }]
          : Array.isArray(props.descriptionAiTranslation)
            ? props.descriptionAiTranslation
            : props.descriptionAiTranslation === null
              ? []
              : [
                  {
                    type: 'text',
                    text: {
                      content: props.descriptionAiTranslation.text,
                      link: props.descriptionAiTranslation?.url ? { url: props.descriptionAiTranslation.url } : undefined
                    },
                    annotations: props.descriptionAiTranslation.annotations
                  },
                ]
      }
    }

    if (props?.relevantUntil !== undefined) {
      this.__data.properties['ejJ%40'] = {
        type: 'date',
        date: props.relevantUntil,
      }
    }

    if (props?.shortDescriptionAiTranslation !== undefined) {
      this.__data.properties['h~Bl'] = {
        type: 'rich_text',
        rich_text: typeof props.shortDescriptionAiTranslation === 'string' 
          ? [{ type: 'text', text: { content: props.shortDescriptionAiTranslation } }]
          : Array.isArray(props.shortDescriptionAiTranslation)
            ? props.shortDescriptionAiTranslation
            : props.shortDescriptionAiTranslation === null
              ? []
              : [
                  {
                    type: 'text',
                    text: {
                      content: props.shortDescriptionAiTranslation.text,
                      link: props.shortDescriptionAiTranslation?.url ? { url: props.shortDescriptionAiTranslation.url } : undefined
                    },
                    annotations: props.shortDescriptionAiTranslation.annotations
                  },
                ]
      }
    }

    if (props?.howToContact !== undefined) {
      this.__data.properties['pBVY'] = {
        type: 'rich_text',
        rich_text: typeof props.howToContact === 'string' 
          ? [{ type: 'text', text: { content: props.howToContact } }]
          : Array.isArray(props.howToContact)
            ? props.howToContact
            : props.howToContact === null
              ? []
              : [
                  {
                    type: 'text',
                    text: {
                      content: props.howToContact.text,
                      link: props.howToContact?.url ? { url: props.howToContact.url } : undefined
                    },
                    annotations: props.howToContact.annotations
                  },
                ]
      }
    }

    if (props?.photoFromOrganization !== undefined) {
      this.__data.properties['xlfj'] = {
        type: 'files',
        files: props.photoFromOrganization,
      }
    }

    if (props?.detailedDescription !== undefined) {
      this.__data.properties['zk~U'] = {
        type: 'rich_text',
        rich_text: typeof props.detailedDescription === 'string' 
          ? [{ type: 'text', text: { content: props.detailedDescription } }]
          : Array.isArray(props.detailedDescription)
            ? props.detailedDescription
            : props.detailedDescription === null
              ? []
              : [
                  {
                    type: 'text',
                    text: {
                      content: props.detailedDescription.text,
                      link: props.detailedDescription?.url ? { url: props.detailedDescription.url } : undefined
                    },
                    annotations: props.detailedDescription.annotations
                  },
                ]
      }
    }

    if (props?.description !== undefined) {
      this.__data.properties['title'] = {
        type: 'title',
        title: typeof props.description === 'string' 
          ? [{ type: 'text', text: { content: props.description } }]
          : Array.isArray(props.description)
            ? props.description
            : props.description === null
              ? []
              : [
                  {
                    type: 'text',
                    text: {
                      content: props.description.text,
                      link: props.description?.url ? { url: props.description.url } : undefined
                    },
                    annotations: props.description.annotations
                  },
                ]
      }
    }

    if (props?.noteMateLogs !== undefined) {
      this.__data.properties['N%7Db%5E'] = {
        type: 'rich_text',
        rich_text: typeof props.noteMateLogs === 'string' 
          ? [{ type: 'text', text: { content: props.noteMateLogs } }]
          : Array.isArray(props.noteMateLogs)
            ? props.noteMateLogs
            : props.noteMateLogs === null
              ? []
              : [
                  {
                    type: 'text',
                    text: {
                      content: props.noteMateLogs.text,
                      link: props.noteMateLogs?.url ? { url: props.noteMateLogs.url } : undefined
                    },
                    annotations: props.noteMateLogs.annotations
                  },
                ]
      }
    }

    if (props?.vozrastnoeOgranichenie !== undefined) {
      this.__data.properties['Jg%5Cx'] = {
        type: 'number',
        number: props.vozrastnoeOgranichenie,
      }
    }

    if (props?.svyazanoLiVasheVolonterstvoSReligioznojOrganizaciej !== undefined) {
      this.__data.properties['MMOG'] = {
        type: 'select',
        select: { name: props.svyazanoLiVasheVolonterstvoSReligioznojOrganizaciej },
      }
    }

    if (props?.regulyarnostVakansii !== undefined) {
      this.__data.properties['raVb'] = {
        type: 'select',
        select: { name: props.regulyarnostVakansii },
      }
    }

    if (props?.samonazvanieOrganizaciiDlyaNovyhOrganizacijIzAnkety !== undefined) {
      this.__data.properties['vR%60%3A'] = {
        type: 'rich_text',
        rich_text: typeof props.samonazvanieOrganizaciiDlyaNovyhOrganizacijIzAnkety === 'string' 
          ? [{ type: 'text', text: { content: props.samonazvanieOrganizaciiDlyaNovyhOrganizacijIzAnkety } }]
          : Array.isArray(props.samonazvanieOrganizaciiDlyaNovyhOrganizacijIzAnkety)
            ? props.samonazvanieOrganizaciiDlyaNovyhOrganizacijIzAnkety
            : props.samonazvanieOrganizaciiDlyaNovyhOrganizacijIzAnkety === null
              ? []
              : [
                  {
                    type: 'text',
                    text: {
                      content: props.samonazvanieOrganizaciiDlyaNovyhOrganizacijIzAnkety.text,
                      link: props.samonazvanieOrganizaciiDlyaNovyhOrganizacijIzAnkety?.url ? { url: props.samonazvanieOrganizaciiDlyaNovyhOrganizacijIzAnkety.url } : undefined
                    },
                    annotations: props.samonazvanieOrganizaciiDlyaNovyhOrganizacijIzAnkety.annotations
                  },
                ]
      }
    }
  }
}

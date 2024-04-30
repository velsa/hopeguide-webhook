import { VacanciesResponse } from "./types"

export class VacanciesResponseDTO {
  __data: VacanciesResponse
  id: VacanciesResponse['id']
  title: VacanciesResponse['title']
  description: VacanciesResponse['description']
  parent: VacanciesResponse['parent']
  createdBy: VacanciesResponse['created_by']
  lastEditedBy: VacanciesResponse['last_edited_by']
  createdTime: VacanciesResponse['created_time']
  lastEditedTime: VacanciesResponse['last_edited_time']
  isInline: VacanciesResponse['is_inline']
  archived: VacanciesResponse['archived']
  url: VacanciesResponse['url']
  publicUrl: VacanciesResponse['public_url']
  properties: VacanciesPropertiesResponseDTO

  constructor(res: VacanciesResponse) {
    this.__data = res
    this.id = res.id
    this.title = res.title
    this.description = res.description
    this.parent = res.parent
    this.createdBy = res.created_by
    this.lastEditedBy = res.last_edited_by
    this.createdTime = res.created_time
    this.lastEditedTime = res.last_edited_time
    this.isInline = res.is_inline
    this.archived = res.archived
    this.url = res.url
    this.publicUrl = res.public_url
    this.properties = new VacanciesPropertiesResponseDTO(res.properties)
  }

  get cover() {
    return {
      type: this.__data.cover?.type,
      url: this.__data.cover?.type === 'external' ? this.__data.cover?.external?.url : this.__data.cover?.file?.url,
    }
  }

  get icon() {
    return {
      type: this.__data.icon?.type,
      url:
        this.__data.icon?.type === 'external'
          ? this.__data.icon?.external?.url
          : this.__data.icon?.type === 'file'
            ? this.__data.icon?.file?.url
            : undefined,
      emoji: this.__data.icon?.type === 'emoji' ? this.__data.icon?.emoji : undefined,
    }
  }
}
  
export class VacanciesPropertiesResponseDTO {
  private __props: VacanciesResponse['properties']
  private __data

  constructor(props: VacanciesResponse['properties']) {
    this.__props = props
    this.__data = {
      timeComment: this.__props['Время. Комментарий'],
      availableDates: this.__props['Доступные даты'],
      address: this.__props['Адрес'],
      urgency: this.__props['Срочность'],
      published: this.__props['Published'],
      startDate: this.__props['Дата начала '],
      contactForHopeGuide: this.__props['Контакт для HopeGuide'],
      descriptionAiTranslation: this.__props['Description_ AI translation'],
      relevantUntil: this.__props['Актуально до'],
      shortDescriptionAiTranslation: this.__props['Short description_AI translation'],
      howToContact: this.__props['Как связаться'],
      photoFromOrganization: this.__props['Фото от организации'],
      detailedDescription: this.__props['Подробное описание вакансии'],
      description: this.__props['Описание вакансии'],
      noteMateLogs: this.__props['NoteMate logs'],
      createdBy: this.__props['Created by'],
      editedBy: this.__props['Редактор'],
      lastEditedTime: this.__props['Обновлено'],
      lastEditedBy: this.__props['Last edited by'],
    }
  }


  get timeComment() {
    return {
      text: this.__props['Время. Комментарий']?.rich_text ? this.__props['Время. Комментарий'].rich_text.reduce((acc, item) => acc + item.plain_text, '') : undefined,
      links: this.__props['Время. Комментарий']?.rich_text ? this.__props['Время. Комментарий'].rich_text.filter((item) => item.href?.length).map((item) => item.href) : [],
      rich_text: this.__props['Время. Комментарий']?.rich_text,
    }
  }

  get availableDates() {
    return this.__props['Доступные даты']?.status
  }

  get address() {
    return {
      text: this.__props['Адрес']?.rich_text ? this.__props['Адрес'].rich_text.reduce((acc, item) => acc + item.plain_text, '') : undefined,
      links: this.__props['Адрес']?.rich_text ? this.__props['Адрес'].rich_text.filter((item) => item.href?.length).map((item) => item.href) : [],
      rich_text: this.__props['Адрес']?.rich_text,
    }
  }

  get urgency() {
    return this.__props['Срочность']?.status
  }

  get published() {
    return this.__props['Published']?.status
  }

  get startDate() {
    return this.__props['Дата начала ']?.date
  }

  get contactForHopeGuide() {
    return {
      text: this.__props['Контакт для HopeGuide']?.rich_text ? this.__props['Контакт для HopeGuide'].rich_text.reduce((acc, item) => acc + item.plain_text, '') : undefined,
      links: this.__props['Контакт для HopeGuide']?.rich_text ? this.__props['Контакт для HopeGuide'].rich_text.filter((item) => item.href?.length).map((item) => item.href) : [],
      rich_text: this.__props['Контакт для HopeGuide']?.rich_text,
    }
  }

  get descriptionAiTranslation() {
    return {
      text: this.__props['Description_ AI translation']?.rich_text ? this.__props['Description_ AI translation'].rich_text.reduce((acc, item) => acc + item.plain_text, '') : undefined,
      links: this.__props['Description_ AI translation']?.rich_text ? this.__props['Description_ AI translation'].rich_text.filter((item) => item.href?.length).map((item) => item.href) : [],
      rich_text: this.__props['Description_ AI translation']?.rich_text,
    }
  }

  get relevantUntil() {
    return this.__props['Актуально до']?.date
  }

  get shortDescriptionAiTranslation() {
    return {
      text: this.__props['Short description_AI translation']?.rich_text ? this.__props['Short description_AI translation'].rich_text.reduce((acc, item) => acc + item.plain_text, '') : undefined,
      links: this.__props['Short description_AI translation']?.rich_text ? this.__props['Short description_AI translation'].rich_text.filter((item) => item.href?.length).map((item) => item.href) : [],
      rich_text: this.__props['Short description_AI translation']?.rich_text,
    }
  }

  get howToContact() {
    return {
      text: this.__props['Как связаться']?.rich_text ? this.__props['Как связаться'].rich_text.reduce((acc, item) => acc + item.plain_text, '') : undefined,
      links: this.__props['Как связаться']?.rich_text ? this.__props['Как связаться'].rich_text.filter((item) => item.href?.length).map((item) => item.href) : [],
      rich_text: this.__props['Как связаться']?.rich_text,
    }
  }

  get photoFromOrganization() {
    return this.__props['Фото от организации']?.files
  }

  get detailedDescription() {
    return {
      text: this.__props['Подробное описание вакансии']?.rich_text ? this.__props['Подробное описание вакансии'].rich_text.reduce((acc, item) => acc + item.plain_text, '') : undefined,
      links: this.__props['Подробное описание вакансии']?.rich_text ? this.__props['Подробное описание вакансии'].rich_text.filter((item) => item.href?.length).map((item) => item.href) : [],
      rich_text: this.__props['Подробное описание вакансии']?.rich_text,
    }
  }

  get description() {
    return {
      text: this.__props['Описание вакансии']?.title ? this.__props['Описание вакансии'].title.reduce((acc, item) => acc + item.plain_text, '') : undefined,
      links: this.__props['Описание вакансии']?.title ? this.__props['Описание вакансии'].title.filter((item) => item.href?.length).map((item) => item.href) : [],
      title: this.__props['Описание вакансии']?.title,
    }
  }

  get noteMateLogs() {
    return {
      text: this.__props['NoteMate logs']?.rich_text ? this.__props['NoteMate logs'].rich_text.reduce((acc, item) => acc + item.plain_text, '') : undefined,
      links: this.__props['NoteMate logs']?.rich_text ? this.__props['NoteMate logs'].rich_text.filter((item) => item.href?.length).map((item) => item.href) : [],
      rich_text: this.__props['NoteMate logs']?.rich_text,
    }
  }

  get createdBy() {
    return this.__props['Created by']?.created_by
  }

  get editedBy() {
    return this.__props['Редактор']?.last_edited_by
  }

  get lastEditedTime() {
    return this.__props['Обновлено']?.last_edited_time
  }

  get lastEditedBy() {
    return this.__props['Last edited by']?.last_edited_by
  }
}

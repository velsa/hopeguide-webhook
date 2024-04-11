import { formatISO } from 'date-fns'
import { VacanciesDatabase, VacanciesPatchDTO, VacanciesResponse, VacanciesResponseDTO } from 'notion-sdk/dbs/vacancies'
import { g } from '../utils/g'

export async function handleRelevantUntil(data: VacanciesResponse) {
  const db = new VacanciesDatabase({ notionSecret: g.env.NOTION_API_SECRET })
  const props = new VacanciesResponseDTO(data).properties

  console.log(`${data.id} handleRelevantUntil:`, props.relevantUntil.start)

  if (new Date(props.relevantUntil.start).getTime() < Date.now() + 1000 * 60 * 60 * 24 * 30) {
    console.log(`${data.id} handleRelevantUntil: relevant until date ⊕ 30 days`, props.relevantUntil.start)

    const patch = new VacanciesPatchDTO({
      properties: {
        relevantUntil: {
          start: formatISO(new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), { representation: 'date' }),
        },
      },
    })

    await db.updatePage(data.id, patch)
    g.pageLog.info(data.id, `updated: Актуально до`)
  }
}

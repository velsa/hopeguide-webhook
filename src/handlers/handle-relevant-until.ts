import { formatISO } from 'date-fns'
import { VacanciesDatabase, VacanciesPatchDTO, VacanciesResponse, VacanciesResponseDTO } from 'notion-sdk/dbs/vacancies'
import { g } from '../utils/g'

export async function handleRelevantUntil(data: VacanciesResponse) {
  const db = new VacanciesDatabase({ notionSecret: g.env.NOTION_API_SECRET })
  const props = new VacanciesResponseDTO(data).properties
  const relevantUntil = new Date(props.lastEditedTime)

  relevantUntil.setDate(relevantUntil.getDate() + 30)

  console.log(
    `${data.id} handleRelevantUntil: change ${props.relevantUntil.start} to ${formatISO(relevantUntil, {
      representation: 'date',
    })}`,
  )

  const patch = new VacanciesPatchDTO({
    properties: {
      relevantUntil: {
        start: formatISO(relevantUntil, { representation: 'date' }),
      },
    },
  })

  await db.updatePage(data.id, patch)
  g.pageLog.info(data.id, `updated: Актуально до`)
}

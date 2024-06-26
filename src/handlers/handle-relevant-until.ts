import { formatISO } from 'date-fns'
import { VacanciesDatabase, VacanciesPatchDTO, VacanciesResponse, VacanciesResponseDTO } from 'notion-sdk/dbs/vacancies'
import { g } from '../utils/g'

export async function handleRelevantUntil(data: VacanciesResponse) {
  const db = new VacanciesDatabase({ notionSecret: g.env.NOTION_API_SECRET })
  const props = new VacanciesResponseDTO(data).properties

  if (!props.startDate?.start) {
    console.log(`${data.id} handleRelevantUntil: startDate is not set`)

    return
  }

  const newRelevantUntil = calcRelevantUntil(props.startDate.start)

  console.log(
    `${data.id} handleRelevantUntil: change ${props.relevantUntil?.start} to ${formatISO(newRelevantUntil, {
      representation: 'date',
    })}`,
  )

  const patch = new VacanciesPatchDTO({
    properties: {
      relevantUntil: {
        start: formatISO(newRelevantUntil, { representation: 'date' }),
      },
    },
  })

  await db.updatePage(data.id, patch)
  g.pageLog.info(data.id, `updated: Актуально до`)
}

export function calcRelevantUntil(lastEditedTime: string) {
  const relevantUntil = new Date(lastEditedTime)

  relevantUntil.setDate(relevantUntil.getDate() + 30)
  relevantUntil.setHours(0, 0, 0, 0)

  return relevantUntil
}

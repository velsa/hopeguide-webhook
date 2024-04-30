import { VacanciesResponse, VacanciesResponseDTO } from 'notion-sdk/dbs/vacancies'
import { initEnv } from 'utils/init-env'
import { writeLogsToPage } from 'utils/logs'
import { g } from '../utils/g'
import { calcRelevantUntil, handleRelevantUntil } from './handle-relevant-until'

export async function handleGuideWebhook(data: VacanciesResponse): Promise<void> {
  const page = new VacanciesResponseDTO(data)
  const props = page.properties

  g.pageLog.reset(data.id)

  if (process.env.NODE_ENV === 'test') {
    initEnv()
  }

  console.log(`${data.id} handleGuideWebhook:`, props.description.text)
  // console.log(`${data.id} handleGuideWebhook:`, JSON.stringify(data))

  // Update relevantUntil if the record was edited
  if (!props.relevantUntil.start || new Date(props.startDate.start) < calcRelevantUntil(props.relevantUntil.start)) {
    await handleRelevantUntil(data)
  }

  // Update the page with the logs
  await writeLogsToPage(data.id, page)

  return
}

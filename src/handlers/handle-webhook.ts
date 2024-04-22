import { VacanciesResponse, VacanciesResponseDTO } from 'notion-sdk/dbs/vacancies'
import { initEnv } from 'utils/init-env'
import { writeLogsToPage } from 'utils/logs'
import { g } from '../utils/g'
import { handleRelevantUntil } from './handle-relevant-until'

export async function handleGuideWebhook(data: VacanciesResponse): Promise<void> {
  const page = new VacanciesResponseDTO(data)
  const props = page.properties

  g.pageLog.reset(data.id)

  if (process.env.NODE_ENV === 'test') {
    initEnv()
  }

  console.log(`${data.id} handleGuideWebhook:`, props.description.text)
  // console.log(`${data.id} handleGuideWebhook:`, JSON.stringify(data))

  // If we have a FB event, we can update the address and date props
  // Otherwise, we update date if addToCalendar is not a URL
  // Update date dependant props: dayOfWeek, addToCalendar
  const maxRelevantUntil = new Date(props.lastEditedTime)

  maxRelevantUntil.setDate(maxRelevantUntil.getDate() + 30)
  maxRelevantUntil.setHours(0, 0, 0, 0)

  if (!props.relevantUntil.start || new Date(props.relevantUntil.start) < maxRelevantUntil) {
    await handleRelevantUntil(data)
  }

  // Update the page with the logs
  await writeLogsToPage(data.id, page)

  return
}

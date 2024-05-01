import { checkVacanciesDiff } from 'diff/check-diff'
import { normId } from 'notion-sdk/core/src/notion-urls'
import { VacanciesDatabase, VacanciesResponse, VacanciesResponseDTO } from 'notion-sdk/dbs/vacancies'
import { initEnv } from 'utils/init-env'
import { writeLogsToPage } from 'utils/logs'
import { saveToCache } from 'utils/redis-client'
import { g } from '../utils/g'
import { handleRelevantUntil } from './handle-relevant-until'

export async function handleGuideWebhook(webhookData: VacanciesResponse): Promise<void> {
  const vacs = new VacanciesDatabase({ notionSecret: g.env.NOTION_API_SECRET })
  const data = await vacs.getPage(webhookData.id)
  const page = new VacanciesResponseDTO(data)
  const props = page.properties
  const pageId = normId(data.id)

  g.pageLog.reset(data.id)

  if (process.env.NODE_ENV === 'test') {
    await initEnv()
  }

  console.log(`${data.id} handleGuideWebhook:`, props.description.text)
  // console.log(`${data.id} handleGuideWebhook:`, JSON.stringify(data))

  let diff = await checkVacanciesDiff(data)

  if (diff) {
    if (!diff.updated.length && !diff.properties.updated.length && !diff.properties.deleted.length) {
      console.log(`${pageId} handleGuideWebhook: No changes in props`)
    } else {
      console.log(`${pageId} handleGuideWebhook: Changes in props:`, JSON.stringify(diff))
    }
  } else {
    await saveToCache(pageId, JSON.stringify(data))
    console.log(`${pageId} handleGuideWebhook: Caching data for the first time`)

    diff = {
      updated: [],
      properties: { updated: [], deleted: [] },
    }
  }

  // Update relevantUntil if the record was edited
  if (!props.relevantUntil.start) {
    await handleRelevantUntil(data)
  }

  // Update the page with the logs
  await writeLogsToPage(data.id, page)

  return
}

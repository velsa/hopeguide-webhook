import { normId } from 'notion-sdk/core/src/notion-urls'
import { type VacanciesResponse } from 'notion-sdk/dbs/vacancies'
import { getFromCache } from 'utils/redis-client'
import { diffEvents, type VacanciesDiff } from './diff-events'

export async function checkVacanciesDiff(data: VacanciesResponse): Promise<VacanciesDiff> {
  let diff: VacanciesDiff = null
  const pageId = normId(data.id)

  try {
    const cachedDataString = await getFromCache(pageId)

    if (cachedDataString) {
      const cachedData = JSON.parse(cachedDataString)

      diff = diffEvents(data, cachedData)
    }
  } catch (error) {
    console.error(`${pageId} checkVacanciesDiff: Error getting cached data`, error)

    return null
  }

  return diff
}

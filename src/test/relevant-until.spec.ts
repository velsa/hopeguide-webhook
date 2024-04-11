import 'dotenv/config'
import { handleRelevantUntil } from 'handlers/handle-relevant-until'
import { VacanciesDatabase } from 'notion-sdk/dbs/vacancies'
import { g } from 'utils/g'
import { initEnv } from '../utils/init-env'

describe('Afisha Handlers Tests', () => {
  let db: VacanciesDatabase

  beforeAll(() => {
    initEnv()
    db = new VacanciesDatabase({ notionSecret: g.env.NOTION_API_SECRET })
  })

  it('should update relevant until', async () => {
    const data = await db.getPage('92d8cedce7e643fab966745dd743d1d8')

    await handleRelevantUntil(data)
  })
})

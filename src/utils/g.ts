import { createClient } from 'redis'
import { addErrorToPageLogs, addToPageLogs, resetPageLogs } from './logs'

export interface Env {
  GOOGLE_API_KEY: string
  NOTION_API_SECRET: string
  REDIS_URL: string
}

export interface IGlobals {
  env: Env
  redis: ReturnType<typeof createClient>
  pageLog: {
    info: typeof addToPageLogs
    error: typeof addErrorToPageLogs
    reset: typeof resetPageLogs
  }
}

export const g: IGlobals = {
  env: {} as Env,
  redis: undefined,
  pageLog: {
    info: addToPageLogs,
    error: addErrorToPageLogs,
    reset: resetPageLogs,
  },
}

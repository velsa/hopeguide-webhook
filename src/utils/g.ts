import { addErrorToPageLogs, addToPageLogs, resetPageLogs } from './logs'

export interface Env {
  GOOGLE_API_KEY: string
  NOTION_API_SECRET: string
}

export interface IGlobals {
  env: Env
  pageLog: {
    info: typeof addToPageLogs
    error: typeof addErrorToPageLogs
    reset: typeof resetPageLogs
  }
}

export const g: IGlobals = {
  env: {} as Env,
  pageLog: {
    info: addToPageLogs,
    error: addErrorToPageLogs,
    reset: resetPageLogs,
  },
}

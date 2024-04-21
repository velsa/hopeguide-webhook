import { g } from 'utils/g'

export function initEnv() {
  g.env = {
    NOTION_API_SECRET: process.env.NOTION_TS_CLIENT_NOTION_SECRET,
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
  }
}

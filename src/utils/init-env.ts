import { createClient } from 'redis'
import { g } from 'utils/g'

export async function initEnv() {
  g.env = {
    NOTION_API_SECRET: process.env.NOTION_TS_CLIENT_NOTION_SECRET,
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
    REDIS_URL: process.env.REDIS_URL,
  }

  g.redis = await createClient({ url: g.env.REDIS_URL, pingInterval: 1000 })
    .on('error', (err) => console.log('Redis Client Error:', err))
    .connect()
}

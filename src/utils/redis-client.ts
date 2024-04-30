import { g } from './g'

export async function saveToCache(key: string, value: string) {
  try {
    await g.redis.set(key, value)
  } catch (error) {
    console.error(`Error saving data to cache for ${key}`, error)
  }
}

export async function getFromCache(key: string) {
  try {
    return await g.redis.get(key)
  } catch (error) {
    console.error(`Error getting cached data for ${key}`, error)

    return null
  }
}

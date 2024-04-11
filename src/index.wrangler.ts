import { VacanciesResponse } from 'notion-sdk/dbs/vacancies'
import { handleGuideWebhook } from './handlers/handle-webhook'
import { Env, g } from './utils/g'

const GUIDE_WEBHOOK_HOSTNAME = 'webhook-guide.hopeguide.org'

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { hostname } = new URL(request.url)

    // Store env in global for use in other modules
    g.env = env

    if (hostname === GUIDE_WEBHOOK_HOSTNAME && request.method === 'POST') {
      let payload: VacanciesResponse

      try {
        payload = (await request.json()) as VacanciesResponse
      } catch (e) {
        console.error(`failed to parse payload`, e)

        return new Response('Invalid payload', { status: 500 })
      }

      try {
        await handleGuideWebhook(payload)

        return new Response('OK', { status: 200 })
      } catch (e) {
        console.error(`handleGuideWebhook failed`, new Error(e).stack)

        return new Response('Internal server error', { status: 500 })
      }
    }

    return new Response('Invalid request', { status: 400 })
  },
}

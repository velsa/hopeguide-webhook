import 'dotenv/config'
import express, { Request, Response } from 'express'
import { VacanciesResponse } from 'notion-sdk/dbs/vacancies'
import { initEnv } from 'utils/init-env'
import { handleGuideWebhook } from '../src/handlers/handle-webhook'

const app = express()

app.use(express.json())

const PORT = process.env.PORT || 8000

app.get('/', (req, res) => {
  res.status(200).send('Hello world!')
})

app.post('/', async (request: Request, res: Response) => {
  console.log('Received Webhook:', request.body)

  // Store env in global for use in other modules
  initEnv()

  try {
    await handleGuideWebhook(request.body as VacanciesResponse)

    res.status(200).send('OK')

    return
  } catch (e) {
    console.error(`handleGuideWebhook failed`, new Error(e).stack)

    res.status(500).send('Internal server error')
  }
})

app.listen(PORT, () => {
  console.log(`Guide Webhook listening on port ${PORT}`)
})

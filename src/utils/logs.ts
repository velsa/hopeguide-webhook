import { RichTextItemRequest } from 'notion-sdk/core/types/notion-api.types'
import { VacanciesDatabase, VacanciesPatchDTO, VacanciesResponseDTO } from 'notion-sdk/dbs/vacancies'
import { g } from './g'

type NotionPageLogs = Record<string, { type: 'info' | 'error'; msg: string }[]>

const pageLogs: NotionPageLogs = {}

export async function writeLogsToPage(pageId: string, page: VacanciesResponseDTO) {
  if (pageLogs[pageId]?.length) {
    const logs = pageLogs[pageId]
    const db = new VacanciesDatabase({
      notionSecret: g.env.NOTION_API_SECRET,
    })
    const prevLogsRichText: RichTextItemRequest[] = page.properties.noteMateLogs.rich_text.map((r) => {
      return {
        type: 'text',
        text: { content: r.plain_text },
        annotations: { code: true, color: r.annotations.color },
      }
    })
    const newLogsRichText: RichTextItemRequest[] = logs.map((l) => {
      return {
        type: 'text',
        text: { content: l.msg + '\n' },
        annotations: { code: true, color: l.type === 'error' ? 'red' : 'gray' },
      }
    })
    const logsRichText = [...prevLogsRichText, ...newLogsRichText].slice(-10)

    // console.log(`${pageId} writeLogsToPage:`, logsRichText)
    console.log(`${pageId} updating page logs...`)

    await db.updatePage(
      pageId,
      new VacanciesPatchDTO({
        properties: {
          noteMateLogs: logsRichText,
        },
      }),
    )
  }
}

export function addToPageLogs(pageId: string, msg: string) {
  if (!pageLogs[pageId]) {
    pageLogs[pageId] = []
  }

  pageLogs[pageId].push({ type: 'info', msg: `${logDateTimeText(new Date())}: ${msg}` })
}

export function addErrorToPageLogs(pageId: string, msg: string) {
  if (!pageLogs[pageId]) {
    pageLogs[pageId] = []
  }

  pageLogs[pageId].push({ type: 'error', msg: `${logDateTimeText(new Date())}: ${msg}` })
}

export function resetPageLogs(pageId: string) {
  pageLogs[pageId] = []
}

export const logDateTimeText = (date: Date | string) =>
  // TODO: fix time zone
  // date ? `${date.toLocaleString('en-GB', { timeZone: 'Asia/Jerusalem' }).split('.')[0].replace('T', ' ')}` : 'No date'
  date ? `${getLocalISOString(new Date(date), -120).split('.')[0].replace('T', ' ')}`.slice(0, -3) : 'No date'

export const logDateText = (date: Date | string) =>
  // TODO: fix time zone
  // date ? `${date.toLocaleString('en-GB', { timeZone: 'Asia/Jerusalem' }).split('.')[0].replace('T', ' ')}` : 'No date'
  date ? new Date(date).toISOString().split('T')[0] : 'No date'

function getLocalISOString(date: Date, tzOffset?: number) {
  const offset = tzOffset !== undefined ? tzOffset : date.getTimezoneOffset()
  const offsetAbs = Math.abs(offset)
  const isoString = new Date(date.getTime() - offset * 60 * 1000).toISOString()

  return `${isoString.slice(0, -1)}${offset > 0 ? '-' : '+'}${String(Math.floor(offsetAbs / 60)).padStart(
    2,
    '0',
  )}:${String(offsetAbs % 60).padStart(2, '0')}`
}

export function ellipsisText(text: string, maxLength: number) {
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text
}

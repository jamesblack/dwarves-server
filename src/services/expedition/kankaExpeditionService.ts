import axios from '../utils/axios'
import { AxiosResponse } from 'axios'

export interface RationAttribute {
  data: {
    value: string
  }
}

const RATIONS_ENTITY_ID = '191169'
const RATIONS_ATTRIBUTE_ID = '77047'

async function getRations () {
  const { data: res } = await axios.get<RationAttribute>(
    `https://kanka.io/api/v1/campaigns/10164/entities/${RATIONS_ENTITY_ID}/attributes/${RATIONS_ATTRIBUTE_ID}`
  )

  return parseInt(res.data.value, 10)
}

async function getDwarves (): Promise<Dwarf[]> {
  const characters = await getExpeditionDwarves(
    'https://kanka.io/api/v1/campaigns/10164/characters',
    14187,
    1
  )

  return characters.map(char => ({ name: char.name, isDead: char.is_dead }))
}

interface LinksResponse {
  first: string
  last: string
  next: string
  prev: string
}

interface CharacterDataResponse {
  name: string
  /* eslint-disable camelcase */
  is_dead: boolean
  /* eslint-enable camelcase */
}

interface CharactersResponse {
  data: CharacterDataResponse[]
  links: LinksResponse
  meta: {}
  sync: {}
}

async function getExpeditionDwarves (
  url: string,
  tag: number,
  page: number,
  data: CharacterDataResponse[] = []
): Promise<CharacterDataResponse[]> {
  const { data: res } = await axios.get<CharactersResponse>(url, {
    params: {
      tag_id: tag,
      page
    }
  })

  if (res.links.next) {
    return getExpeditionDwarves(url, tag, page + 1, data.concat(res.data))
  } else {
    return data.concat(res.data)
  }
}

async function consumeDailyRations () {
  const dwarves = await getDwarves()
  const rations = await getRations()
  const newRations = rations - dwarves.filter(dwarf => !dwarf.isDead).length
  await axios.put<AxiosResponse>(
    `https://kanka.io/api/v1/campaigns/10164/entities/${RATIONS_ENTITY_ID}/attributes/${RATIONS_ATTRIBUTE_ID}`,
    {
      name: 'Rations',
      entity_id: RATIONS_ENTITY_ID,
      value: newRations.toString()
    }
  )

  return { dwarves, rations: newRations }
}

const kankaExpeditionService: ExpeditionService = {
  getRations,
  getDwarves,
  consumeDailyRations
}

export default kankaExpeditionService

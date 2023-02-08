import axios from 'axios'
import { load } from 'cheerio'
import { Node } from './types'
import LatencyGrid from './LatencyGrid'

export default async function getAWSRegionsData(): Promise<LatencyGrid> {
  const resp = await axios.get('https://www.cloudping.co/grid')
  const $ = load(resp.data)
  const regions = $('thead .region_title')
    .map((id, el) => {
      const node: Node = {
        id,
        name: $(el).text(),
      }
      return node
    })
    .toArray()
  const grid = new LatencyGrid()
  $('.table-bordered>tbody tr').each((fromId, tr) => {
    $('td', $(tr)).each((toId, td) => {
      grid.addLink(regions[fromId], regions[toId], parseFloat($(td).text()))
    })
  })
  return grid
}

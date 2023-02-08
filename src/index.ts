import getAWSRegionsData from './getAWSRegionsLatencyGrid'
import LatencyGrid from './LatencyGrid'
import { Plan } from './types'

function getPlans(
  grid: LatencyGrid,
  dataCenterCount: number = 5,
  top: number = 10
): Plan[] {
  const ret: Plan[] = []
  for (const dataCenterNodes of grid.nodeIterator(dataCenterCount)) {
    const avgLatency =
      grid.nodes
        .map((node) => grid.bestLatency(node, dataCenterNodes))
        .reduce((a, b) => a + b, 0) / grid.nodes.length
    ret.push({
      nodes: dataCenterNodes,
      score: avgLatency,
    })
  }
  ret.sort((a, b) => a.score - b.score)
  return ret.slice(0, top)
}

function logPlan(plan: Plan): void {
  console.log('avg latency')
  console.log(`  ${plan.score}`)
  console.log('data centers:')
  plan.nodes.forEach((node) => {
    console.log(`  ${node.name}`)
  })
  console.log('-----------------')
}

// try calulate AWS region plans as example
getAWSRegionsData()
  .then((grid) => {
    // we should choose 3 of them as our data centers
    // return 10 of all plans
    const plans = getPlans(grid, 3, 10)
    plans.forEach((plan) => logPlan(plan))
  })
  .catch((e) => console.log(e))

/* eslint-disable generator-star-spacing */
import { Peer, Node } from './types'

export default class LatencyGrid {
  readonly nodes: Node[] = []
  private readonly grid: number[][] = []

  latency(from: Node | number, to: Node | number): number {
    const fromId = typeof from === 'number' ? from : from.id
    const toId = typeof to === 'number' ? to : to.id
    return this.grid[fromId][toId]
  }

  addLink(from: Node, to: Node, latency: number): void {
    this.nodes[from.id] = from
    this.nodes[to.id] = to
    if (!this.grid[from.id]) {
      this.grid[from.id] = []
    }
    this.grid[from.id][to.id] = latency
  }

  addPeer(peer: Peer): void {
    this.addLink(peer.from, peer.to, peer.goLatency)
    this.addLink(peer.to, peer.from, peer.backLatency)
  }

  *nodeIterator(count: number, indentation: number = 0): Generator<Node[]> {
    if (count === 1) {
      for (let i = indentation; i < this.nodes.length; i++) {
        const node = this.nodes[i]
        yield [node]
      }
    } else {
      for (let i = indentation; i < this.nodes.length; i++) {
        const node = this.nodes[i]
        for (const depth of this.nodeIterator(count - 1, i + 1)) {
          yield [node, ...depth]
        }
      }
    }
  }

  bestLatency(from: Node | number, targetNodes: Array<Node | number>): number {
    const latencies = targetNodes.map((to) => this.latency(from, to))
    return Math.min(...latencies)
  }
}

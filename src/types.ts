export interface Node {
  id: number
  name: string
}

export interface Peer {
  from: Node
  to: Node
  goLatency: number
  backLatency: number
}

export interface Plan {
  nodes: Node[]
  score: number
}

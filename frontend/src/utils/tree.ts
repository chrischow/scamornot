import { ReactNode } from "react"

export enum NodeType {
  NORMAL = 'normal',
  SCAM = 'scam',
  NOSCAM = 'no-scam',
  WARNING = 'warning',
}

export class Node {
  text: string
  nodeType: string = NodeType.NORMAL
  children: Node[] = []
  instruction?: ReactNode
  description?: ReactNode

  constructor(text: string, nodeType?: NodeType) {
    this.text = text
    if (nodeType) {
      this.nodeType = nodeType
    }
  }

  addChildren(children: Node[]) {
    for (let child of children) {
      this.children.push(child)
    }
  }

  addInstruction(element: ReactNode) {
    this.instruction = element
  }

  addDescription(element: ReactNode) {
    this.description = element
  }
}

import { ReactNode, createContext, useState } from 'react'
import { root } from '../data'
import { Node } from '../utils/tree'

interface ICheckContext {
  currentNode: Node
  nodes: Node[]
  selectionHistory: Node[]
  resetCheck: () => void
  goToNextNode: (node: Node) => void
  goBack: () => void
  jumpToNode: (node: Node, index: number) => void
}

export const CheckContext = createContext<ICheckContext>({
  currentNode: root,
  nodes: root.children,
  selectionHistory: [],
  resetCheck: () => {},
  goToNextNode: () => {},
  goBack: () => {},
  jumpToNode: () => {},
})

const CheckProvider = ({ children }: { children: ReactNode }) => {
  const [currentNode, setCurrentNode] = useState<Node>(root)
  const [nodes, setNodes] = useState<Node[]>(root.children)
  const [selectionHistory, setSelectionHistory] = useState<Node[]>([])

  const resetCheck = () => {
    setCurrentNode(root)
    setNodes(root.children)
    setSelectionHistory([])
  }

  const goToNextNode = (node: Node) => {
    if (node.children.length > 0) {
      setSelectionHistory((prevHistory) => {
        return [...prevHistory, node]
      })
      setCurrentNode(node)
      setNodes(node.children)
    }
  }

  const goBack = () => {
    if (selectionHistory.length > 0) {
      const nodes = selectionHistory.slice(0, -1)
      let parent: Node
      if (nodes.length === 0) {
        parent = root
      } else {
        parent = nodes[nodes.length - 1]
      }
      setCurrentNode(parent)
      setNodes(parent.children)
      setSelectionHistory(nodes)
    }
  }

  const jumpToNode = (node: Node, index: number) => {
    setCurrentNode(node)
    setNodes(node.children)
    setSelectionHistory((prevHistory) => {
      return prevHistory.slice(0, index + 1)
    })
  }

  return (
    <CheckContext.Provider
      value={{ currentNode, nodes, selectionHistory, resetCheck, goToNextNode, goBack, jumpToNode }}
    >
      {children}
    </CheckContext.Provider>
  )
}

export default CheckProvider

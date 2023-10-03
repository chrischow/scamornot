import { Box, Button, HStack, Heading, Spacer, Text, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import BoxContainer from '../components/BoxContainer'
import NodeCard from '../components/NodeCard'
import OutcomeCard from '../components/OutcomeCard'
import { root } from '../data'
import { Node } from '../utils/tree'

const HomePage = () => {
  // State
  const [currentNode, setCurrentNode] = useState<Node>(root)
  const [nodes, setNodes] = useState<Node[]>([])
  const [selectionHistory, setSelectionHistory] = useState<Node[]>([])

  useEffect(() => {
    setNodes(root.children)
  }, [])

  return (
    <BoxContainer>
      <VStack>
        <Heading size="2xl">ScamOrNot</Heading>
        <Text fontWeight="semibold" fontSize="lg">
          A tool for checking whether you're being scammed.
        </Text>
      </VStack>
      <Box marginTop={8} width="100%">
        {currentNode.instruction && <Box mb={4}>
          {currentNode.instruction}
        </Box>}
        {nodes.length === 1 ? (
          <OutcomeCard node={nodes[0]} />
        ) : (
          <VStack>
            {nodes.map((node, index) => {
              return (
                <NodeCard
                  key={index}
                  node={node}
                  onClick={() => {
                    if (node.children.length > 0) {
                      setSelectionHistory((prevHistory) => {
                        return [...prevHistory, node]
                      })
                      setCurrentNode(node)
                      setNodes(node.children)
                    }
                  }}
                />
              )
            })}
          </VStack>
        )}
      </Box>
      <HStack mt={2}>
        <Spacer />
        {selectionHistory.length > 0 && (
          <>
            <Button
              size="sm"
              marginTop={2}
              variant="solid"
              colorScheme="purple"
              onClick={() => {
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
              }}
            >
              Back
            </Button>
          </>
        )}
      </HStack>
      <VStack marginTop={8} alignItems="start" width="100%">
        <Heading size="lg" as="span">
          History
        </Heading>
        <Box marginTop={4} width="100%">
          {selectionHistory.map((node, index) => {
            return (
              <Button
                key={index}
                mb={2}
                width="100%"
                variant="outline"
                colorScheme="purple"
                justifyContent="start"
                onClick={() => {
                  setCurrentNode(node)
                  setNodes(node.children)
                  setSelectionHistory((prevHistory) => {
                    return prevHistory.slice(0, index + 1)
                  })
                }}
              >
                {`${index + 1}. ${node.text}`}
              </Button>
            )
          })}
        </Box>
      </VStack>
    </BoxContainer>
  )
}

export default HomePage

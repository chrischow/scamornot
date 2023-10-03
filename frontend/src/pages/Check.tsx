import { Box, Button, HStack, Heading, Spacer, Text, VStack } from '@chakra-ui/react'
import { useContext } from 'react'
import NodeCard from '../components/NodeCard'
import OutcomeCard from '../components/OutcomeCard'
import { CheckContext } from '../context/checkContext'
import { root } from '../data'

const CheckPage = () => {
  // State
  // const [currentNode, setCurrentNode] = useState<Node>(root)
  // const [nodes, setNodes] = useState<Node[]>([])
  // const [selectionHistory, setSelectionHistory] = useState<Node[]>([])

  const { currentNode, nodes, selectionHistory, resetCheck, goToNextNode, goBack, jumpToNode } =
    useContext(CheckContext)

  const isRestartable = currentNode.text !== root.text

  return (
    <>
      <VStack>
        <Heading size="2xl">Scam Check</Heading>
        <Text fontWeight="semibold" fontSize="lg">
          Select the most appropriate option in the series of questions below.
        </Text>
      </VStack>
      <Box marginTop={8} width="100%">
        {currentNode.instruction && <Box mb={4}>{currentNode.instruction}</Box>}
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
                    goToNextNode(node)
                  }}
                />
              )
            })}
          </VStack>
        )}
      </Box>
      <HStack mt={4}>
        {isRestartable && (
          <Button variant='ghost' colorScheme="red" size="sm" onClick={resetCheck}>
            Restart the check
          </Button>
        )}
        <Spacer />
        {selectionHistory.length > 0 && (
          <>
            <Button size="sm" marginTop={2} variant="solid" colorScheme="purple" onClick={goBack}>
              Back
            </Button>
          </>
        )}
      </HStack>
      {selectionHistory.length > 0 && (
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
                  height="auto"
                  py={2}
                  width="100%"
                  variant="outline"
                  colorScheme="purple"
                  justifyContent="start"
                  whiteSpace="normal"
                  textAlign="start"
                  onClick={() => {
                    jumpToNode(node, index)
                  }}
                >
                  <HStack alignItems="start">
                    <Text>{index + 1}.</Text>
                    <Text>{node.text}</Text>
                  </HStack>
                </Button>
              )
            })}
          </Box>
        </VStack>
      )}
    </>
  )
}

export default CheckPage

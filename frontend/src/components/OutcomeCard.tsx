import { Box, Center, HStack, Heading, Text, VStack } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { AiFillWarning } from 'react-icons/ai'
import { BsCheckCircleFill } from 'react-icons/bs'
import { MdDangerous } from 'react-icons/md'
import { Node, NodeType } from '../utils/tree'

const OutcomeCard = ({ node }: { node: Node }) => {
  // Required icon
  let icon: ReactNode | null
  let headerText: string
  let color: string

  switch (node.nodeType) {
    case NodeType.WARNING:
      icon = <AiFillWarning />
      color = 'orange.500'
      headerText = 'Warning!'
      break
    case NodeType.SCAM:
      icon = <MdDangerous />
      color = 'red.500'
      headerText = 'Likely a Scam!'
      break
    case NodeType.NOSCAM:
      icon = <BsCheckCircleFill />
      color = 'teal.500'
      headerText = 'Seems Okay.'
      break
    default:
      icon = null
      color = 'gray.500'
      headerText = 'Seems Okay.'
  }
  return (
    <Box mt={10} mb={8}>
      <VStack>
        <Heading size="xl" color={color}>
          <HStack>
            {icon}
            <Text ml={2}>{headerText}</Text>
          </HStack>
        </Heading>
        <Center textAlign="center">
          <Text fontSize="lg" color={color}>
            {node.text}
          </Text>
        </Center>
        {node.description && (
          <Box mt={6} width="100%">
            <Heading size="md">More Information:</Heading>
            {node.description}
          </Box>
        )}
      </VStack>
    </Box>
  )
}

export default OutcomeCard

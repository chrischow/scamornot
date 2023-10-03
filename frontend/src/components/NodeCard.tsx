import {
  Box,
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text,
  VStack,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react'
import { Node } from '../utils/tree'

const NodeCard = ({ node, onClick }: { node: Node; onClick: () => void }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const isMobile = useBreakpointValue({
    base: true,
    md: false,
  })

  const learnMoreButton = (
    <Button
      variant="outline"
      colorScheme="purple"
      size="xs"
      zIndex={1000}
      onClick={(event) => {
        event.stopPropagation()
        onOpen()
      }}
    >
      Learn more
    </Button>
  )

  return (
    <>
      <Box
        mt={2}
        width="100%"
        borderRadius={8}
        boxShadow="md"
        px={6}
        py={4}
        bgColor="gray.100"
        transition="0.3s"
        _hover={{ boxShadow: 'lg', transition: '0.3s', cursor: 'pointer' }}
        onClick={onClick}
      >
        {!isMobile && (
          <HStack alignItems="start">
            <Text fontSize="lg" fontWeight="semibold" color="gray.700">
              {node.text}
            </Text>
            <Spacer />
            {node.description && <Box>{learnMoreButton}</Box>}
          </HStack>
        )}
        {isMobile && (
          <VStack alignItems="start">
            <Text fontSize="lg" fontWeight="semibold" color="gray.700">
              {node.text}
            </Text>
            {node.description && <Box>{learnMoreButton}</Box>}
          </VStack>
        )}
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>More Information</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{node.description}</ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default NodeCard

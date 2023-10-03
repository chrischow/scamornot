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
  useDisclosure,
} from '@chakra-ui/react'
import { Node } from '../utils/tree'

const NodeCard = ({ node, onClick }: { node: Node; onClick: () => void }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
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
      <HStack alignItems="start">
        <Text fontSize="lg" fontWeight="semibold" color="gray.700">
          {node.text}
        </Text>
        <Spacer />
        {node.description && <Box>
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
        </Box>}
      </HStack>
    </Box>
  )
}

export default NodeCard

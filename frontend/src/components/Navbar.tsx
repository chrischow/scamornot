import {
  Box,
  Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Heading,
  IconButton,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react'
import { RxHamburgerMenu } from 'react-icons/rx'
import { RiGraduationCapFill } from 'react-icons/ri'
import { HiMagnifyingGlass } from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'
import Bold from './text/Bold'

const Navbar = () => {
  const { isOpen: isNavbarOpen, onOpen: onNavbarOpen, onClose: onNavbarClose } = useDisclosure()
  const { isOpen: isInfoOpen, onOpen: onInfoOpen, onClose: onInfoClose } = useDisclosure()
  const navigate = useNavigate()

  const goTo = (page: string) => {
    navigate(page)
    onNavbarClose()
  }

  return (
    <>
      <Box bgColor="gray.900" px={[4, 8]}>
        <HStack h={16} alignItems="center" justifyContent="space-between">
          <IconButton
            size="lg"
            bgColor="gray.900"
            color="gray.300"
            borderColor="gray.300"
            _hover={{
              bgColor: 'gray.700',
            }}
            icon={<RxHamburgerMenu />}
            aria-label="menu"
            onClick={onNavbarOpen}
          />
          <Heading justifySelf="start" color="gray.300">
            <Text as="i" onClick={() => onInfoOpen()} _hover={{ cursor: 'pointer' }}>
              ScamOrNot
            </Text>
          </Heading>
          <IconButton
            size="lg"
            bgColor="gray.900"
            color="gray.900"
            borderColor="gray.300"
            _hover={{
              cursor: 'default',
              bgColor: 'gray.900',
            }}
            icon={<RxHamburgerMenu />}
            aria-label="menu"
          />
        </HStack>
      </Box>
      <Drawer isOpen={isNavbarOpen} placement="left" onClose={onNavbarClose} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Heading size="lg" width="100%" onClick={() => goTo('/')} _hover={{ cursor: 'pointer' }}>
              <Text as="i">ScamOrNot</Text>
            </Heading>
          </DrawerHeader>
          <DrawerBody mt={4}>
            <VStack alignItems="start">
              <HStack
                width="100%"
                fontSize="lg"
                _hover={{ color: 'purple.600', transition: '0.3s', cursor: 'pointer' }}
                transition="0.3s"
                onClick={() => goTo('/')}
              >
                <HiMagnifyingGlass />
                <Text fontWeight="semibold">Scam Check</Text>
              </HStack>
              <HStack
                width="100%"
                mt={2}
                fontSize="lg"
                _hover={{ color: 'purple.600', transition: '0.3s', cursor: 'pointer' }}
                transition="0.3s"
                onClick={() => goTo('/learn')}
              >
                <RiGraduationCapFill />
                <Text fontWeight="semibold">Learn About Scams</Text>
              </HStack>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      {/* Info drawer */}
      <Drawer isOpen={isInfoOpen} placement="top" onClose={onInfoClose} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Center>
              <Heading size="xl" as="i" onClick={() => goTo('/')} _hover={{ cursor: 'pointer' }}>
                ScamOrNot
              </Heading>
            </Center>
          </DrawerHeader>
          <DrawerBody mt={4} mb={8}>
            <VStack>
              <Text fontSize="lg">
                A simple app to let you <Bold>check</Bold> if you've been scammed, and <Bold>learn</Bold> how not to be
                scammed.
              </Text>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default Navbar

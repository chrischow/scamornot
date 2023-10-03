import { Text } from '@chakra-ui/react'
import { ReactNode } from 'react'

const Para = ({ children }: { children: ReactNode }) => {
  return <Text mt={4}>{children}</Text>
}

export default Para

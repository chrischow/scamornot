import { Text } from '@chakra-ui/react'
import { ReactNode } from 'react'

const Bold = ({ children }: { children: ReactNode }) => {
  return <Text as="span" fontWeight='semibold'>{children}</Text>
}

export default Bold

import { Tag } from '@chakra-ui/react'
import { ReactNode } from 'react'

const TacticTag = ({ children }: { children: ReactNode }) => {
  return <Tag colorScheme="red">{children}</Tag>
}

export default TacticTag

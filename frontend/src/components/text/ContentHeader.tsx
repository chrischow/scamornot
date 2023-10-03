import { Heading } from '@chakra-ui/react'
import { ReactNode } from 'react'

const ContentHeader = ({ size = 'md', children }: { children: ReactNode; size?: string }) => {
  return (
    <Heading size={size} fontWeight="semibold" color='gray.600'>
      {children}
    </Heading>
  )
}

export default ContentHeader

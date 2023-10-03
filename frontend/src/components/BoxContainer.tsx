import React from 'react'
import { Box, Center } from '@chakra-ui/react'

const BoxContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <Center>
      <Box width={['100%', '90%', '720px', '960px', '1140px', '1140px']} padding={8}>
        {children}
      </Box>
    </Center>
  )
}

export default BoxContainer

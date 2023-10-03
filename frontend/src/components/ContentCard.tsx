import { Card, CardBody, Center, Heading, Text, VStack } from '@chakra-ui/react'
import { ReactNode } from 'react'

const ContentCard = ({ title, subtitle, icon }: { title: string; subtitle: string; icon: ReactNode }) => {
  return (
    <Card transition="0.3s" _hover={{ boxShadow: 'lg', transition: '0.3s', cursor: 'pointer' }}>
      <CardBody>
        <VStack>
          <Center>
            <Heading size={['2xl', '3xl']} color="purple.500">
              {icon}
            </Heading>
          </Center>
          <Heading mt={[1, 2]} size={['md', 'lg']}>
            {title}
          </Heading>
          <Text mt={[1, 2]} color="gray.600" textAlign="center" width={["80%", '85%', '90%']}>
            {subtitle}
          </Text>
        </VStack>
      </CardBody>
    </Card>
  )
}

export default ContentCard

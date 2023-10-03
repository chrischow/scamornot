import { Heading, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import ContentCard from '../components/ContentCard'
import { PiTreeStructure } from 'react-icons/pi'
import { RiSpyFill } from 'react-icons/ri'

const LearnPage = () => {
  return (
    <>
      <VStack>
        <Heading size={['xl', '2xl']}>Learn About Scams</Heading>
        <Text fontWeight="semibold" fontSize={['md', 'lg']} textAlign="center">
          Understand how scams work and how to not fall prey to them by exploring the topics below.
        </Text>
      </VStack>
      <SimpleGrid mt={8} columns={[1, 2, 2, 2, 3, 3]} spacing={8}>
        <ContentCard
          title="Structure of a Scam"
          subtitle="Learn about the main phases of a scam"
          icon={<PiTreeStructure />}
        />
        <ContentCard
          title="Impersonation"
          subtitle="Learn how scammers assume the identity of someone else"
          icon={<RiSpyFill />}
        />
        <ContentCard
          title="Pressure to Act"
          subtitle="Learn how scammers use pressure to make you do what they want"
          icon={<RiSpyFill />}
        />
      </SimpleGrid>
    </>
  )
}

export default LearnPage

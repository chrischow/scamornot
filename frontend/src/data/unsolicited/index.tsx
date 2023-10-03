import { Heading, Text } from '@chakra-ui/react'
import { Node } from '../../utils/tree'
import { unsolicitedCompany } from './company'
import { unsolicitedGovt } from './govt'
import { unsolicitedKnown } from './known'
import { unsolicitedSomewhatKnown } from './somewhatKnown'
import { unsolicitedUnknown } from './unknown'
import ContentHeader from '../../components/text/ContentHeader'
import Bold from '../../components/text/Bold'

export const unsolicited = new Node('The person contacted me out of the blue.')
unsolicited.addChildren([
  unsolicitedGovt,
  unsolicitedCompany,
  unsolicitedKnown,
  unsolicitedSomewhatKnown,
  unsolicitedUnknown,
])

unsolicited.addDescription(
  <>
    <Heading size="md">Only engage when you are ready.</Heading>
    <Text mt={4}>
      When scammers contact you, it is at a <Bold>time of their choosing</Bold>, hoping to catch you off guard.
    </Text>
    <Text mt={4}>
      If you don't feel you are at your sharpest, ask for a contact number (don't save it!) to call them back when YOU
      are ready.
    </Text>
  </>,
)

unsolicited.addInstruction(<ContentHeader>What was the peron's identity?</ContentHeader>)

import { Heading } from '@chakra-ui/react'
import Bold from '../../components/text/Bold'
import ContentHeader from '../../components/text/ContentHeader'
import Para from '../../components/text/Para'
import { Node } from '../../utils/tree'
import { unsolicitedCompany } from './company'
import { unsolicitedGovt } from './govt'
import { unsolicitedKnown } from './known'
import { unsolicitedSomewhatKnown } from './somewhatKnown'
import { unsolicitedUnknown } from './unknown'

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
    <Para>
      When scammers contact you, it is at a <Bold>time of their choosing</Bold>, hoping to catch you off guard.
    </Para>
    <Para>
      If you don't feel you are at your sharpest, take down the contact number on paper (don't save it in your phone!)
      and contact them when YOU are ready.
    </Para>
  </>,
)

unsolicited.addInstruction(<ContentHeader>What was the person's identity?</ContentHeader>)

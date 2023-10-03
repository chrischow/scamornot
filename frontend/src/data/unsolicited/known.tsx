import { Heading, Text } from '@chakra-ui/react'
import { Node, NodeType } from '../../utils/tree'
import Bold from '../../components/text/Bold'
import Para from '../../components/text/Para'

// Nodes
export const unsolicitedKnown = new Node(
  "The person claimed to be someone you know, but you don't recognise the number.",
)
const refuseInfo = new Node('The person refused to tell me who he/she was.')
const refuseInfoOutcome = new Node(
  'This is likely a scam. Someone who knows you would not avoid being identified.',
  NodeType.SCAM,
)

const recognised = new Node('I recognise the person.')
const recognisedOutcome = new Node(
  'This could be a scam. Get the person to verify their identity through other means before continuing any communication.',
  NodeType.WARNING,
)
const notRecognised = new Node("I don't recognise the person.")
const notRecognisedOutcome = new Node(
  'This could either be a scam, or the person had the wrong number/contact.',
  NodeType.WARNING,
)

// Edges
unsolicitedKnown.addChildren([refuseInfo, recognised, notRecognised])
refuseInfo.addChildren([refuseInfoOutcome])
recognised.addChildren([recognisedOutcome])
notRecognised.addChildren([notRecognisedOutcome])

refuseInfo.addDescription(
  <>
    <Heading size="md">Don't give scammers an identity to take on.</Heading>
    <Para>
      The very first thing that people do when contacting one another is <Bold>identify themselves</Bold>. This is
      especially true when it is expected that you don't already know the person.
    </Para>
    <Para>
      What's happening here is that the other person is waiting for you to <Bold>make an assumption</Bold> about who
      they are, and then pretend to be that person you have in mind.
    </Para>
  </>,
)

recognised.addDescription(
  <>
    <Heading size="md">Are you sure they are who you think they are?</Heading>
    <Para>
      You may{' '}
      <Text as="span" fontStyle="italic">
        think
      </Text>{' '}
      you recognise the person, but why did they contact you using an unknown number?
    </Para>
  </>,
)

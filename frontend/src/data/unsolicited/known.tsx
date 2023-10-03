import { Heading, ListItem, Text, UnorderedList } from '@chakra-ui/react'
import { Node, NodeType } from '../../utils/tree'
import Bold from '../../components/text/Bold'
import Para from '../../components/text/Para'
import ContentHeader from '../../components/text/ContentHeader'

// Nodes
export const unsolicitedKnown = new Node(
  "The person claimed to be someone you know, but you don't recognise the number.",
)
const refuseInfo = new Node('The person refused to tell me who he/she was.')
const refuseInfoOutcome = new Node(
  'This is likely a scam. Someone who knows you would not avoid being identified.',
  NodeType.SCAM,
)

const recognised = new Node('I know who the person is.')
const recognisedVerified = new Node('I have verified through other means that the person is who I think it is.')
const recognisedVerifiedOutcome = new Node(
  'I have verified through other means that the person is who I think it is.',
  NodeType.NOSCAM,
)
const recognisedNotVerified = new Node(
  'I CANNOT verify through other means that the person is who I think it is.',
  NodeType.WARNING,
)
const recognisedNotVerifiedOutcome = new Node(
  'This could be a scam. Get the person to verify their identity through other means before continuing any communication.',
  NodeType.WARNING,
)
const notRecognised = new Node("I don't know who the person is.")
const notRecognisedOutcome = new Node(
  'This could either be a scam, or the person had the wrong number/contact.',
  NodeType.WARNING,
)

// Edges
unsolicitedKnown.addChildren([refuseInfo, recognised, notRecognised])
refuseInfo.addChildren([refuseInfoOutcome])
recognised.addChildren([recognisedVerified, recognisedNotVerified])
recognisedVerified.addChildren([recognisedVerifiedOutcome])
recognisedNotVerified.addChildren([recognisedNotVerifiedOutcome])
notRecognised.addChildren([notRecognisedOutcome])

unsolicitedKnown.addInstruction(
  <>
    <ContentHeader>Who was the person who called you?</ContentHeader>
  </>,
)

refuseInfo.addDescription(
  <>
    <Heading size="md">Don't give scammers an identity to take on.</Heading>
    <Para>
      The person is waiting for you to <Bold>make an assumption</Bold> about who they are, and tell them who that is.
      They will then pretend to be that person you have in mind.
    </Para>
    <Para>Don't give them any name. Instead, keep asking for theirs.</Para>
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

recognised.addInstruction(
  <>
    <ContentHeader>Have you verified who this person is?</ContentHeader>
    <Para>
      Go through other channels to verify this person's identity. For example:
      <UnorderedList mt={4}>
        <ListItem>Call the person's phone directly, if you have their real number</ListItem>
        <ListItem>Call the person's alternate numbers</ListItem>
        <ListItem>Call someone close to the person</ListItem>
        <ListItem>Meet the person online or in-person to ask</ListItem>
        <ListItem>Ask a mutual friend if the person contacted them too</ListItem>
      </UnorderedList>
    </Para>
  </>,
)

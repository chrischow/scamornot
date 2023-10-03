import { ListItem, Text, UnorderedList } from '@chakra-ui/react'
import ContentHeader from '../../components/text/ContentHeader'
import Para from '../../components/text/Para'
import { Node } from '../../utils/tree'
import {
  generateInfoSubtree,
  generateOtpSubtree,
  generateSignupSubtree,
  generateSoftwareSubtree,
  generateTransferSubtree,
} from '../extraction'

// Nodes
export const unsolicitedSomewhatKnown = new Node(
  'I have seen the person around online, but have never chatted with him/her before.',
)
const offer = new Node('The person had an enticing offer or proposal.')
const assistance = new Node('The person was asking for assistance of some kind.')
const software = generateSoftwareSubtree()
const transfer = generateTransferSubtree()
const otp = generateOtpSubtree()
const info = generateInfoSubtree()
const signup = generateSignupSubtree()

// Edges
unsolicitedSomewhatKnown.addChildren([offer, assistance])
offer.addChildren([software, transfer, otp, info, signup])
assistance.addChildren([software, transfer, otp, info, signup])

// Content
unsolicitedSomewhatKnown.addInstruction(
  <>
    <ContentHeader>At some point, did the person bring up any of the topics below?</ContentHeader>
    <Para>
      The person may have discussed other personal or casual topics with you. We're more interested in the topics below.
    </Para>
  </>,
)

offer.addDescription(
  <>
    <Text>
      Enticing offers or proposals could entail (but are not limited to) the following:
      <UnorderedList mt={4}>
        <ListItem mt={2}>Job opportunities with high pay and low effort</ListItem>
        <ListItem mt={2}>Investment opportunities with abnormally high returns</ListItem>
        <ListItem mt={2}>Exclusive discounts or deals</ListItem>
      </UnorderedList>
    </Text>
  </>,
)

offer.addInstruction(
  <>
    <ContentHeader>As part of the offer, did the person ask you to do any of the following things?</ContentHeader>
  </>,
)

assistance.addDescription(
  <>
    <Text>
      Requests for assistance could entail (but are not limited to) the following:
      <UnorderedList mt={4}>
        <ListItem mt={2}>Requests for money to tide them through hard times</ListItem>
        <ListItem mt={2}>Requests to help transfer money to someone else</ListItem>
        <ListItem mt={2}>Requests to help purchase something</ListItem>
        <ListItem mt={2}>Requests to provide your info</ListItem>
      </UnorderedList>
    </Text>
  </>,
)

assistance.addInstruction(
  <>
    <ContentHeader>
      As part of the request for assistance, did the person ask you to do any of the following things?
    </ContentHeader>
  </>,
)

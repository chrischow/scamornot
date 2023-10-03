import { Heading, ListItem, OrderedList, Tag, Text } from '@chakra-ui/react'
import Bold from '../../components/text/Bold'
import ContentHeader from '../../components/text/ContentHeader'
import Para from '../../components/text/Para'
import { NOT_SCAM_MESSAGE } from '../../contants'
import { Node, NodeType } from '../../utils/tree'
import {
  generateInfoSubtree,
  generateOtpSubtree,
  generateSignupSubtree,
  generateSoftwareSubtree,
  generateTransferSubtree,
} from '../extraction'

// Nodes (depth-first)
export const unsolicitedGovt = new Node('The person claimed to be from the government.')
const personalDetailsUnknown = new Node('This person did not know my personal details.')
const personalDetailsUnknownOutcome = new Node('This could be a scam.', NodeType.WARNING)
const personalDetailsKnown = new Node('This person knew my personal details.')
const provideInfo = new Node('The person was just providing me with information. No follow-up actions were required.')
const infoSaveContact = new Node('The person asked me to save the number as a contact.')
const infoSaveContactOutcome = new Node('This could be the start of a scam. Do not save the contact.', NodeType.WARNING)
const infoNoSaveContact = new Node('The person DID NOT ask me to save the number as a contact.')
const infoNoSaveContactOutcome = new Node(NOT_SCAM_MESSAGE, NodeType.NOSCAM)

const govtFollowUpAction = new Node('The person mentioned that some follow-up actions were required.')
const followUpSaveContact = new Node('The person asked me to save the number as a contact.')
const followUpSaveContactOutcome = new Node(
  'This could be the start of a scam. Do not save the contact.',
  NodeType.WARNING,
)
const software = generateSoftwareSubtree()
const transfer = generateTransferSubtree()
const otp = generateOtpSubtree()
const info = generateInfoSubtree()
const signup = generateSignupSubtree()

// Edges
unsolicitedGovt.addChildren([personalDetailsKnown, personalDetailsUnknown])
personalDetailsKnown.addChildren([provideInfo, govtFollowUpAction])
personalDetailsUnknown.addChildren([personalDetailsUnknownOutcome])
provideInfo.addChildren([infoSaveContact, infoNoSaveContact])
infoSaveContact.addChildren([infoSaveContactOutcome])
infoNoSaveContact.addChildren([infoNoSaveContactOutcome])
govtFollowUpAction.addChildren([followUpSaveContact, software, transfer, otp, info, signup])
followUpSaveContact.addChildren([followUpSaveContactOutcome])

// Content
unsolicitedGovt.addDescription(
  <>
    <Heading size="md">Be careful of impersonators.</Heading>
    <Para>
      Always check whether the person was using an <Bold>official number</Bold> to contact you. There is no reason why a
      government official would use a personal number or an unofficial number for official purposes.
    </Para>
    <Para>Other things that impersonators of government officials may do:</Para>
    <OrderedList mt={4}>
      <ListItem>Speak with a commanding voice to appear authoritative</ListItem>
      <ListItem>Make claims that you are in trouble with the law</ListItem>
      <ListItem>Quote law enforcement agencies to issue subtle threats</ListItem>
      <ListItem>If it is a video call:</ListItem>
      <OrderedList>
        <ListItem>Wear a uniform</ListItem>
        <ListItem>Put up posters with the logo of the government agency they are claiming to be from</ListItem>
      </OrderedList>
    </OrderedList>
    <Para>
      Learn more about <Tag colorScheme="red">Impersonation</Tag>.
    </Para>
  </>,
)

unsolicitedGovt.addInstruction(
  <>
    <ContentHeader>Did they know your personal details?</ContentHeader>
    <Para>
      Government officials who contact you should know who you are. As the recipient of a message or call, you{' '}
      <Bold>do not</Bold> need to verify your identity.
    </Para>
  </>,
)

personalDetailsKnown.addInstruction(
  <ContentHeader>Were they just providing information, or did they ask you to do something?</ContentHeader>,
)

personalDetailsKnown.addDescription(
  <Text>
    Knowing your personal details does not make the person legitimate. Your details could have been leaked by other
    organisations or collected from somewhere else.
  </Text>,
)

personalDetailsUnknownOutcome.addDescription(
  <>
    <Para>
      Government officials usually do not cold call citizens, unless it's for surveys or public education campaigns.
    </Para>
    <Para>
      If they do contact you for matters pertaining primarily to you or your family, they <Bold>should</Bold> already
      have your personal details. You <Bold>do not</Bold> need to verify your identity.
    </Para>
  </>,
)

provideInfo.addInstruction(
  <>
    <ContentHeader>Did they ask you to save their contact?</ContentHeader>
    <Para>
      Only save someone's contact if you are <Bold>very sure</Bold> that they are who they say they are.
    </Para>
  </>,
)

infoSaveContactOutcome.addDescription(
  <>
    <Para>
      This is dangerous because the next time the person contacts you, their contact appears as something that seems
      trustworthy, like "Police Officer Tan" or "Shopee Sales Officer Aisha". But, that may not be the person's actual
      identity.
    </Para>
    <Para>
      There is generally <Bold>no need</Bold> to save the contact of a legitimate organisation. You can always go to the
      official source to get the contact number. Legitimate organisations list their contact numbers on their website.
      Even solo businesspeople have their official business numbers listed on some page (e.g. eCommerce platform profile
      page).
    </Para>
  </>,
)

followUpSaveContactOutcome.addDescription(
  <>
    <Para>
      This is dangerous because the next time the person contacts you, their contact appears as something that seems
      trustworthy, like "Police Officer Tan" or "Shopee Sales Officer Aisha". But, that may not be the person's actual
      identity.
    </Para>
    <Para>
      There is generally <Bold>no need</Bold> to save the contact of a legitimate organisation. You can always go to the
      official source to get the contact number. Legitimate organisations list their contact numbers on their website.
      Even solo businesspeople have their official business numbers listed on some page (e.g. eCommerce platform profile
      page).
    </Para>
  </>,
)

govtFollowUpAction.addInstruction(
  <>
    <ContentHeader>What did the person ask you to do?</ContentHeader>
    <Para>
      There may have been other things the person asked for. What we're more interested in are the things listed below.
    </Para>
  </>,
)

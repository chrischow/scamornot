import TacticTag from '../../components/TacticTag'
import Bold from '../../components/text/Bold'
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
import { unsolicitedGovt } from './govt'

// Nodes
export const unsolicitedCompany = new Node('The person claimed to be from a company.')

const account = new Node('The person was contacting me about something related to my account with the company.')

const promotion = new Node('The person was promoting a product or service.')
const offer = new Node('The person had an enticing offer.')
const software = generateSoftwareSubtree()
const transfer = generateTransferSubtree()
const otp = generateOtpSubtree()
const info = generateInfoSubtree()
const signup = generateSignupSubtree()

// Edges
unsolicitedCompany.addChildren([account, promotion, offer])
account.addChildren(unsolicitedGovt.children)
promotion.addChildren([software, transfer, otp, info, signup])
offer.addChildren([software, transfer, otp, info, signup])

// Content
unsolicitedCompany.addDescription(
  <>
    <ContentHeader>Be careful of impersonators.</ContentHeader>
    <Para>
      Always check whether the person was using an <Bold>official number</Bold> to contact you. There is no reason why
      business staff would use a personal number or an unofficial number for official business.
    </Para>
    <Para>
      Learn more about <TacticTag>Impersonation</TacticTag>.
    </Para>
  </>,
)
unsolicitedCompany.addInstruction(
  <>
    <ContentHeader>Did the person contact you regarding any of the topics below?</ContentHeader>
  </>,
)

account.addInstruction(
  <>
    <ContentHeader>Did they know your personal details?</ContentHeader>
    <Para>
      Company staff who contact you about your account should know who you are. As the <Bold>recipient</Bold> of a
      message or call, you <Bold>do not</Bold> need to verify your identity.
    </Para>
  </>,
)

promotion.addInstruction(
  <>
    <ContentHeader>
      As part of the product or service promotion, did the person ask you to do any of the following things?
    </ContentHeader>
  </>,
)

offer.addInstruction(
  <>
    <ContentHeader>As part of the offer, did the person ask you to do any of the following things?</ContentHeader>
  </>,
)

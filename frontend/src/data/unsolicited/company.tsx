import { Heading, Tag } from '@chakra-ui/react'
import Bold from '../../components/text/Bold'
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
    <Heading size="md">Be careful of impersonators.</Heading>
    <Para>
      Always check whether the person was using an <Bold>official number</Bold> to contact you. There is no reason why
      business staff would use a personal number or an unofficial number for official business.
    </Para>
    <Para>
      Learn more about <Tag colorScheme="red">Impersonation</Tag>.
    </Para>
  </>,
)

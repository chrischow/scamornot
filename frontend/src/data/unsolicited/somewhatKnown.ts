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
const promotion = new Node('The person was promoting a product or service.')
const offer = new Node('The person had an enticing offer or proposal.')
const software = generateSoftwareSubtree()
const transfer = generateTransferSubtree()
const otp = generateOtpSubtree()
const info = generateInfoSubtree()
const signup = generateSignupSubtree()

// Edges
unsolicitedSomewhatKnown.addChildren([promotion, offer])
promotion.addChildren([software, transfer, otp, info, signup])
offer.addChildren([software, transfer, otp, info, signup])

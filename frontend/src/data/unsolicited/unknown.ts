import { Node } from '../../utils/tree'
import {
  generateInfoSubtree,
  generateOtpSubtree,
  generateSignupSubtree,
  generateSoftwareSubtree,
  generateTransferSubtree,
} from '../extraction'

// Nodes
export const unsolicitedUnknown = new Node('I don\'t know the person at all.')
const promotion = new Node('The person was promoting a product or service.')
const offer = new Node('The person had an enticing offer.')
const software = generateSoftwareSubtree()
const transfer = generateTransferSubtree()
const otp = generateOtpSubtree()
const info = generateInfoSubtree()
const signup = generateSignupSubtree()

// Edges
unsolicitedUnknown.addChildren([promotion, offer])
promotion.addChildren([software, transfer, otp, info, signup])
offer.addChildren([software, transfer, otp, info, signup])

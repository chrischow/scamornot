import { NOT_SCAM_MESSAGE } from '../../contants'
import { Node, NodeType } from '../../utils/tree'

const generateSignupSubtree = () => {
  // Nodes
  const signup = new Node('I was asked to sign up for an account.')
  const signupReasonNotOk = new Node(
    "I don't actually know why I need to sign up for an account OR I also don't think it makes sense to sign up for the account.",
  )
  const signupReasonNotOkOutcome = new Node('Find out more info before signing up.', NodeType.WARNING)
  const signupReasonOk = new Node('The reason I was given for signing up makes sense.')

  const websiteFamiliar = new Node('The website appears to be owned by an organisation you are familiar with.')
  const websiteFamiliarOfficial = new Node('The website you are at is the OFFICIAL website for the organisation.')
  const websiteFamiliarOfficialOutcome = new Node(NOT_SCAM_MESSAGE, NodeType.NOSCAM)
  const websiteFamiliarNotOfficial = new Node(
    'The website you are at IS NOT the OFFICIAL website for the organisation.',
  )
  const websiteFamiliarNotOfficialOutcome = new Node(
    'This is likely a scam. NEVER provide info or make any transaction on any non-official websites.',
    NodeType.SCAM,
  )

  const websiteNotFamiliar = new Node('The website appears to be owned by an organisation you are NOT familiar with.')
  const websiteNotFamiliarLegit = new Node(
    'The organisation appears to be a reputable one that may other people use or have reviewed.',
  )
  const websiteNotFamiliarLegitOutcome = new Node('This may not be a scam, but proceed with caution.', NodeType.WARNING)
  const websiteNotFamiliarNotLegit = new Node(
    'The organisation does NOT appear to be reputable or has a bad repuation. There is also very little information on the organisation.',
  )
  const websiteNotFamiliarNotLegitOutcome = new Node(
    'This is likely a scam. DO NOT sign up for an account.',
    NodeType.SCAM,
  )

  // Edges
  signup.addChildren([signupReasonOk, signupReasonNotOk])
  signupReasonNotOk.addChildren([signupReasonNotOkOutcome])
  signupReasonOk.addChildren([websiteFamiliar, websiteNotFamiliar])
  websiteFamiliar.addChildren([websiteFamiliarOfficial, websiteFamiliarNotOfficial])
  websiteFamiliarOfficial.addChildren([websiteFamiliarOfficialOutcome])
  websiteFamiliarNotOfficial.addChildren([websiteFamiliarNotOfficialOutcome])
  websiteNotFamiliar.addChildren([websiteNotFamiliarLegit, websiteNotFamiliarNotLegit])
  websiteNotFamiliarLegit.addChildren([websiteNotFamiliarLegitOutcome])
  websiteNotFamiliarNotLegit.addChildren([websiteNotFamiliarNotLegitOutcome])

  return signup
}

export default generateSignupSubtree

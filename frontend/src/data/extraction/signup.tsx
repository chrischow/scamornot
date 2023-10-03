import TacticTag from '../../components/TacticTag'
import ContentHeader from '../../components/text/ContentHeader'
import Para from '../../components/text/Para'
import { NOT_SCAM_MESSAGE } from '../../contants'
import { Node, NodeType } from '../../utils/tree'

const generateSignupSubtree = () => {
  // Nodes
  const signup = new Node('I was asked to sign up for an account.')
  const signupReasonNotOk = new Node("I don't think it makes sense to sign up for the account.")
  const signupReasonNotOkOutcome = new Node('Find out more info before signing up.', NodeType.WARNING)
  const signupReasonOk = new Node('The reason I was given for signing up makes sense.')

  const websiteLegit = new Node('I have verified that this is a legitimate, reputable organisation.')
  const websiteLegitOfficial = new Node('The website you are at is the OFFICIAL website for the organisation.')
  const websiteLegitOfficialOutcome = new Node(NOT_SCAM_MESSAGE, NodeType.NOSCAM)
  const websiteLegitNotOfficial = new Node('The website you are at IS NOT the OFFICIAL website for the organisation.')
  const websiteLegitNotOfficialOutcome = new Node(
    'This is likely a scam. NEVER provide info or make any transaction on any non-official websites.',
    NodeType.SCAM,
  )

  const websiteNotLegit = new Node('I have verified that this is NOT a legitimate and/or reputable organisation.')
  const websiteNotLegitOutcome = new Node('This may not be a scam, but proceed with caution.', NodeType.WARNING)

  // Edges
  signup.addChildren([signupReasonOk, signupReasonNotOk])
  signupReasonNotOk.addChildren([signupReasonNotOkOutcome])
  signupReasonOk.addChildren([websiteLegit, websiteNotLegit])
  websiteLegit.addChildren([websiteLegitOfficial, websiteLegitNotOfficial])
  websiteLegitOfficial.addChildren([websiteLegitOfficialOutcome])
  websiteLegitNotOfficial.addChildren([websiteLegitNotOfficialOutcome])
  websiteNotLegit.addChildren([websiteNotLegitOutcome])

  // Content
  signup.addInstruction(
    <>
      <ContentHeader>Is it clear why you NEED to sign up for an account?</ContentHeader>
      <Para>
        You should only sign up for an account when it is needed to receive/use some kind of services from an
        organisation.
      </Para>
    </>,
  )

  signupReasonOk.addInstruction(
    <>
      <ContentHeader>Is this a legitimate and reputable organisation that you are signing up with?</ContentHeader>
      <Para>You should only deal with trusted organisations that are known to treat its customers well.</Para>
    </>,
  )

  websiteLegit.addInstruction(
    <>
      <ContentHeader>Are you on the organisation's official website?</ContentHeader>
      <Para>
        The website may state the company's name, but that does not mean that it is the official website for that
        company.
      </Para>
      <Para>
        See our guide on <TacticTag>Phishing</TacticTag> to find out how to differentiate an official website from a
        fake one.
      </Para>
    </>,
  )

  return signup
}

export default generateSignupSubtree

import TacticTag from '../../components/TacticTag'
import Bold from '../../components/text/Bold'
import ContentHeader from '../../components/text/ContentHeader'
import Para from '../../components/text/Para'
import { NOT_SCAM_MESSAGE } from '../../contants'
import { Node, NodeType } from '../../utils/tree'

const generateInfoSubtree = () => {
  // Nodes
  const info = new Node('I was asked for personal information.')
  const infoReasonNotOk = new Node("I don't think it makes sense to provide the information.")
  const infoReasonNotOkOutcome = new Node(
    'Find out more about the request before providing the information.',
    NodeType.WARNING,
  )
  const infoReasonOk = new Node('The reason I was given for providing the information makes sense.')

  const direct = new Node('I was asked for information directly via a call or message.')
  const directOfficial = new Node(
    'The person is contacting me via official means (e.g. official number, official email).',
  )
  const directOfficialAppropriate = new Node(
    'The person is asking me for information that is appropriate for my request.',
  )
  const directOfficialAppropriateOutcome = new Node(NOT_SCAM_MESSAGE, NodeType.NOSCAM)
  const directOfficialNotAppropriate = new Node(
    'The person is asking me for additional information that is not appropriate for the request.',
  )
  const directOfficialNotAppropriateOutcome = new Node(
    'This could be a scam. Do not provide more information than necessary.',
    NodeType.WARNING,
  )

  const directNotOfficial = new Node(
    'The person is NOT contacting me via official means (e.g. official number, official email).',
  )
  const directNotOfficialNotSensitive = new Node('The person is NOT asking for some sensitive information.')
  const directNotOfficialSensitive = new Node('The person is asking for some sensitive information.')

  const directNotOfficialNotSensitiveOutcome = new Node(
    'This could be a scam, or at least the start of one.',
    NodeType.WARNING,
  )
  const directNotOfficialSensitiveOutcome = new Node(
    'This is likely a scam. DO NOT provide any information.',
    NodeType.SCAM,
  )

  const website = new Node('I was directed to a website to key in my information.')
  const websiteOfficial = new Node(
    'The website I am on is the OFFICIAL website for the organisation that I intend to give information to.',
  )
  const websiteOfficialAppropriate = new Node(
    'The website is asking for information that is appropriate for my request.',
  )
  const websiteOfficialAppropriateOutcome = new Node(NOT_SCAM_MESSAGE, NodeType.NOSCAM)
  const websiteOfficialNotAppropriate = new Node(
    'The website is asking for additional information that is not appropriate for my request.',
  )
  const websiteOfficialNotAppropriateOutcome = new Node(
    'This could be a scam. Do not provide more information than necessary.',
    NodeType.WARNING,
  )

  const websiteNotOfficial = new Node(
    'This is NOT THE OFFICIAL WEBSITE for the organisation that I intend to give information to.',
  )
  const websiteNotOfficialOutcome = new Node(
    'This is likely a scam. DO NOT provide any information. Instead, close the browser window.',
    NodeType.SCAM,
  )

  // Edges
  info.addChildren([infoReasonOk, infoReasonNotOk])
  infoReasonNotOk.addChildren([infoReasonNotOkOutcome])
  infoReasonOk.addChildren([direct, website])
  direct.addChildren([directOfficial, directNotOfficial])
  directOfficial.addChildren([directOfficialAppropriate, directOfficialNotAppropriate])
  directOfficialAppropriate.addChildren([directOfficialAppropriateOutcome])
  directOfficialNotAppropriate.addChildren([directOfficialNotAppropriateOutcome])
  directNotOfficial.addChildren([directNotOfficialNotSensitive, directNotOfficialSensitive])
  directNotOfficialSensitive.addChildren([directNotOfficialSensitiveOutcome])
  directNotOfficialNotSensitive.addChildren([directNotOfficialNotSensitiveOutcome])
  website.addChildren([websiteOfficial, websiteNotOfficial])
  websiteOfficial.addChildren([websiteOfficialAppropriate, websiteOfficialNotAppropriate])
  websiteOfficialAppropriate.addChildren([websiteOfficialAppropriateOutcome])
  websiteOfficialNotAppropriate.addChildren([websiteOfficialNotAppropriateOutcome])
  websiteNotOfficial.addChildren([websiteNotOfficialOutcome])

  // Content
  info.addInstruction(
    <>
      <ContentHeader>Is it clear why you NEED to provide your personal info?</ContentHeader>
      <Para>
        You should only provide info if it is absolutely necessary to proceed. You may given silly reasons like "because
        it is required" or "technical requirement". That is not an answer. Pressure the person for a proper one that you
        can understand.
      </Para>
    </>,
  )

  infoReasonOk.addInstruction(<ContentHeader>How were you asked for the info?</ContentHeader>)

  direct.addInstruction(
    <>
      <ContentHeader>Did the person contact you through official channels?</ContentHeader>
      <Para>
        If the person represents an organisation, you can check the official website or business listing for the
        official contact number.
      </Para>
      <Para>
        If the person does not represent an organisation, then there are <Bold>no official means here</Bold>. Besides,
        why are they even asking for your information?
      </Para>
    </>,
  )

  directOfficial.addInstruction(
    <>
      <ContentHeader>
        Was the person asking you for information that is appropriate for the request or issue?
      </ContentHeader>
      <Para>
        Your account username or basic contact details (e.g. email) would be sufficient for most service requests. There
        should be no need to provide sensitive information like login credentials for any account, bank account numbers,
        credit card details, addresses, or passport numbers.
      </Para>
    </>,
  )

  directNotOfficial.addInstruction(
    <>
      <ContentHeader>Is the person asking you for any sensitive information?</ContentHeader>
      <Para>
        Sensitive information includes things like login credentials for any account, bank account numbers, credit card
        details, addresses, or passport numbers - things that you wouldn't usually tell anyone else.
      </Para>
    </>,
  )

  directNotOfficialNotSensitiveOutcome.addDescription(
    <>
      <Para>
        This could be a harmless request, or it could be a scammer slowly collecting more and more information to avoid
        scaring you away too early on.
      </Para>
    </>,
  )

  website.addInstruction(
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

  websiteOfficial.addInstruction(
    <>
      <ContentHeader>
        Was the website asking for information that is appropriate for the request or issue?
      </ContentHeader>
      <Para>
        Your account username or basic contact details (e.g. email) would be sufficient for most service requests. There
        should be no need to provide sensitive information like login credentials for any account, bank account numbers,
        credit card details, addresses, or passport numbers.
      </Para>
    </>,
  )

  return info
}

export default generateInfoSubtree

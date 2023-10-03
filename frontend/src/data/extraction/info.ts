import { NOT_SCAM_MESSAGE } from '../../contants'
import { Node, NodeType } from '../../utils/tree'

const generateInfoSubtree = () => {
  // Nodes
  const info = new Node('I was asked for personal information.')
  const infoReasonNotOk = new Node(
    "I don't actually know why I need to provide the information OR I also don't think it makes sense to provide the information.",
  )
  const infoReasonNotOkOutcome = new Node(
    'Find out more about the request before providing the information.',
    NodeType.WARNING,
  )
  const infoReasonOk = new Node('The reason I was given for providing the information makes sense.')

  const direct = new Node('I was asked for information directly via a call or message.')
  const directOfficial = new Node(
    'The person is contacting me via official means (e.g. official number, official email).',
  )
  const directOfficialRelevant = new Node('The person is asking me for information that is relevant to my request.')
  const directOfficialRelevantOutcome = new Node(NOT_SCAM_MESSAGE, NodeType.NOSCAM)
  const directOfficialNotRelevant = new Node(
    'The person is asking me for additional information that is not relevant to my request.',
  )
  const directOfficialNotRelevantOutcome = new Node(
    'This could be a scam. Do not provide more information than necessary.',
    NodeType.WARNING,
  )

  const directNotOfficial = new Node(
    'The person is NOT contacting me via official means (e.g. official number, official email).',
  )
  const directNotOfficialOutcome = new Node('This is likely a scam. DO NOT provide any information.', NodeType.SCAM)

  const website = new Node('I was directed to a website to key in my information.')
  const websiteOfficial = new Node(
    'The website I am on is the OFFICIAL website for the organisation that I intend to give information to.',
  )
  const websiteOfficialRelevant = new Node('The website is asking for information that is relevant to my request.')
  const websiteOfficialRelevantOutcome = new Node(NOT_SCAM_MESSAGE, NodeType.NOSCAM)
  const websiteOfficialNotRelevant = new Node(
    'The website is asking for additional information that is not relevant to my request.',
  )
  const websiteOfficialNotRelevantOutcome = new Node(
    'This could be a scam. Do not provide more information than necessary.',
    NodeType.WARNING,
  )

  const websiteNotOfficial = new Node(
    'This is NOT THE OFFICIAL WEBSITE for the organisation that I intend to give information to.',
  )
  const websiteNotOfficialOutcome = new Node(
    'This is likely a scam. DO NOT provide any information, and close the browser window.',
    NodeType.SCAM,
  )

  // Edges
  info.addChildren([infoReasonOk, infoReasonNotOk])
  infoReasonNotOk.addChildren([infoReasonNotOkOutcome])
  infoReasonOk.addChildren([direct, website])
  direct.addChildren([directOfficial, directNotOfficial])
  directOfficial.addChildren([directOfficialRelevant, directOfficialNotRelevant])
  directOfficialRelevant.addChildren([directOfficialRelevantOutcome])
  directOfficialNotRelevant.addChildren([directOfficialNotRelevantOutcome])
  directNotOfficial.addChildren([directNotOfficialOutcome])
  website.addChildren([websiteOfficial, websiteNotOfficial])
  websiteOfficial.addChildren([websiteOfficialRelevant, websiteOfficialNotRelevant])
  websiteOfficialRelevant.addChildren([websiteOfficialRelevantOutcome])
  websiteOfficialNotRelevant.addChildren([websiteOfficialNotRelevantOutcome])
  websiteNotOfficial.addChildren([websiteNotOfficialOutcome])

  return info
}

export default generateInfoSubtree

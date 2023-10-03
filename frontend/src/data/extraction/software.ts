import { NOT_SCAM_MESSAGE } from '../../contants'
import { Node, NodeType } from '../../utils/tree'

const generateSoftwareSubtree = (): Node => {
  // Nodes
  const software = new Node('I was asked to install some app or software.')
  const softwareReasonNotOk = new Node(
    "I don't actually know why I need to download the softare OR I also don't think it makes sense to download the softare.",
  )
  const softwareReasonNotOkOutcome = new Node(
    'Find out more info before installing the app or software.',
    NodeType.WARNING,
  )
  const softwareReasonOk = new Node('The reason I was given for downloading the software makes sense.')
  const phoneApp = new Node('I was asked to install an app on my phone.')
  const phoneAppOfficial = new Node('This is an official app from the App Store or Play Store.')
  const phoneAppDevLegit = new Node('The developer for the app seems legitimate.')
  const phoneAppDevLegitOutcome = new Node(NOT_SCAM_MESSAGE, NodeType.NOSCAM)
  const phoneAppDevNotLegit = new Node('The developer for the app DOES NOT seem legitimate.')
  const phoneAppDevNotLegitOutcome = new Node('This could be malware. DO NOT install it.', NodeType.SCAM)
  const phoneAppNotOfficial = new Node('This is NOT an official app from the App Store or Play Store.')
  const phoneAppNotOfficialOutcome = new Node('This could be malware. DO NOT install it.', NodeType.SCAM)

  const computerApp = new Node('I was asked to install software on my computer.')
  const computerAppOfficial = new Node('The software is downloaded from a legitimate or reputable source.')
  const computerAppDevLegit = new Node('The company that developed this software seems legitimate.')
  const computerAppDevLegitOutcome = new Node(NOT_SCAM_MESSAGE, NodeType.NOSCAM)
  const computerAppDevNotLegit = new Node('The company that developed this softare DOES NOT seem legitimate.')
  const computerAppDevNotLegitOutcome = new Node('This could be malware. DO NOT install it.', NodeType.SCAM)
  const computerAppNotOfficial = new Node('The software is NOT downloaded from a legitimate or reputable source.')
  const computerAppNotOfficialOutcome = new Node('This could be malware. DO NOT install it.', NodeType.SCAM)

  // Edges
  software.addChildren([softwareReasonOk, softwareReasonNotOk])
  softwareReasonNotOk.addChildren([softwareReasonNotOkOutcome])
  softwareReasonOk.addChildren([phoneApp, computerApp])
  phoneApp.addChildren([phoneAppOfficial, phoneAppNotOfficial])
  phoneAppNotOfficial.addChildren([phoneAppNotOfficialOutcome])
  phoneAppOfficial.addChildren([phoneAppDevLegit, phoneAppDevNotLegit])
  phoneAppDevLegit.addChildren([phoneAppDevLegitOutcome])
  phoneAppDevNotLegit.addChildren([phoneAppDevNotLegitOutcome])

  computerApp.addChildren([computerAppOfficial, computerAppNotOfficial])
  computerAppNotOfficial.addChildren([computerAppNotOfficialOutcome])
  computerAppOfficial.addChildren([computerAppDevLegit, computerAppDevNotLegit])
  computerAppDevLegit.addChildren([computerAppDevLegitOutcome])
  computerAppDevNotLegit.addChildren([computerAppDevNotLegitOutcome])

  return software
}

export default generateSoftwareSubtree

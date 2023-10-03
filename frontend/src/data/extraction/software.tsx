import { ListItem, OrderedList } from '@chakra-ui/react'
import Bold from '../../components/text/Bold'
import ContentHeader from '../../components/text/ContentHeader'
import Para from '../../components/text/Para'
import { NOT_SCAM_MESSAGE } from '../../contants'
import { Node, NodeType } from '../../utils/tree'

const generateSoftwareSubtree = (): Node => {
  // Nodes
  const software = new Node('I was asked to install some app or software.')
  const softwareReasonNotOk = new Node("I don't think it makes sense to download the software.")
  const softwareReasonNotOkOutcome = new Node(
    'Find out more info before installing the app or software.',
    NodeType.WARNING,
  )
  const softwareReasonOk = new Node('The reason I was given for downloading the software makes sense.')
  const phoneApp = new Node('I was asked to install an app on my phone.')
  const phoneAppOfficial = new Node('This is an official app from the App Store or Play Store.')
  const phoneAppDevLegit = new Node('The app seems legitimate.')
  const phoneAppDevLegitOutcome = new Node(NOT_SCAM_MESSAGE, NodeType.NOSCAM)
  const phoneAppDevNotLegit = new Node('The app DOES NOT seem legitimate, or I cannot tell whether it is legitimate.')
  const phoneAppDevNotLegitOutcome = new Node('This could contain malware. DO NOT install it.', NodeType.SCAM)
  const phoneAppNotOfficial = new Node('This is NOT an official app from the App Store or Play Store.')
  const phoneAppNotOfficialOutcome = new Node('This could contain malware. DO NOT install it.', NodeType.SCAM)

  const computerApp = new Node('I was asked to install software on my computer.')
  const computerAppOfficial = new Node(
    'The software was made available for download from a legitimate or reputable source.',
  )
  const computerAppDevLegit = new Node('The software seems legitimate.')
  const computerAppDevLegitOutcome = new Node(NOT_SCAM_MESSAGE, NodeType.NOSCAM)
  const computerAppDevNotLegit = new Node(
    'The software DOES NOT seem legitimate, or I cannot tell whether it is legitimate.',
  )
  const computerAppDevNotLegitOutcome = new Node('This could contain malware. DO NOT install it.', NodeType.SCAM)
  const computerAppNotOfficial = new Node(
    'The software was NOT made available for download from a legitimate or reputable source.',
  )
  const computerAppNotOfficialOutcome = new Node('This could contain malware. DO NOT install it.', NodeType.SCAM)

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

  // Content
  software.addInstruction(
    <>
      <ContentHeader>Is it clear why you NEED to download the software?</ContentHeader>
      <Para>
        Nowadays, almost everything can be done via a website. There has to be a good reason why you need to go through
        the trouble of installing an app or software to do something simple.
      </Para>
      <Para>
        <Bold>Some terrible reasons to install an app / software:</Bold> To complete a payment, to verify your identity
        (unless it's the real SingPass app), to provide personal information, to claim a discount/offer/prize.
      </Para>
    </>,
  )

  softwareReasonOk.addInstruction(
    <ContentHeader>What device did the person ask you to install the software on?</ContentHeader>,
  )

  phoneApp.addInstruction(
    <ContentHeader>
      Is this an official app that can be downloaded from the App Store (for iOS) or Play Store (for Android)?
    </ContentHeader>,
  )

  phoneAppOfficial.addInstruction(
    <>
      <ContentHeader>Does the app seem legitimate?</ContentHeader>
      <Para>
        To tell whether an app is legitimate, look at:
        <OrderedList>
          <ListItem mt={2}>
            <Bold>The number of downloads:</Bold> If there are very few people who have downloaded it, it may be a
            malicious app.
          </ListItem>
          <ListItem mt={2}>
            <Bold>The reviews:</Bold> Sometimes, people use reviews to warn others directly when the app contains
            malware.
          </ListItem>
          <ListItem mt={2}>
            <Bold>The developer:</Bold> Is the developer a legitimate company?
          </ListItem>
          <ListItem mt={2}>
            <Bold>Permissions:</Bold> The permissions tell you all the data you're giving up. Are you comfortable with
            providing the developer with that data?
          </ListItem>
        </OrderedList>
      </Para>
    </>,
  )

  phoneAppDevNotLegitOutcome.addDescription(
    <>
      <Para>
        Never install apps from suspicious developers. Apps that are relatively safer to install and use are those that
        are developed by trusted entities, and independently used by a lot of other people AND verified to be safe.
      </Para>
    </>,
  )

  phoneAppNotOfficialOutcome.addDescription(
    <>
      <Para>
        NEVER install apps that are not found on the App Store or Play Store. These apps do not go through any safety
        checks by the respective Stores, and you don't know what permissions you are giving to the app{' '}
        <Bold>before</Bold> you install it.
      </Para>
    </>,
  )

  computerApp.addInstruction(
    <>
      <ContentHeader>Did the the website for downloading the software seem legitimate?</ContentHeader>
      <Para>
        Places that are more legitimate for downloading software include:
        <OrderedList mt={4}>
          <ListItem mt={2}>
            <Bold>Digital stores:</Bold> Microsoft Store for Windows and App Store for Mac.
          </ListItem>
          <ListItem mt={2}>
            <Bold>Official websites:</Bold> The website clearly belongs to the developer of the software.
          </ListItem>
        </OrderedList>
      </Para>
      <Para>
        Suspicious places to download software include file hosting sites like Dropbox, Google Drive, Mega, or
        MediaFire.
      </Para>
    </>,
  )

  computerAppOfficial.addInstruction(
    <>
      <ContentHeader>Does the software seem legitimate?</ContentHeader>
      <Para>
        The easiest way to figure this out is to do a Google search for the software's name. What you should be seeing:
        <OrderedList mt={4}>
          <ListItem mt={2}>Many search results</ListItem>
          <ListItem mt={2}>The official website should be among the top few results</ListItem>
          <ListItem mt={2}>
            Official social media accounts (e.g. Instagram, Facebook, YouTube) for the software OR social media / news
            content about the software among the next few results
          </ListItem>
        </OrderedList>
      </Para>
    </>,
  )

  return software
}

export default generateSoftwareSubtree

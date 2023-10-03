import Bold from '../../components/text/Bold'
import ContentHeader from '../../components/text/ContentHeader'
import CustomLink from '../../components/text/CustomLink'
import Para from '../../components/text/Para'
import { NOT_SCAM_MESSAGE } from '../../contants'
import { Node, NodeType } from '../../utils/tree'

const generateTransferSubtree = () => {
  // Nodes
  const transfer = new Node('I was asked to transfer some financial assets (e.g. money, cryptocurrency).')
  const transferReasonNotOk = new Node("I don't think it makes sense to transfer the assets.")
  const transferReasonNotOkOutcome = new Node('Find out more info before making the transfer.', NodeType.WARNING)
  const transferReasonOk = new Node('The reason I was given for transferring the assets makes sense.')

  const paynowUen = new Node('I was given a UEN to send money to via PayNow.')
  const paynowUenLookupOk = new Node('After looking up the UEN, I think the company looks legitimate.')
  const paynowUenLookupOkOutcome = new Node(NOT_SCAM_MESSAGE, NodeType.NOSCAM)
  const paynowUenLookupNotOk = new Node('After looking up the UEN, I think the company DOES NOT look legitimate.')
  const paynowUenLookupNotOkOutcome = new Node(
    'This could be a scam. Do not transfer the money until you have verified that the company is legitimate.',
    NodeType.SCAM,
  )

  const paynowPhone = new Node('I was given a phone number to send money to via PayNow.')
  const paynowPhoneVerifiedOk = new Node('I can verify that the phone number belongs to the intended recipient.')
  const paynowPhoneVerifiedOkOutcome = new Node(NOT_SCAM_MESSAGE, NodeType.NOSCAM)
  const paynowPhoneVerifiedNotOk = new Node('I CANNOT verify that the phone number belongs to the intended recipient.')
  const paynowPhoneVerifiedNotOkOutcome = new Node(
    'This could be a scam. Do not transfer the money until you have verified that the phone number is correct.',
    NodeType.SCAM,
  )

  const direct = new Node('I was asked to transfer money directly to a bank account.')
  const directAccountVerifiedOk = new Node(
    'I can verify that the bank account number belongs to the intended recipient.',
  )
  const directAccountVerifiedOkOutcome = new Node(NOT_SCAM_MESSAGE, NodeType.NOSCAM)
  const directAccountVerifiedNotOk = new Node(
    'I CANNOT verify that the bank account number belongs to the intended recipient.',
  )
  const directAccountVerifiedNotOkOutcome = new Node(
    'This could be a scam. Do not transfer the money until you have verified that the bank account number is correct.',
    NodeType.SCAM,
  )

  const crypto = new Node('I was asked to purchase and transfer cryptocurrency.')
  const cryptoWalletVerifiedOk = new Node('I can verify that the wallet address belongs to the intended recipient.')
  const cryptoWalletVerifiedOkOutcome = new Node(NOT_SCAM_MESSAGE, NodeType.NOSCAM)
  const cryptoWalletVerifiedNotOk = new Node(
    'I CANNOT verify that the wallet address belongs to the intended recipient.',
  )
  const cryptoWalletVerifiedNotOkOutcome = new Node(
    'This could be a scam. Do not transfer the money until you have verified that the wallet address is correct.',
    NodeType.SCAM,
  )

  // Edges
  transfer.addChildren([transferReasonOk, transferReasonNotOk])
  transferReasonNotOk.addChildren([transferReasonNotOkOutcome])
  transferReasonOk.addChildren([paynowUen, paynowPhone, direct, crypto])
  paynowUen.addChildren([paynowUenLookupOk, paynowUenLookupNotOk])
  paynowUenLookupOk.addChildren([paynowUenLookupOkOutcome])
  paynowUenLookupNotOk.addChildren([paynowUenLookupNotOkOutcome])

  paynowPhone.addChildren([paynowPhoneVerifiedOk, paynowPhoneVerifiedNotOk])
  paynowPhoneVerifiedOk.addChildren([paynowPhoneVerifiedOkOutcome])
  paynowPhoneVerifiedNotOk.addChildren([paynowPhoneVerifiedNotOkOutcome])

  direct.addChildren([directAccountVerifiedOk, directAccountVerifiedNotOk])
  directAccountVerifiedOk.addChildren([directAccountVerifiedOkOutcome])
  directAccountVerifiedNotOk.addChildren([directAccountVerifiedNotOkOutcome])

  crypto.addChildren([cryptoWalletVerifiedOk, cryptoWalletVerifiedNotOk])
  cryptoWalletVerifiedOk.addChildren([cryptoWalletVerifiedOkOutcome])
  cryptoWalletVerifiedNotOk.addChildren([cryptoWalletVerifiedNotOkOutcome])

  // Content
  transfer.addInstruction(
    <>
      <ContentHeader>Is it clear why you NEED to transfer the financial assets?</ContentHeader>
      <Para>
        If you're supposed to be <Bold>receiving</Bold> money, then{' '}
        <Bold>money should not be leaving your account in the first place</Bold>.
      </Para>
      <Para>
        If you're supposed to be <Bold>paying</Bold> the person, make sure (a) there is a valid reason for doing so and
        (b) you are sure that you will get what you are paying for.
      </Para>
    </>,
  )

  transferReasonOk.addInstruction(
    <>
      <ContentHeader>What type of transfer did the person ask for?</ContentHeader>
    </>,
  )

  paynowUen.addInstruction(
    <>
      <ContentHeader>Does the organisation that owns that UEN seem legitimate?</ContentHeader>
      <Para>
        Search for the UEN at the{' '}
        <CustomLink href="https://www.uen.gov.sg/ueninternet/faces/pages/uenSrch.jspx">
          official government website
        </CustomLink>
        . Then, using the <Bold>entity name</Bold>, check whether the company is legitimate by searching in Google.
      </Para>
      <Para>
        There should be (a) an official site or (b) official social media accounts or (c) some news about the company.
      </Para>
    </>,
  )

  paynowPhone.addInstruction(
    <>
      <ContentHeader>Can you verify that the phone number belongs to your intended recipient?</ContentHeader>
      <Para>
        Check whether the phone number is listed on the intended recipient's official website or business profile page
        (e.g. Facebook Marketplace, Carousell).
      </Para>
      <Para>
        Also, note that bigger, more reputable organisations like the government or businesses / companies rarely use
        PayNow <Bold>phone numbers</Bold> to receive money. You should be suspicious if you were asked to pay a big
        organisation using a PayNow phone number.
      </Para>
    </>,
  )

  direct.addInstruction(
    <>
      <ContentHeader>Can you verify that the bank account belongs to your intended recipient?</ContentHeader>
      <Para>
        Check whether the bank account number is listed on the intended recipient's official website or business profile
        page (e.g. Facebook Marketplace, Carousell).
      </Para>
      <Para>
        Bigger, more reputable organisations like the government or businesses / companies usually offer more secure
        ways to pay, like NETS, custom QR codes, or AXS machines. If they allow direct transfers, the instructions
        clearly state the bank number (example:{' '}
        <CustomLink href="https://www.iras.gov.sg/quick-links/payments?taxtype=Individual%20Income%20Tax">
          IRAS
        </CustomLink>
        ).
      </Para>
    </>,
  )

  crypto.addInstruction(
    <>
      <ContentHeader>Can you verify that the crypto wallet belongs to your intended recipient?</ContentHeader>
      <Para>
        This is a lot more difficult to determine. If you cannot verify this, it is best not to make the transfer.
      </Para>
    </>,
  )

  return transfer
}

export default generateTransferSubtree

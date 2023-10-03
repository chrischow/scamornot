import { NOT_SCAM_MESSAGE } from '../../contants'
import { Node, NodeType } from '../../utils/tree'

const generateTransferSubtree = () => {
  // Nodes
  const transfer = new Node('I was asked to transfer some financial assets (e.g. money, cryptocurrency).')
  const transferReasonNotOk = new Node(
    "I don't actually know why I need to transfer the money OR I also don't think it makes sense to transfer the money.",
  )
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
    'This could be a scam. Do not transfer the money until you have verified that the bank account is correct.',
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

  return transfer
}

export default generateTransferSubtree

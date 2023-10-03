import { Node, NodeType } from '../../utils/tree'

const generateOtpSubtree = () => {
  const otp = new Node('I was asked for my OTP.')
  const otpOutcome = new Node('This is likely a scam. NO ONE should be asking you for your OTP.', NodeType.SCAM)
  otp.addChildren([otpOutcome])

  return otp
}

export default generateOtpSubtree

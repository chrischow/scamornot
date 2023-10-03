import ContentHeader from '../components/text/ContentHeader'
import { Node } from '../utils/tree'
import { platform } from './platform'
import { unsolicited } from './unsolicited'

export const root = new Node('Root')
root.addChildren([unsolicited, platform])
root.addInstruction(
  <>
    <ContentHeader>How were you contacted by the person?</ContentHeader>
  </>,
)

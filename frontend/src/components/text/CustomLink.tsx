import { Link } from '@chakra-ui/react'
import { ReactNode } from 'react'

const CustomLink = ({ children, href }: { children: ReactNode; href: string }) => {
  return (
    <Link color="blue.500" href={href} isExternal _hover={{ color: 'blue.400' }}>
      {children}
    </Link>
  )
}

export default CustomLink

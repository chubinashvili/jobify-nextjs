import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { IconType } from 'react-icons'

import links from '@/utils/links'

interface NavLink {
  text: string
  path: string
  id: number
  icon: IconType
}

interface NavLinksProps {
  toggleSidebar?: () => void
}

const NavLinks: NextPage<NavLinksProps> = ({ toggleSidebar }) => {
  const router = useRouter()

  return (
    <div className='nav-links'>
      {links.map((link: NavLink) => {
        const { text, path, id, icon: Icon } = link
        const isActive = router.pathname === path

        return (
          <Link href={path} key={id} passHref>
            <div className={`nav-link${isActive ? ' active' : ''}`} onClick={toggleSidebar}>
              <span className='icon'>
                <Icon />
              </span>
              {text}
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default NavLinks

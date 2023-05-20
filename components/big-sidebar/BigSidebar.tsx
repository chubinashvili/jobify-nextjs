import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import Logo from '../logo/Logo'
import NavLinks from '../nav-links/NavLinks'
import Wrapper from '@/assets/wrappers/BigSidebar'
import { RootState } from '@/store/rootReducer'

const BigSidebar: NextPage = () => {
  const [animate, setAnimate] = useState(false)
  const { showSidebar } = useSelector<RootState, RootState['jobs']>(state => state.jobs)

  useEffect(() => {
    setAnimate(true)
  }, [])

  return (
    <Wrapper animate={animate}>
      <div className={showSidebar ? 'sidebar-container' : 'sidebar-container show-sidebar'}>
        <div className='content'>
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  )
}

export default BigSidebar

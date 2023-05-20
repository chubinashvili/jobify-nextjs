import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'

import { Logo } from '../'
import NavLinks from '../nav-links/NavLinks'
import Wrapper from '@/assets/wrappers/SmallSidebar'
import { toggleSidebar } from '@/store/jobs/jobsSlice'
import { RootState } from '@/store/rootReducer.js'

const SmallSidebar: NextPage = () => {
  const [animate, setAnimate] = useState(false)
  const dispatch = useDispatch()
  const { showSidebar } = useSelector((state: RootState) => state.jobs)

  useEffect(() => setAnimate(true), [])

  return (
    <Wrapper animate={animate}>
      <div className={showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container'}>
        <div className='content'>
          <button data-testid='close-btn' type='button' className='close-btn' onClick={() => toggleSidebar(dispatch)}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks toggleSidebar={() => toggleSidebar(dispatch)} />
        </div>
      </div>
    </Wrapper>
  )
}

export default SmallSidebar

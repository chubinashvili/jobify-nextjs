import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'

import Logo from '../logo/Logo'
import Wrapper from '@/assets/wrappers/Navbar'
import { useOnOutsideClick } from '@/hooks/useOnOutsideClick'
import { toggleSidebar } from '@/store/jobs/jobsSlice'
import { RootState } from '@/store/rootReducer'
import { logoutUser } from '@/store/user/userSlice'

const Navbar: NextPage = () => {
  const dispatch = useDispatch()
  const [showLogout, setShowLogout] = useState(false)
  const [loading, setLoading] = useState(false)
  const [animate, setAnimate] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setAnimate(true)
  }, [])

  const { user } = useSelector((state: RootState) => state.user)

  const handleLogout = async () => {
    setLoading(true)
    setShowLogout(false)
    logoutUser(dispatch)
  }

  const ref = useRef<HTMLDivElement>(null)
  useOnOutsideClick(ref, () => setShowLogout(false))

  return (
    <Wrapper animate={animate}>
      <div className='nav-center'>
        <button className='toggle-btn' onClick={() => toggleSidebar(dispatch)}>
          <FaAlignLeft />
        </button>

        <div>
          <Logo />
          <h3 className='logo-text'>dashboard</h3>
        </div>

        <div className='btn-container' ref={ref}>
          <button className='btn' onClick={() => setShowLogout(prev => !prev)}>
            <FaUserCircle />
            {user?.name && !loading ? user.name : 'loading...'}
            <FaCaretDown />
          </button>
          <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'} onClick={handleLogout}>
            <button className='dropdown-btn'>logout</button>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default Navbar

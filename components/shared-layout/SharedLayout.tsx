import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { Navbar, SmallSidebar, BigSidebar } from '..'
import Wrapper from '@/assets/wrappers/SharedLayout'
import { getCurrentUser } from '@/store/user/userSlice'

const SharedLayout: NextPage = ({ children }) => {
  const [animate, setAnimate] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    setAnimate(true)
    getCurrentUser(dispatch)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Wrapper animate={animate}>
      <main className='dashboard'>
        <SmallSidebar />
        <BigSidebar />
        <div>
          <Navbar />
          <div className='dashboard-page'>{children}</div>
        </div>
      </main>
    </Wrapper>
  )
}

export default SharedLayout

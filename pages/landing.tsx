/* eslint-disable @typescript-eslint/ban-ts-comment */
import { NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import Wrapper from '@/assets/wrappers/LandingPage'
import { Logo, ProtectedRoute } from '@/components'

const Landing: NextPage = () => {
  const [animate, setAnimate] = useState<boolean>(false)
  const router = useRouter()

  useEffect(() => {
    setAnimate(true)
  }, [])

  const handleNavigate = () => {
    router.replace('/register')
  }

  return (
    <ProtectedRoute>
      <Wrapper animate={animate}>
        <nav className='animate'>
          <Logo />
        </nav>
        <div className='container page'>
          <div className='info'>
            <h1 className='animate'>
              <span>job</span> <span>tracking</span> <span>app</span>
            </h1>
            <div className='animate'>
              <p>
                I&#39;m baby wayfarers hoodie next level taiyaki brooklyn cliche blue bottle single-origin coffee chia.
                Aesthetic post-ironic venmo, quinoa lo-fi tote bag adaptogen everyday carry meggings +1 brunch narwhal.
              </p>
            </div>
            <div className='animate'>
              <button onClick={handleNavigate} className='btn btn-hero landing-link'>
                Login/Register
              </button>
            </div>
          </div>
          {/* @ts-ignore */}
          <Image src={'/images/main.svg'} alt='job hunt' className='img main-img' fill={true} />
        </div>
      </Wrapper>
    </ProtectedRoute>
  )
}

export default Landing

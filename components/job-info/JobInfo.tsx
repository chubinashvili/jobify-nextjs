import { NextPage } from 'next'
import React, { ReactNode } from 'react'

import Wrapper from '@/assets/wrappers/JobInfo'

interface JobInfoProps {
  icon: ReactNode
  text: string
}

const JobInfo: NextPage<JobInfoProps> = ({ icon, text }) => {
  return (
    <Wrapper>
      <span className='icon'>{icon}</span>
      <span className='text'>{text}</span>
    </Wrapper>
  )
}

export default JobInfo

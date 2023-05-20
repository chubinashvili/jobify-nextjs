import { NextPage } from 'next'
import { useState, useEffect } from 'react'

import { SearchContainer, JobsContainer, ProtectedRoute } from '@/components'

const Stats: NextPage = () => {
  const [animate, setAnimate] = useState<boolean>(false)

  useEffect(() => {
    setAnimate(true)
  }, [])

  return (
    <ProtectedRoute>
      <SearchContainer animate={animate} />
      <JobsContainer animate={animate} />
    </ProtectedRoute>
  )
}

export default Stats

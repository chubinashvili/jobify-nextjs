import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { StatsContainer, Loading, ChartsContainer, ProtectedRoute } from '@/components'
import { RootState } from '@/store/rootReducer'
import { showStats } from '@/store/stats/statsSlice'

const Index: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [animate, setAnimate] = useState<boolean>(false)

  useEffect(() => {
    setAnimate(true)
  }, [])

  const dispatch = useDispatch()
  const { monthlyApplications } = useSelector((state: RootState) => state.stats)

  const handleShowStats = () => {
    setLoading(true)
    showStats(dispatch)
    setLoading(false)
  }

  useEffect(() => {
    handleShowStats()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) {
    return <Loading center />
  }

  return (
    <ProtectedRoute>
      <StatsContainer animate={animate} />
      {monthlyApplications.length > 0 && <ChartsContainer animate={animate} />}
    </ProtectedRoute>
  )
}

export default Index

import { NextPage } from 'next'
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa'
import { useSelector } from 'react-redux'

import StatItem from '../stat-item/StatItem'
import Wrapper from '@/assets/wrappers/StatsContainer'
import { RootState } from '@/store/rootReducer'

const StatsContainer: NextPage<{ animate: boolean }> = ({ animate }) => {
  const { stats } = useSelector((state: RootState) => state.stats)

  const defaultStats = [
    {
      title: 'pending applications',
      count: stats.pending || 0,
      icon: <FaSuitcaseRolling />,
      color: '#e9b949',
      bcg: '#fcefc7',
    },
    {
      title: 'interviews scheduled',
      count: stats.interview || 0,
      icon: <FaCalendarCheck />,
      color: '#647acb',
      bcg: '#e0e8f9',
    },
    {
      title: 'jobs declined',
      count: stats.declined || 0,
      icon: <FaBug />,
      color: '#d66a6a',
      bcg: '#ffeeee',
    },
  ]

  return (
    <Wrapper animate={animate}>
      {defaultStats.map((item, index) => (
        <StatItem key={index} {...item} />
      ))}
    </Wrapper>
  )
}

export default StatsContainer

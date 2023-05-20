import { NextPage } from 'next'

import Wrapper from '@/assets/wrappers/StatItem'

interface StatItemProps {
  count: number
  title: string
  icon: React.ReactNode
  color: string
  bcg: string
}

const StatItem: NextPage<StatItemProps> = ({ count, title, icon, color, bcg }) => {
  return (
    <Wrapper color={color} bcg={bcg}>
      <header>
        <span className='count'>{count}</span>
        <span className='icon'>{icon}</span>
      </header>
      <h5 className='title'>{title}</h5>
    </Wrapper>
  )
}

export default StatItem

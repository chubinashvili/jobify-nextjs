import { NextPage } from 'next'
import { useState } from 'react'
import { useSelector } from 'react-redux'

import AreaChart from '../area-chart/AreaChart'
import BarChart from '../bar-chart/BarChart'
import Wrapper from '@/assets/wrappers/ChartsContainer'
import { RootState } from '@/store/rootReducer'

interface ChartsContainerProps {
  animate: boolean
}

const ChartsContainer: NextPage<ChartsContainerProps> = ({ animate }) => {
  const [barChart, setBarChart] = useState(true)
  const { monthlyApplications: data } = useSelector<RootState, RootState['stats']>(state => state.stats)

  return (
    <Wrapper animate={animate}>
      <h4>Monthly Applications</h4>

      <button type='button' onClick={() => setBarChart(!barChart)}>
        {barChart ? 'Area Chart' : 'Bar Chart'}
      </button>
      {barChart ? <BarChart data={data} /> : <AreaChart data={data} />}
    </Wrapper>
  )
}

export default ChartsContainer

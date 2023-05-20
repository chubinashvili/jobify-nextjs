import { NextPage } from 'next'
import { useSelector } from 'react-redux'

import { RootState } from '@/store/rootReducer'

const Alert: NextPage = () => {
  const { alertType, alertText } = useSelector((state: RootState) => state.alerts)

  return <div className={`alert alert-${alertType}`}>{alertText}</div>
}

export default Alert

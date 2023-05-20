import { NextPage } from 'next'

interface LoadingProps {
  center?: boolean
}

const Loading: NextPage<LoadingProps> = ({ center }) => {
  return (
    <div className='loading-container'>
      <div className={center ? 'loading loading-center' : 'loading'}></div>
    </div>
  )
}

export default Loading

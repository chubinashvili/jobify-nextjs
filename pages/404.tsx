import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useSelector } from 'react-redux'

import Wrapper from '@/assets/wrappers/ErrorPage'
import { RootState } from '@/store/rootReducer'

const Error: NextPage = () => {
  const { user } = useSelector((state: RootState) => state.user)

  const goBackRoute = user ? '/' : '/landing'

  return (
    <Wrapper className='full-page'>
      <div>
        <div className='error-img'>
          <Image src='/images/not-found.svg' alt='not found' width={200} height={200} />
        </div>
        <h3>Ohh! Page Not Found</h3>
        <p>We can&#39;t seem to find the page you&#39;re looking for</p>
        <Link href={goBackRoute}>Go Back</Link>
      </div>
    </Wrapper>
  )
}

export default Error

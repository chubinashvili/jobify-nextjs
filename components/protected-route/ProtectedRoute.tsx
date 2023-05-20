import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'
import { useSelector, shallowEqual } from 'react-redux'

import { RootState } from '@/store/rootReducer'

interface ProtectedRouteProps {
  children: React.ReactNode
  condition?: boolean
  isProtected?: boolean
}

const ProtectedRoute: NextPage<ProtectedRouteProps> = ({ children, condition = true, isProtected = true }) => {
  const { user } = useSelector((state: RootState) => state.user, shallowEqual)

  const router = useRouter()

  const memoizedUser = useMemo(() => user, [user])

  function checkRoute() {
    if ((!memoizedUser || !condition) && isProtected && router.pathname !== '/landing') {
      router.push('/register', undefined, { shallow: true })
    } else if ((router.pathname === '/register' || router.pathname === '/landing') && memoizedUser && isProtected) {
      router.push('/', undefined, { shallow: true })
    }
  }

  useEffect(() => {
    checkRoute()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [condition, isProtected])

  return <>{children}</>
}

export default ProtectedRoute

import { NextPage } from 'next'
import { useEffect, useState, ChangeEvent, FormEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Wrapper from '@/assets/wrappers/RegisterPage'
import { Logo, FormRow, Alert, ProtectedRoute } from '@/components'
import { displayAlert } from '@/store/alerts/alertsSlice'
import { RootState } from '@/store/rootReducer'
import { setupUser } from '@/store/user/userSlice'

interface FormValues {
  name: string
  email: string
  password: string
  isMember: boolean
}

const initialState: FormValues = {
  name: '',
  email: '',
  password: '',
  isMember: true,
}

const Register: NextPage = () => {
  const dispatch = useDispatch()
  const [values, setValues] = useState<FormValues>(initialState)
  const [loading, setLoading] = useState(false)
  const { showAlert } = useSelector((state: RootState) => state.alerts)
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    setAnimate(true)
  }, [])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const toggleMember = () => {
    setValues(prev => ({
      ...initialState,
      isMember: !prev.isMember,
    }))
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const { name, email, password, isMember } = values
    if (!email || !password || (!isMember && !name)) {
      displayAlert(dispatch, { alertText: 'Please provide all values!' })
      setLoading(false)
      return
    }

    const nameRegex = /^[a-zA-Z][a-zA-Z',.-\s]{1,}[a-zA-Z]$/
    const emailRegex = /^\S+@\S+\.\S+$/
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/

    if (!nameRegex.test(name) && !isMember) {
      displayAlert(dispatch, { alertText: 'Please enter a valid name' })
      setLoading(false)
      return
    }

    if (!emailRegex.test(email) && !isMember) {
      displayAlert(dispatch, { alertText: 'Please enter a valid email' })
      setLoading(false)
      return
    }

    if (!passwordRegex.test(password) && !isMember) {
      displayAlert(dispatch, {
        alertText:
          'Password must be at least 6 characters long and contain at least one letter, one number, and one special character.',
      })
      setLoading(false)
      return
    }

    const currentUser = { name, email, password }
    if (isMember) {
      setupUser(dispatch, {
        currentUser,
        endpoint: 'login',
        alertText: 'Login Successful!',
      })
    } else {
      setupUser(dispatch, {
        currentUser,
        endpoint: 'register',
        alertText: 'User Created!',
      })
    }
    setLoading(false)
  }

  return (
    <ProtectedRoute>
      <Wrapper className='full-page' animate={animate}>
        <form className='form' onSubmit={onSubmit}>
          <Logo />
          <h3>{values.isMember ? 'Login' : 'Register'}</h3>
          {showAlert && <Alert />}
          {/* name input */}
          {!values.isMember && <FormRow type='text' name='name' value={values.name} handleChange={handleChange} />}
          {/* email input */}
          <FormRow type='text' name='email' value={values.email} handleChange={handleChange} />
          {/* password input */}
          <FormRow type='password' name='password' value={values.password} handleChange={handleChange} />
          <button type='submit' className='btn btn-block' disabled={loading}>
            submit
          </button>
          <button
            type='button'
            className='btn btn-block btn-hipster'
            disabled={loading}
            onClick={() => {
              setupUser(dispatch, {
                currentUser: { email: 'testUser@test.com', password: 'secret' },
                endpoint: 'login',
                alertText: 'Login Successful!',
              })
            }}
          >
            {loading ? 'loading...' : 'demo app'}
          </button>
          <p>
            {values.isMember ? 'Not a member yet?' : 'Already a member?'}
            <button type='button' onClick={toggleMember} className='member-btn'>
              {values.isMember ? 'Register' : 'Login'}
            </button>
          </p>
        </form>
      </Wrapper>
    </ProtectedRoute>
  )
}
export default Register

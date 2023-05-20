import { NextPage } from 'next'
import { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Wrapper from '@/assets/wrappers/DashboardFormPage'
import { FormRow, Alert, ProtectedRoute } from '@/components'
import { displayAlert } from '@/store/alerts/alertsSlice'
import { RootState } from '@/store/rootReducer'
import { UserType, updateUser } from '@/store/user/userSlice'

const Profile: NextPage = () => {
  const [loading, setLoading] = useState(false)
  const [animate, setAnimate] = useState(false)
  const dispatch = useDispatch()
  const { user } = useSelector((state: RootState) => state.user)
  const { showAlert } = useSelector((state: RootState) => state.alerts)
  const [values, setValues] = useState<UserType>({
    name: user?.name,
    email: user?.email,
    lastName: user?.lastName,
    location: user?.location,
  })

  useEffect(() => setAnimate(true), [])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const { name, email, lastName, location } = values
    if (!name || !email || !lastName || !location) {
      displayAlert(dispatch, { alertText: 'Please provide all values!' })
      setLoading(false)
      return
    }

    updateUser(dispatch, values)
    setLoading(false)
  }

  return (
    <ProtectedRoute>
      <Wrapper animate={animate}>
        <form className='form' onSubmit={handleSubmit}>
          <h3>profile</h3>
          {showAlert && <Alert />}
          <div className='form-center'>
            <FormRow type='text' name='name' labelText='Name' value={values.name} handleChange={handleChange} />
            <FormRow
              labelText='Last Name'
              type='text'
              name='lastName'
              value={values.lastName}
              handleChange={handleChange}
            />
            <FormRow type='email' name='email' labelText='Email' value={values.email} handleChange={handleChange} />
            <FormRow
              type='text'
              name='location'
              labelText='Location'
              value={values.location}
              handleChange={handleChange}
            />
            <button className='btn btn-block' type='submit' disabled={loading}>
              {loading ? 'Please Wait...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </Wrapper>
    </ProtectedRoute>
  )
}

export default Profile

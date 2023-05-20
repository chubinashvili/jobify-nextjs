import { NextPage } from 'next'
import { useMemo, useState, ChangeEvent, FormEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { FormRow, FormRowSelect } from '..'
import Wrapper from '@/assets/wrappers/SearchContainer'
import { clearFilters, handleChange } from '@/store/jobs/jobsSlice'
import { RootState } from '@/store/rootReducer'

interface SearchContainerProps {
  animate: boolean
}

const SearchContainer: NextPage<SearchContainerProps> = ({ animate }) => {
  const dispatch = useDispatch()
  const [localSearch, setLocalSearch] = useState('')

  const { searchStatus, searchType, sort, sortOptions, statusOptions, jobTypeOptions } = useSelector(
    (state: RootState) => state.jobs,
  )

  const handleSearch = (e: ChangeEvent<HTMLSelectElement>) => {
    handleChange(dispatch, { name: e.target.name, value: e.target.value })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLocalSearch('')
    clearFilters(dispatch)
  }

  const debounce = () => {
    let timeoutID: NodeJS.Timeout
    return (e: ChangeEvent<HTMLInputElement>) => {
      setLocalSearch(e.target.value)
      clearTimeout(timeoutID)
      timeoutID = setTimeout(() => {
        handleChange(dispatch, { name: e.target.name, value: e.target.value })
      }, 500)
    }
  }

  const optimizedDebounce = useMemo(() => {
    return debounce()
    // eslint-disable-next-line
  }, [])

  return (
    <Wrapper animate={animate}>
      <form className='form' onSubmit={handleSubmit}>
        <h4>search form</h4>
        <div className='form-center'>
          <FormRow type='text' name='search' value={localSearch} handleChange={optimizedDebounce} />
          <FormRowSelect
            labelText='status'
            name='searchStatus'
            value={searchStatus}
            handleChange={handleSearch}
            list={['all', ...statusOptions]}
          />
          <FormRowSelect
            labelText='type'
            name='searchType'
            value={searchType}
            handleChange={handleSearch}
            list={['all', ...jobTypeOptions]}
          />
          <FormRowSelect name='sort' value={sort} handleChange={handleSearch} list={sortOptions} />
          <button className='btn btn-block btn-danger' type='submit'>
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  )
}

export default SearchContainer

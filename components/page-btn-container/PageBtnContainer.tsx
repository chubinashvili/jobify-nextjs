import { NextPage } from 'next'
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi'
import { useSelector, useDispatch } from 'react-redux'

import Wrapper from '@/assets/wrappers/PageBtnContainer'
import { changePage } from '@/store/jobs/jobsSlice'
import { RootState } from '@/store/rootReducer'

const PageBtnContainer: NextPage = () => {
  const dispatch = useDispatch()
  const { numOfPages, page } = useSelector((state: RootState) => state.jobs)

  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1
  })

  const prevPage = () => {
    let newPage = page - 1
    if (newPage < 1) {
      newPage = 1
    }
    changePage(dispatch, newPage)
  }

  const nextPage = () => {
    let newPage = page + 1
    if (newPage > numOfPages) {
      newPage = numOfPages
    }
    changePage(dispatch, newPage)
  }

  return (
    <Wrapper>
      <button className='prev-btn' onClick={prevPage}>
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className='btn-container'>
        {pages.map(pageNumber => {
          return (
            <button
              type='button'
              className={pageNumber === page ? 'pageBtn active' : 'pageBtn'}
              key={pageNumber}
              onClick={() => changePage(dispatch, pageNumber)}
            >
              {pageNumber}
            </button>
          )
        })}
      </div>
      <button className='next-btn' onClick={nextPage}>
        <HiChevronDoubleRight />
        next
      </button>
    </Wrapper>
  )
}

export default PageBtnContainer

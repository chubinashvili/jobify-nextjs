import styled, { css } from 'styled-components'

interface WrapperProps {
  animate: boolean
}

const Wrapper = styled.main<WrapperProps>`
  margin-top: 4rem;
  transition: 0.6s cubic-bezier(0.79, 0.01, 0.15, 0.99);
  transform: translateY(10px);
  opacity: 0;
  h2 {
    text-transform: none;
  }
  & > h5 {
    font-weight: 700;
  }
  .jobs {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 2rem;
  }
  @media (min-width: 992px) {
    .jobs {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
  }
  ${({ animate }) =>
    animate &&
    css`
      transition-delay: 0.2s;
      transform: translateY(0);
      opacity: 1;
    `}
`
export default Wrapper

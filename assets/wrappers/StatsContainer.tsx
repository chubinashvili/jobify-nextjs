import styled, { css } from 'styled-components'

interface WrapperProps {
  animate: boolean
}

const Wrapper = styled.section<WrapperProps>`
  display: grid;
  row-gap: 2rem;
  transition: 0.6s cubic-bezier(0.79, 0.01, 0.15, 0.99);
  transform: translateY(10px);
  opacity: 0;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
  }
  @media (min-width: 1120px) {
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 1rem;
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

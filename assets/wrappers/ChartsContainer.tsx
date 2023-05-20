import styled, { css } from 'styled-components'

interface WrapperProps {
  animate: boolean
}

const Wrapper = styled.main<WrapperProps>`
  margin-top: 4rem;
  text-align: center;
  transition: 0.6s cubic-bezier(0.79, 0.01, 0.15, 0.99);
  transform: translateY(10px);
  opacity: 0;
  button {
    background: transparent;
    border-color: transparent;
    text-transform: capitalize;
    color: var(--primary-500);
    font-size: 1.25rem;
    cursor: pointer;
  }
  h4 {
    text-align: center;
    margin-bottom: 0.75rem;
  }
  ${({ animate }) =>
    animate &&
    css`
      transition-delay: 0.3s;
      transform: translateY(0);
      opacity: 1;
    `}
`

export default Wrapper

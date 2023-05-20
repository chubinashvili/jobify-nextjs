import styled, { css } from 'styled-components'

interface WrapperProps {
  animate: boolean
}

const Wrapper = styled.section<WrapperProps>`
  .dashboard {
    display: grid;
    grid-template-columns: 1fr;
    transition: 0.6s cubic-bezier(0.79, 0.01, 0.15, 0.99);
    opacity: 0;
  }
  .dashboard-page {
    width: 90vw;
    margin: 0 auto;
    padding: 2rem 0;
  }
  @media (min-width: 992px) {
    .dashboard {
      grid-template-columns: auto 1fr;
    }
    .dashboard-page {
      width: 90%;
    }
  }
  ${({ animate }) =>
    animate &&
    css`
      .dashboard {
        opacity: 1;
      }
    `}
`
export default Wrapper

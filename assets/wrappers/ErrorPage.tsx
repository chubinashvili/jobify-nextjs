import styled from 'styled-components'

const Wrapper = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  & > div {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 0 10px;
  }
  .error-img {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  h3 {
    margin-bottom: 0.5rem;
  }
  p {
    margin-top: 0;
    margin-bottom: 0.5rem;
    color: var(--grey-500);
  }
  a {
    color: var(--primary-500);
    text-decoration: underline;
    text-transform: capitalize;
    transition: 0.6s cubic-bezier(0.79, 0.01, 0.15, 0.99);
  }
  a:hover {
    opacity: 0.7;
  }
`

export default Wrapper

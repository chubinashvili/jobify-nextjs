import styled, { css } from 'styled-components'

interface WrapperProps {
  animate: boolean
}

const Wrapper = styled.main<WrapperProps>`
  nav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0px auto;
    height: var(--nav-height);
    display: flex;
    -moz-box-align: center;
    align-items: center;
  }

  nav > .logo {
    transition: 0.6s cubic-bezier(0.79, 0.01, 0.15, 0.99);
    transform: scaleY(0.2);
    opacity: 0;
  }

  .page {
    min-height: calc(100vh - var(--nav-height));
    display: grid;
    align-items: center;
    margin-top: -3rem;
  }

  h1 {
    font-weight: 700;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
    span {
      transition: 0.6s cubic-bezier(0.79, 0.01, 0.15, 0.99);
      transform: scaleY(0.2);
      opacity: 0;
    }
    span:nth-child(2) {
      color: var(--primary-500);
    }
  }
  p {
    transform: translateY(120%);
    opacity: 0;
    transition: 0.6s cubic-bezier(0.79, 0.01, 0.15, 0.99);
    color: var(--grey-900);
  }
  .landing-link {
    transform: translateY(120%);
    opacity: 0;
    transition: 0.6s cubic-bezier(0.79, 0.01, 0.15, 0.99);
  }
  .landing-link:active {
    opacity: 0.7;
    transform: scale(0.9);
    transition: transform 0.2s ease-out;
  }
  .main-img {
    position: relative;
    z-index: -1;
    transition: 0.6s cubic-bezier(0.79, 0.01, 0.15, 0.99);
    opacity: 0;
  }

  @media (min-width: 992px) {
    .page {
      grid-template-columns: 1fr 1fr;
      column-gap: 3rem;
    }
    .main-img {
      display: block;
    }
  }
  ${({ animate }) =>
    animate &&
    css`
      .main-img {
        transition-delay: 0.1s;
        opacity: 1;
      }
      nav > .logo {
        transition-delay: 0.2s;
        transform: scaleY(1);
        opacity: 1;
      }
      h1 span {
        transform: scaleY(1);
        opacity: 1;
      }
      h1 span:nth-child(1) {
        transition-delay: 0.3s;
      }
      h1 span:nth-child(2) {
        transition-delay: 0.4s;
      }
      h1 span:nth-child(3) {
        transition-delay: 0.5s;
      }
      p {
        transition-delay: 0.6s;
        opacity: 1;
        transform: translateY(0);
      }
      .landing-link {
        transition-delay: 0.8s;
        transform: translateY(0);
        opacity: 1;
      }
    `}
`
export default Wrapper

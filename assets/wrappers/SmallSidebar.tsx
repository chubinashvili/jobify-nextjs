import styled, { css } from 'styled-components'

interface WrapperProps {
  animate: boolean
}

const Wrapper = styled.aside<WrapperProps>`
  @media (min-width: 992px) {
    display: none;
  }
  .sidebar-container {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: -1;
    opacity: 0;
    transition: var(--transition);
  }
  .show-sidebar {
    z-index: 99;
    opacity: 1;
  }
  .content {
    background: var(--white);
    width: var(--fluid-width);
    height: 95vh;
    border-radius: var(--borderRadius);
    padding: 4rem 2rem;
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .close-btn {
    position: absolute;
    top: 10px;
    left: 10px;
    background: transparent;
    border-color: transparent;
    font-size: 2rem;
    color: var(--red-dark);
    cursor: pointer;
    transition: 0.6s cubic-bezier(0.79, 0.01, 0.15, 0.99);
    transform: scaleY(0.2);
    opacity: 0;
  }

  .close-btn:hover {
    opacity: 0.7;
  }
  .nav-links {
    padding-top: 2rem;
    display: flex;
    flex-direction: column;
    transition: 0.6s cubic-bezier(0.79, 0.01, 0.15, 0.99);
    transform: translateY(10px);
    opacity: 0;
  }

  .nav-link {
    display: flex;
    align-items: center;
    color: var(--grey-500);
    padding: 1rem 0;
    text-transform: capitalize;
    transition: var(--transition);
  }

  .nav-link:hover {
    color: var(--grey-900);
  }
  .nav-link:hover .icon {
    color: var(--primary-500);
  }
  .icon {
    font-size: 1.5rem;
    margin-right: 1rem;
    display: grid;
    place-items: center;
    transition: var(--transition);
  }
  .active {
    color: var(--grey-900);
  }
  .active .icon {
    color: var(--primary-500);
  }

  .logo {
    transition: 0.6s cubic-bezier(0.79, 0.01, 0.15, 0.99);
    transform: translateY(10px);
    opacity: 0;
  }

  ${({ animate }) =>
    animate &&
    css`
      .content {
        transition-delay: 0.1s;
        opacity: 1;
      }
      .close-btn {
        transition-delay: 0.2s;
        transform: scaleY(1);
        opacity: 1;
      }
      .logo {
        transition-delay: 0.35s;
        transform: translateY(0px);
        opacity: 1;
      }
      .nav-links {
        transition-delay: 0.45s;
        transform: translateY(0px);
        opacity: 1;
      }
    `}
`

export default Wrapper

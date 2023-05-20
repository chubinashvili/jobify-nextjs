import styled, { css } from 'styled-components'

interface WrapperProps {
  animate: boolean
}

const Wrapper = styled.aside<WrapperProps>`
  display: none;
  @media (min-width: 992px) {
    display: block;
    box-shadow: 1px 0px 0px 0px rgba(0, 0, 0, 0.1);
    .sidebar-container {
      background: var(--white);
      min-height: 100vh;
      height: 100%;
      width: 250px;
      margin-left: -250px;
      transition: var(--transition);
    }
    .content {
      position: sticky;
      top: 0;
    }
    .show-sidebar {
      margin-left: 0;
    }
    header {
      height: 6rem;
      display: flex;
      align-items: center;
      padding-left: 2.5rem;
      transition: 0.6s cubic-bezier(0.79, 0.01, 0.15, 0.99);
      transform: translateY(10px);
      opacity: 0;
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
      padding-left: 2.5rem;
      text-transform: capitalize;
      transition: var(--transition);
    }
    .nav-link:hover {
      background: var(--grey-50);
      padding-left: 3rem;
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
    ${({ animate }) =>
      animate &&
      css`
        header {
          transition-delay: 0.45s;
          transform: translateY(0);
          opacity: 1;
        }
        .nav-links {
          transition-delay: 0.55s;
          transform: translateY(0);
          opacity: 1;
        }
      `}
  }
`
export default Wrapper

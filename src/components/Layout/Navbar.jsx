import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { auth } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const Nav = styled.nav`
  background: rgba(0, 0, 0, 0.8);
  border-bottom: 2px solid #00ff00;
  padding: 1rem;
  position: sticky;
  top: 0;
  z-index: 1000;
  backdrop-filter: blur(5px);
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: #00ff00;
  text-decoration: none;
  padding: 0.5rem 1rem;
  position: relative;
  transition: all 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: #00ff00;
    transition: width 0.3s ease;
  }

  &:hover::before {
    width: 100%;
  }

  ${props => props.active && `
    &::before {
      width: 100%;
    }
  `}
`;

const Logo = styled.div`
  font-size: 1.5rem;
  color: #00ff00;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

export const Navbar = () => {
  const [user] = useAuthState(auth);
  const location = useLocation();

  return (
    <Nav>
      <NavContainer>
        <Logo>CTF Toulouse</Logo>
        <div>
          <NavLink to="/" active={location.pathname === '/'}>Accueil</NavLink>
          <NavLink to="/challenges" active={location.pathname === '/challenges'}>Défis</NavLink>
          <NavLink to="/leaderboard" active={location.pathname === '/leaderboard'}>Classement</NavLink>
          {user ? (
            <>
              <NavLink to="/profile" active={location.pathname === '/profile'}>Profil</NavLink>
              <NavLink as="button" onClick={() => auth.signOut()}>Déconnexion</NavLink>
            </>
          ) : (
            <NavLink to="/login" active={location.pathname === '/login'}>Connexion</NavLink>
          )}
        </div>
      </NavContainer>
    </Nav>
  );
}; 
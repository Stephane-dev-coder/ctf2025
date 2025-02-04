import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Navbar } from './Navbar';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');
  
  body {
    margin: 0;
    padding: 0;
    background-color: #000;
    color: #00ff00;
    font-family: 'Share Tech Mono', monospace;
  }

  * {
    box-sizing: border-box;
  }

  ::selection {
    background: #00ff00;
    color: #000;
  }
`;

const MainContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(
    rgba(0, 0, 0, 0.97),
    rgba(0, 0, 0, 0.9)
  );
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: repeating-linear-gradient(
      0deg,
      rgba(0, 255, 0, 0.03) 0px,
      rgba(0, 255, 0, 0.03) 1px,
      transparent 1px,
      transparent 2px
    );
    pointer-events: none;
  }
`;

const Content = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

export const MainLayout = ({ children }) => {
  return (
    <>
      <GlobalStyle />
      <MainContainer>
        <Navbar />
        <Content>{children}</Content>
      </MainContainer>
    </>
  );
}; 
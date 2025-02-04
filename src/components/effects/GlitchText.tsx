import React from 'react';
import styled, { keyframes } from 'styled-components';

const glitch = keyframes`
  0% {
    clip-path: inset(50% 0 30% 0);
    transform: translate(-20px, -10px);
  }
  10% {
    clip-path: inset(40% 0 43% 0);
    transform: translate(10px, 10px);
  }
  20% {
    clip-path: inset(20% 0 80% 0);
    transform: translate(-15px, 5px);
  }
  30% {
    clip-path: inset(80% 0 5% 0);
    transform: translate(20px, -5px);
  }
  40% {
    clip-path: inset(50% 0 30% 0);
    transform: translate(-5px, 15px);
  }
  50% {
    clip-path: inset(10% 0 60% 0);
    transform: translate(5px, -10px);
  }
  60% {
    clip-path: inset(40% 0 43% 0);
    transform: translate(-15px, 10px);
  }
  70% {
    clip-path: inset(80% 0 5% 0);
    transform: translate(20px, 5px);
  }
  80% {
    clip-path: inset(20% 0 80% 0);
    transform: translate(-20px, -5px);
  }
  90% {
    clip-path: inset(60% 0 10% 0);
    transform: translate(10px, -10px);
  }
  100% {
    clip-path: inset(50% 0 30% 0);
    transform: translate(0);
  }
`;

const StyledText = styled.div<{ $isGlitching?: boolean }>`
  position: relative;
  color: #00ff00;
  font-size: ${props => props.$isGlitching ? '2rem' : 'inherit'};
  font-weight: bold;
  text-transform: uppercase;
  text-shadow: 0.05em 0 0 #00fffc, -0.03em -0.04em 0 #fc00ff,
                0.025em 0.04em 0 #fffc00;
  animation: ${props => props.$isGlitching ? glitch : 'none'} 4s infinite;

  &::before,
  &::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &::before {
    left: 2px;
    text-shadow: -2px 0 #ff00fc;
    clip: rect(24px, 550px, 90px, 0);
    animation: ${glitch} 3s infinite linear alternate-reverse;
  }

  &::after {
    left: -2px;
    text-shadow: -2px 0 #00ff3c;
    clip: rect(85px, 550px, 140px, 0);
    animation: ${glitch} 2.5s infinite linear alternate-reverse;
  }
`;

interface GlitchTextProps {
  text: string;
  isGlitching?: boolean;
  className?: string;
}

export const GlitchText = ({ text, isGlitching = false, className }: GlitchTextProps) => (
  <StyledText data-text={text} $isGlitching={isGlitching} className={className}>
    {text}
  </StyledText>
); 
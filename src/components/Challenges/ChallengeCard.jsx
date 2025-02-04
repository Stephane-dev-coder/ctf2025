import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Card = styled(motion.div)`
  background: rgba(0, 20, 0, 0.8);
  border: 1px solid #00ff00;
  padding: 1.5rem;
  margin: 1rem;
  border-radius: 5px;
  position: relative;
  overflow: hidden;
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #00ff00, transparent);
    animation: scan 2s linear infinite;
  }

  @keyframes scan {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
`;

const Title = styled.h3`
  color: #00ff00;
  margin: 0 0 1rem 0;
  font-size: 1.2rem;
`;

const Description = styled.p`
  color: #00cc00;
  margin: 0 0 1rem 0;
`;

const Points = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(0, 255, 0, 0.2);
  padding: 0.3rem 0.6rem;
  border-radius: 3px;
  font-size: 0.9rem;
`;

const Type = styled.div`
  color: #00aa00;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

export const ChallengeCard = ({ challenge, onClick }) => {
  return (
    <Card
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(challenge)}
    >
      <Points>{challenge.points} pts</Points>
      <Title>{challenge.name}</Title>
      <Type>{challenge.type}</Type>
      <Description>{challenge.description}</Description>
    </Card>
  );
}; 
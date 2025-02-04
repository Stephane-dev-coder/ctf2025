import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { ChallengeCard } from '../components/Challenges/ChallengeCard';
import { FirebaseService } from '../services/firebaseService';
import { GameService } from '../services/gameService';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';
import { Challenge } from '../components/Challenge';
import { useAuth } from '../contexts/AuthContext';
import { doc, runTransaction, arrayUnion } from 'firebase/firestore';
import { toast } from 'react-hot-toast';

const scanLine = keyframes`
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(100%);
  }
`;

const glitch = keyframes`
  0% {
    clip-path: inset(40% 0 61% 0);
    transform: skew(0.15deg);
  }
  20% {
    clip-path: inset(75% 0 23% 0);
    transform: skew(0.3deg);
  }
  40% {
    clip-path: inset(25% 0 61% 0);
    transform: skew(-0.1deg);
  }
  60% {
    clip-path: inset(10% 0 61% 0);
    transform: skew(0.4deg);
  }
  80% {
    clip-path: inset(83% 0 1% 0);
    transform: skew(-0.2deg);
  }
  100% {
    clip-path: inset(40% 0 43% 0);
    transform: skew(0.15deg);
  }
`;

const Container = styled.div`
  padding: 2rem;
  position: relative;
  min-height: 100vh;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      transparent 50%,
      rgba(0, 255, 0, 0.025) 50%
    );
    background-size: 100% 4px;
    pointer-events: none;
  }
`;

const Title = styled.h1`
  color: #00ff00;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-align: center;
  margin-bottom: 2rem;
  position: relative;
  text-shadow: 0 0 5px #00ff00;

  &::before {
    content: attr(data-text);
    position: absolute;
    left: 0;
    text-shadow: 2px 0 #ff0000;
    top: 0;
    color: #00ff00;
    background: #000;
    overflow: hidden;
    animation: ${glitch} 1s infinite linear alternate-reverse;
  }
`;

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 100px;
`;

const FlagSubmission = styled(motion.div)`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 20, 0, 0.95);
  padding: 1rem;
  border-top: 2px solid #00ff00;
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(5px);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: #00ff00;
    opacity: 0.5;
    animation: ${scanLine} 4s linear infinite;
  }
`;

const Input = styled.input`
  background: rgba(0, 20, 0, 0.8);
  border: 1px solid #00ff00;
  color: #00ff00;
  padding: 0.8rem 1rem;
  font-family: 'Share Tech Mono', monospace;
  width: 300px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #00ff00;
    box-shadow: 0 0 10px #00ff00;
    width: 350px;
  }
`;

const Button = styled(motion.button)`
  background: #00ff00;
  color: #000;
  border: none;
  padding: 0.8rem 1.5rem;
  cursor: pointer;
  font-family: 'Share Tech Mono', monospace;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: 0.5s;
  }

  &:hover::before {
    left: 100%;
  }
`;

const Message = styled(motion.div)`
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 1rem;
  border-radius: 5px;
  color: ${props => props.success ? '#00ff00' : '#ff0000'};
  background: rgba(0, 0, 0, 0.9);
  border: 1px solid ${props => props.success ? '#00ff00' : '#ff0000'};
  z-index: 1000;
`;

const Debug = styled.pre`
  position: fixed;
  top: 10px;
  left: 10px;
  background: rgba(0,0,0,0.8);
  padding: 10px;
  color: #00ff00;
  font-size: 12px;
  z-index: 9999;
`;

export function ChallengesPage() {
  const { user, userData, currentChallenge } = useAuth();

  const handleSubmitFlag = async (flag) => {
    if (!user || !currentChallenge) return;
    
    try {
      if (flag === currentChallenge.flag) {
        const userRef = doc(db, 'users', user.uid);
        await runTransaction(db, async (transaction) => {
          const userDoc = await transaction.get(userRef);
          if (!userDoc.exists()) return;
          
          transaction.update(userRef, {
            points: (userDoc.data().points || 0) + currentChallenge.points,
            completedChallenges: arrayUnion(currentChallenge.id)
          });
        });
        toast.success('Challenge réussi !');
      } else {
        toast.error('Flag incorrect');
      }
    } catch (error) {
      console.error('Erreur lors de la soumission du flag:', error);
      toast.error('Erreur lors de la soumission du flag');
    }
  };

  const handleUseHint = async (challengeId) => {
    if (!user || !userData) return;
    
    try {
      const userRef = doc(db, 'users', user.uid);
      
      await runTransaction(db, async (transaction) => {
        const userDoc = await transaction.get(userRef);
        if (!userDoc.exists()) return;
        
        const currentPoints = userDoc.data().points || 0;
        const pointsToDeduct = challengeId.includes('_chatgpt') ? 100 : 10;
        
        transaction.update(userRef, {
          points: currentPoints - pointsToDeduct,
          usedHints: arrayUnion(challengeId)
        });
      });

      const hintType = challengeId.includes('_chatgpt') ? 'ChatGPT activé' : 'Indice débloqué';
      const points = challengeId.includes('_chatgpt') ? 100 : 10;
      toast.warning(`${hintType} (-${points} points)`);
    } catch (error) {
      console.error('Erreur lors de l\'utilisation de l\'indice:', error);
      toast.error('Erreur lors de l\'utilisation de l\'indice');
    }
  };

  if (!currentChallenge) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-green-500">Aucun challenge en cours</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Challenge 
        challenge={currentChallenge}
        onSubmit={handleSubmitFlag}
        onUseHint={handleUseHint}
      />
    </div>
  );
} 
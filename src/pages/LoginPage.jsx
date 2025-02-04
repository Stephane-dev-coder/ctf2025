import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FirebaseService } from '../services/firebaseService';
import { auth } from '../config/firebase';
import { signInAnonymously } from 'firebase/auth';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
  padding: 2rem;
`;

const LoginForm = styled.form`
  background: rgba(0, 20, 0, 0.8);
  border: 1px solid #00ff00;
  padding: 2rem;
  border-radius: 5px;
  width: 100%;
  max-width: 400px;
  position: relative;
  overflow: hidden;

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
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
`;

const Title = styled.h2`
  color: #00ff00;
  text-align: center;
  margin-bottom: 2rem;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const Input = styled.input`
  width: 100%;
  background: rgba(0, 20, 0, 0.8);
  border: 1px solid #00ff00;
  color: #00ff00;
  padding: 0.8rem;
  margin-bottom: 1rem;
  font-family: 'Share Tech Mono', monospace;

  &:focus {
    outline: none;
    border-color: #00ff00;
    box-shadow: 0 0 5px #00ff00;
  }
`;

const Button = styled.button`
  width: 100%;
  background: #00ff00;
  color: #000;
  border: none;
  padding: 0.8rem;
  cursor: pointer;
  font-family: 'Share Tech Mono', monospace;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;

  &:hover {
    background: #00cc00;
  }
`;

export const LoginPage = () => {
  const [agentName, setAgentName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Connexion anonyme
      const { user } = await signInAnonymously(auth);
      
      // Création du profil de l'agent
      await FirebaseService.createUserProfile(user.uid, {
        username: agentName,
        createdAt: new Date().toISOString()
      });

      // Redirection vers les défis
      navigate('/challenges');
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
    }
  };

  return (
    <Container>
      <LoginForm onSubmit={handleSubmit}>
        <Title>Identification Agent</Title>
        <Input
          type="text"
          placeholder="Nom de code de l'agent..."
          value={agentName}
          onChange={(e) => setAgentName(e.target.value)}
          required
          minLength={3}
          maxLength={20}
        />
        <Button type="submit">Commencer la mission</Button>
      </LoginForm>
    </Container>
  );
}; 
import React from 'react';
import styled from 'styled-components';
import { initializeDatabase } from '../../scripts/initializeDatabase';

const Button = styled.button`
  background: #00ff00;
  color: #000;
  padding: 1rem;
  border: none;
  cursor: pointer;
  margin: 1rem;
`;

export const InitializeButton = () => {
  const handleInitialize = async () => {
    try {
      await initializeDatabase();
      alert('Base de données initialisée avec succès !');
    } catch (error) {
      console.error('Erreur lors de l\'initialisation:', error);
      alert('Erreur lors de l\'initialisation');
    }
  };

  return (
    <Button onClick={handleInitialize}>
      Initialiser la base de données
    </Button>
  );
}; 
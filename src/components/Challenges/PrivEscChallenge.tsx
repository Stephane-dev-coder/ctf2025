import React from 'react';
import { BaseTerminal } from '../BaseTerminal';
import { privescSystem } from '../../systems/challenges';

interface PrivEscChallengeProps {
  onFlag: (flag: string) => void;
}

export const PrivEscChallenge = ({ onFlag }: PrivEscChallengeProps) => {
  return (
    <BaseTerminal 
      system={privescSystem}
      onFlag={onFlag}
      prompt="user@veilleurs-server:~$ "
    />
  );
}; 
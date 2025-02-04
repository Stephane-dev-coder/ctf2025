import React from 'react';
<<<<<<< HEAD
=======
import { BaseTerminal } from '../BaseTerminal';
import { privescSystem } from '../../systems/challenges';
>>>>>>> parent of 57bf36a (Revert "push modif terminal")

interface PrivEscChallengeProps {
  onFlag: (flag: string) => void;
}

<<<<<<< HEAD
export function PrivEscChallenge({ onFlag }: PrivEscChallengeProps) {
  return <div>Privilege Escalation Challenge</div>;
} 
=======
export const PrivEscChallenge = ({ onFlag }: PrivEscChallengeProps) => {
  return (
    <BaseTerminal 
      system={privescSystem}
      onFlag={onFlag}
      prompt="user@veilleurs-server:~$ "
    />
  );
}; 
>>>>>>> parent of 57bf36a (Revert "push modif terminal")

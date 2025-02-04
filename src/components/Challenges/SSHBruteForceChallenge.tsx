import React from 'react';
<<<<<<< HEAD
=======
import { BaseTerminal } from '../BaseTerminal';
import { sshSystem } from '../../systems/challenges';
>>>>>>> parent of 57bf36a (Revert "push modif terminal")

interface SSHBruteForceChallengeProps {
  onFlag: (flag: string) => void;
}

<<<<<<< HEAD
export function SSHBruteForceChallenge({ onFlag }: SSHBruteForceChallengeProps) {
  return <div>SSH Brute Force Challenge</div>;
} 
=======
export const SSHBruteForceChallenge = ({ onFlag }: SSHBruteForceChallengeProps) => {
  return (
    <BaseTerminal 
      system={sshSystem}
      onFlag={onFlag}
      prompt="ssh> "
    />
  );
}; 
>>>>>>> parent of 57bf36a (Revert "push modif terminal")

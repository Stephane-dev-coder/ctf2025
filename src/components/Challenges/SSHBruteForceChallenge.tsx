import React from 'react';
import { BaseTerminal } from '../BaseTerminal';
import { sshSystem } from '../../systems/challenges';

interface SSHBruteForceChallengeProps {
  onFlag: (flag: string) => void;
}

export const SSHBruteForceChallenge = ({ onFlag }: SSHBruteForceChallengeProps) => {
  return (
    <BaseTerminal 
      system={sshSystem}
      onFlag={onFlag}
      prompt="ssh> "
    />
  );
}; 
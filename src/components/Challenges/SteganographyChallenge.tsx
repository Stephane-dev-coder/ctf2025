import React from 'react';
import { BaseTerminal } from '../BaseTerminal';
import { stegSystem } from '../../systems/challenges';

interface SteganographyChallengeProps {
  onFlag: (flag: string) => void;
}

export const SteganographyChallenge = ({ onFlag }: SteganographyChallengeProps) => {
  return (
    <BaseTerminal 
      system={stegSystem}
      onFlag={onFlag}
      prompt="steg> "
    />
  );
}; 
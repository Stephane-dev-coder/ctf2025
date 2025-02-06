import React from 'react';
import { BaseTerminal } from '../BaseTerminal';
import { cotePaveSystem } from '../../systems/challenges';

interface WifiHackingChallengeProps {
  onFlag: (flag: string) => void;
}

export const WifiHackingChallenge = ({ onFlag }: WifiHackingChallengeProps) => {
  return (
    <BaseTerminal 
      system={cotePaveSystem}
      onFlag={onFlag}
      prompt="wifi> "
    />
  );
}; 
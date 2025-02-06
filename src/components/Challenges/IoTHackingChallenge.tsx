import React from 'react';
import { BaseTerminal } from '../BaseTerminal';
import { mirailSystem } from '../../systems/challenges';

interface IoTHackingChallengeProps {
  onFlag: (flag: string) => void;
}

export const IoTHackingChallenge = ({ onFlag }: IoTHackingChallengeProps) => {
  return (
    <BaseTerminal 
      system={mirailSystem}
      onFlag={onFlag}
      prompt="iot> "
    />
  );
}; 
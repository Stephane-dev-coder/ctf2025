import React from 'react';
import { BaseTerminal } from '../BaseTerminal';
import { balamatsSystem } from '../../systems/challenges';

interface RFIDCloningChallengeProps {
  onFlag: (flag: string) => void;
}

export const RFIDCloningChallenge = ({ onFlag }: RFIDCloningChallengeProps) => {
  return (
    <BaseTerminal 
      system={balamatsSystem}
      onFlag={onFlag}
      prompt="rfid> "
    />
  );
}; 
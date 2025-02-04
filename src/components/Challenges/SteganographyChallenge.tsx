import React from 'react';
<<<<<<< HEAD
=======
import { BaseTerminal } from '../BaseTerminal';
import { stegSystem } from '../../systems/challenges';
>>>>>>> parent of 57bf36a (Revert "push modif terminal")

interface SteganographyChallengeProps {
  onFlag: (flag: string) => void;
}

<<<<<<< HEAD
export function SteganographyChallenge({ onFlag }: SteganographyChallengeProps) {
  return <div>Steganography Challenge</div>;
} 
=======
export const SteganographyChallenge = ({ onFlag }: SteganographyChallengeProps) => {
  return (
    <BaseTerminal 
      system={stegSystem}
      onFlag={onFlag}
      prompt="steg> "
    />
  );
}; 
>>>>>>> parent of 57bf36a (Revert "push modif terminal")

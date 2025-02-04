<<<<<<< HEAD
import React from 'react';
<<<<<<< HEAD
=======
import { BaseTerminal } from '../BaseTerminal';
import { stegSystem } from '../../systems/challenges';
>>>>>>> parent of 57bf36a (Revert "push modif terminal")
=======
import React, { useState } from 'react';
import { Terminal } from '../Terminal';
>>>>>>> parent of 9394674 (push modif terminal)

interface SteganographyChallengeProps {
  onFlag: (flag: string) => void;
}

<<<<<<< HEAD
export function SteganographyChallenge({ onFlag }: SteganographyChallengeProps) {
  return <div>Steganography Challenge</div>;
} 
=======
export const SteganographyChallenge = ({ onFlag }: SteganographyChallengeProps) => {
  const [password, setPassword] = useState('');
  const [output, setOutput] = useState<string[]>([]);

  const handleExtract = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === 'carmes2025') {
      setOutput(prev => [...prev, `
Extracting data from secret.jpg...
Found hidden message:
CTF{ST3G4N0_C4RM3S_2025}
      `]);
      onFlag('CTF{ST3G4N0_C4RM3S_2025}');
    } else {
      setOutput(prev => [...prev, 'Could not extract any data with this password']);
    }
  };

  return (
    <div className="space-y-4">
      <Terminal>
        <div className="space-y-4">
          <img 
            src="/challenges/secret.jpg" 
            alt="Hidden message" 
            className="max-w-full h-auto border border-green-500/30"
          />
          
          <div className="font-mono">
            <p>steghide version 0.5.1</p>
            <p>Fichier: secret.jpg</p>
          </div>
          
          <form onSubmit={handleExtract} className="flex gap-2">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Extraction password"
              className="bg-black border border-green-500 text-green-500 px-2 py-1"
            />
            <button
              type="submit"
              className="bg-green-500/20 border border-green-500 px-4 py-1 hover:bg-green-500/30"
            >
              Extract
            </button>
          </form>
        </div>
      </Terminal>

      {output.length > 0 && (
        <Terminal>
          <div className="font-mono whitespace-pre-wrap">
            {output.map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </div>
        </Terminal>
      )}
    </div>
  );
}; 
>>>>>>> parent of 57bf36a (Revert "push modif terminal")

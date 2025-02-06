import React, { useState } from 'react';
import { Terminal } from '../Terminal';
import { BaseTerminal } from '../BaseTerminal';
import { sshSystem } from '../../systems/challenges';

interface SSHBruteForceChallengeProps {
  onFlag: (flag: string) => void;
}

export const SSHBruteForceChallenge = ({ onFlag }: SSHBruteForceChallengeProps) => {
  const [password, setPassword] = useState('');
  const [output, setOutput] = useState<string[]>([]);
  const [attempts, setAttempts] = useState(0);
  const [showTerminal, setShowTerminal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAttempts(prev => prev + 1);
    
    // Simuler une tentative de connexion SSH
    setOutput(prev => [...prev, `[Tentative ${attempts + 1}] Connexion à admin@192.168.1.100...`]);
    
    if (password === '1337') {
      setOutput(prev => [...prev, `
Connexion réussie !
Dernière connexion : Thu Mar 14 15:42:23 2024

Flag: CTF{SSH_BRUT3_F0RC3_CYPR13N}
      `]);
      onFlag('CTF{SSH_BRUT3_F0RC3_CYPR13N}');
    } else {
      setOutput(prev => [...prev, 'Accès refusé']);
      
      // Donner un indice après plusieurs tentatives
      if (attempts === 5) {
        setOutput(prev => [...prev, '\nIndice: Les hackers aiment ce nombre à 4 chiffres...']);
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* Interface de connexion SSH */}
      <Terminal>
        <div className="space-y-4">
          <div className="text-green-500 font-mono">
            <p>OpenSSH 8.9p1 Ubuntu-3ubuntu0.1</p>
            <p>admin@192.168.1.100</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm">Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-black border border-green-500 text-green-500 px-2 py-1 w-full font-mono"
              />
            </div>
            
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-green-500/20 border border-green-500 px-4 py-1 hover:bg-green-500/30"
              >
                Connexion
              </button>
              <button
                type="button"
                onClick={() => setShowTerminal(!showTerminal)}
                className="bg-green-500/20 border border-green-500 px-4 py-1 hover:bg-green-500/30"
              >
                {showTerminal ? 'Cacher Terminal' : 'Afficher Terminal'}
              </button>
            </div>

            <div className="text-sm text-green-500/50">
              Tentatives: {attempts}
            </div>
          </form>
        </div>
      </Terminal>

      {/* Affichage des résultats */}
      {output.length > 0 && (
        <Terminal>
          <div className="font-mono whitespace-pre-wrap">
            {output.map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </div>
        </Terminal>
      )}

      {/* Terminal interactif */}
      {showTerminal && (
        <BaseTerminal 
          system={sshSystem}
          onFlag={onFlag}
          prompt="ssh> "
        />
      )}
    </div>
  );
}; 
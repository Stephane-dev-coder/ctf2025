import React, { useState } from 'react';
import { Terminal } from '../Terminal';

interface SSHBruteForceChallengeProps {
  onFlag: (flag: string) => void;
}

export const SSHBruteForceChallenge = ({ onFlag }: SSHBruteForceChallengeProps) => {
  const [password, setPassword] = useState('');
  const [output, setOutput] = useState<string[]>([]);
  const [attempts, setAttempts] = useState(0);

  const handleConnect = (e: React.FormEvent) => {
    e.preventDefault();
    setAttempts(prev => prev + 1);
    
    setOutput(prev => [...prev, `[${attempts}] Trying password: ${password}`]);
    
    if (password === '1337') {
      setOutput(prev => [...prev, `
Connection successful!
Welcome to Veilleurs-Server
Last login: Thu Mar 14 15:42:23 2024

Flag: CTF{SSH_BRUT3_F0RC3_CYPR13N}
      `]);
      onFlag('CTF{SSH_BRUT3_F0RC3_CYPR13N}');
    } else {
      setOutput(prev => [...prev, 'Access denied']);
    }
  };

  return (
    <div className="space-y-4">
      <Terminal>
        <div className="space-y-4">
          <div className="font-mono">
            <p>SSH Connection to veilleurs-server</p>
            <p>IP: 192.168.1.100</p>
            <p>User: admin</p>
            <p className="text-yellow-500">Note: Le mot de passe est un nombre à 4 chiffres</p>
          </div>
          
          <form onSubmit={handleConnect} className="flex gap-2">
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="bg-black border border-green-500 text-green-500 px-2 py-1"
            />
            <button
              type="submit"
              className="bg-green-500/20 border border-green-500 px-4 py-1 hover:bg-green-500/30"
            >
              Connect
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
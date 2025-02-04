import React, { useState } from 'react';
import { Terminal } from '../Terminal';

interface SQLInjectionChallengeProps {
  onFlag: (flag: string) => void;
}

export function SQLInjectionChallenge({ onFlag }: SQLInjectionChallengeProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [output, setOutput] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simuler une requête SQL
    const query = `SELECT * FROM users WHERE username='${username}' AND password='${password}'`;
    
    setOutput(prev => [...prev, `Executing query: ${query}`]);
    
    if (username.toLowerCase().includes("' or '1'='1")) {
      setOutput(prev => [...prev, `
Found 1 record:
ID: 1
Username: admin
Role: administrator
Flag: CTF{SQL_1nj3ct10n_C4p1t0l3}
      `]);
      onFlag('CTF{SQL_1nj3ct10n_C4p1t0l3}');
    } else {
      setOutput(prev => [...prev, 'No records found']);
    }
  };

  return (
    <div className="space-y-4">
      <Terminal>
        <div className="space-y-4">
          <div className="text-green-500 font-mono">
            <p>Système d'authentification des Veilleurs</p>
            <p>Version 1.0</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm">Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-black border border-green-500 text-green-500 px-2 py-1 w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm">Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-black border border-green-500 text-green-500 px-2 py-1 w-full"
              />
            </div>
            
            <button
              type="submit"
              className="bg-green-500/20 border border-green-500 px-4 py-1 hover:bg-green-500/30"
            >
              Login
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
} 
import React, { useState } from 'react';
import { Terminal } from './Terminal';
import { System } from '../systems/base';

interface ChallengeTerminalProps {
  system: System;
  onFlag: (flag: string) => void;
}

export const ChallengeTerminal = ({ system, onFlag }: ChallengeTerminalProps) => {
  const [history, setHistory] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const handleCommand = (cmd: string) => {
    const [command, ...args] = cmd.split(' ');
    
    if (system.commands[command]) {
      const output = system.commands[command](...args);
      setHistory(prev => [...prev, `$ ${cmd}`, output]);
      
      if (output.includes('CTF{')) {
        const flag = output.match(/CTF{[^}]+}/)?.[0];
        if (flag) onFlag(flag);
      }
    } else {
      setHistory(prev => [...prev, `$ ${cmd}`, 'Command not found']);
    }
  };

  return (
    <Terminal>
      <div className="font-mono">
        {history.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap">{line}</div>
        ))}
        <div className="flex items-center">
          <span className="mr-2">$</span>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                handleCommand(input);
                setInput('');
              }
            }}
            className="bg-transparent focus:outline-none flex-1"
            autoFocus
          />
        </div>
      </div>
    </Terminal>
  );
}; 
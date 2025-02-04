import React, { useState, useRef, useEffect } from 'react';
import { Terminal } from './Terminal';
import { System } from '../systems/base';

interface BaseTerminalProps {
  system: System;
  onFlag?: (flag: string) => void;
  prompt?: string;
}

export const BaseTerminal = ({ system, onFlag, prompt = '$ ' }: BaseTerminalProps) => {
  const [history, setHistory] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    if (!cmd.trim()) return;

    const [command, ...args] = cmd.trim().split(' ');
    
    setHistory(prev => [...prev, `${prompt}${cmd}`]);

    if (command in system.commands) {
      const output = system.commands[command](...args);
      setHistory(prev => [...prev, output]);

      // Vérifier si un flag est présent dans la sortie
      if (output.includes('CTF{') && onFlag) {
        const flag = output.match(/CTF{[^}]+}/)?.[0];
        if (flag) onFlag(flag);
      }
    } else {
      setHistory(prev => [...prev, `Commande non trouvée: ${command}`]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    }
  };

  return (
    <Terminal>
      <div className="font-mono text-sm">
        <div 
          ref={historyRef} 
          className="max-h-[400px] overflow-y-auto mb-2"
        >
          {/* Message d'accueil */}
          <div className="mb-4 text-green-500/70">
            Bienvenue sur le terminal des Veilleurs.
            Tapez 'help' pour voir les commandes disponibles.
          </div>

          {/* Historique des commandes */}
          {history.map((line, i) => (
            <div key={i} className="whitespace-pre-wrap mb-1">
              {line}
            </div>
          ))}
        </div>

        {/* Ligne de commande */}
        <div className="flex items-center">
          <span className="mr-2 text-green-500">{prompt}</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-green-500"
            autoFocus
          />
        </div>
      </div>
    </Terminal>
  );
}; 
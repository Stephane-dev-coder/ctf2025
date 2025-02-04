<<<<<<< HEAD
import React from 'react';
<<<<<<< HEAD
=======
import { BaseTerminal } from '../BaseTerminal';
import { privescSystem } from '../../systems/challenges';
>>>>>>> parent of 57bf36a (Revert "push modif terminal")
=======
import React, { useState } from 'react';
import { Terminal } from '../Terminal';
>>>>>>> parent of 9394674 (push modif terminal)

interface PrivEscChallengeProps {
  onFlag: (flag: string) => void;
}

<<<<<<< HEAD
export function PrivEscChallenge({ onFlag }: PrivEscChallengeProps) {
  return <div>Privilege Escalation Challenge</div>;
} 
=======
export const PrivEscChallenge = ({ onFlag }: PrivEscChallengeProps) => {
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState<string[]>([
    'user@veilleurs-server:~$ ls -l',
    '-rwsr-xr-x 1 root root 123 Mar 14 15:42 backup.sh',
    '-rw-r--r-- 1 root root  45 Mar 14 15:42 note.txt'
  ]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    
    setOutput(prev => [...prev, `user@veilleurs-server:~$ ${command}`]);
    
    switch (command) {
      case 'ls':
        setOutput(prev => [...prev, 'backup.sh  note.txt']);
        break;
      case 'ls -l':
        setOutput(prev => [...prev, `-rwsr-xr-x 1 root root 123 Mar 14 15:42 backup.sh
-rw-r--r-- 1 root root  45 Mar 14 15:42 note.txt`]);
        break;
      case 'cat backup.sh':
        setOutput(prev => [...prev, `#!/bin/bash
# Script de backup automatique
# SUID bit set
cp -r /home/user/* /backup/`]);
        break;
      case 'cat note.txt':
        setOutput(prev => [...prev, 'N\'oubliez pas de faire les backups quotidiens']);
        break;
      case './backup.sh':
        setOutput(prev => [...prev, `Running backup as root...
Found flag in /root: CTF{PR1V_3SC_J34N_J4UR3S}`]);
        onFlag('CTF{PR1V_3SC_J34N_J4UR3S}');
        break;
      default:
        setOutput(prev => [...prev, 'Command not found']);
    }
    
    setCommand('');
  };

  return (
    <Terminal>
      <div className="font-mono">
        <div className="whitespace-pre-wrap mb-4">
          {output.map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </div>
        
        <form onSubmit={handleCommand} className="flex items-center">
          <span className="mr-2">user@veilleurs-server:~$</span>
          <input
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            className="bg-transparent border-none outline-none flex-1"
            autoFocus
          />
        </form>
      </div>
    </Terminal>
  );
}; 
>>>>>>> parent of 57bf36a (Revert "push modif terminal")

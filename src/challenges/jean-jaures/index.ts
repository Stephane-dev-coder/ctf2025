import { FileSystem } from '../../systems/base';

const files: Partial<FileSystem> = {
  'backup.sh': `#!/bin/bash
# Script de backup automatique
# SUID bit set
cp -r /home/user/* /backup/`,
  'note.txt': 'N\'oubliez pas de faire les backups quotidiens'
};

export const jeanJauresChallenge = {
  id: 'jean-jaures',
  name: 'Jean Jaurès',
  type: 'Privilege Escalation',
  description: 'Un script de backup suspect...',
  hint: 'Les permissions SUID peuvent être dangereuses...',
  points: 300,
  flag: 'CTF{PR1V_3SC_J34N_J4UR3S}',
  
  system: {
    files,
    commands: {
      'ls': () => Object.keys(files).join('\n'),
      'cat': (filename: keyof typeof files) => files[filename] || 'File not found',
      'ls -l': () => `-rwsr-xr-x 1 root root 123 Mar 14 15:42 backup.sh
-rw-r--r-- 1 root root  45 Mar 14 15:42 note.txt`
    }
  }
}; 
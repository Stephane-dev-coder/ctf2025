import { createSystem } from '../base';

export const privescSystem = createSystem(
  {
    'backup.sh': `#!/bin/bash
# Script de backup automatique
# SUID bit set
cp -r /home/user/* /backup/`,
    'note.txt': 'N\'oubliez pas de faire les backups quotidiens'
  },
  {
    'ls': () => 'backup.sh  note.txt',
    'ls': (arg?: string) => {
      if (arg === '-l') {
        return `-rwsr-xr-x 1 root root 123 Mar 14 15:42 backup.sh
-rw-r--r-- 1 root root  45 Mar 14 15:42 note.txt`;
      }
      return 'backup.sh  note.txt';
    },
    'cat': (filename: string) => privescSystem.files[filename] || 'File not found',
    'help': () => `
Commandes disponibles:
  ls       - Liste les fichiers
  ls -l    - Liste les fichiers avec leurs permissions
  cat      - Affiche le contenu d'un fichier
  ./       - Exécute un fichier
  chmod    - Change les permissions d'un fichier
  help     - Affiche cette aide
`,
    './backup.sh': () => `Running backup as root...
Found flag in /root: CTF{PR1V_3SC_J34N_J4UR3S}`,
    'chmod': () => 'Permission denied: Operation not permitted',
    'sudo': () => 'Sorry, user is not in the sudoers file.'
  }
); 
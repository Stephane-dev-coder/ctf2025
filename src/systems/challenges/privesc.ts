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
    'ls -l': () => `-rwsr-xr-x 1 root root 123 Mar 14 15:42 backup.sh
-rw-r--r-- 1 root root  45 Mar 14 15:42 note.txt`,
    './backup.sh': () => `Running backup as root...
Found flag in /root: CTF{PR1V_3SC_J34N_J4UR3S}`
  }
); 
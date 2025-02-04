export const jeanJauresChallenge = {
  id: 'jean-jaures',
  name: 'Jean-Jaurès',
  type: 'Privilege Escalation',
  description: 'Gravir les échelons de leur réseau...',
  hint: 'Un programme oublié pourrait être la clé...',
  points: 250,
  flag: 'CTF{PR1V_3SC_J34N_J4UR3S}',
  
  system: {
    files: {
      'backup.sh': `#!/bin/bash
# Script de backup automatique
# SUID bit set
cp -r /home/user/* /backup/`,
      'note.txt': 'N\'oubliez pas de faire les backups quotidiens'
    },
    
    commands: {
      'ls': () => Object.keys(jeanJauresChallenge.system.files).join('\n'),
      'ls -l': () => `-rwsr-xr-x 1 root root  123 Mar 14 15:42 backup.sh
-rw-r--r-- 1 root root   45 Mar 14 15:42 note.txt`,
      'cat': (filename: string) => jeanJauresChallenge.system.files[filename] || 'File not found',
      'sudo': () => 'Sorry, user is not in the sudoers file.',
      './backup.sh': () => {
        return `Running backup as root...
Found flag in /root: CTF{PR1V_3SC_J34N_J4UR3S}`;
      }
    }
  }
}; 
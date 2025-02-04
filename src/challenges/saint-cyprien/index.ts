import { FileSystem } from '../../systems/base';

const files: Partial<FileSystem> = {
  'ssh_config': `Host veilleurs-server
  HostName 192.168.1.100
  User admin
  Port 22`,
  'note.txt': 'Le mot de passe est un nombre à 4 chiffres...'
};

export const saintCyprienChallenge = {
  id: 'saint-cyprien',
  name: 'Saint-Cyprien',
  type: 'Brute Force',
  description: 'Un serveur SSH mal configuré...',
  hint: 'Les mots de passe numériques sont faciles à deviner...',
  points: 150,
  flag: 'CTF{SSH_BRUT3_F0RC3_CYPR13N}',
  
  system: {
    files,
    commands: {
      'ls': () => Object.keys(files).join('\n'),
      'cat': (filename: keyof typeof files) => files[filename] || 'File not found',
      'ssh': (password: string) => {
        if (password === '1337') {
          return `Welcome admin!
Last login: Thu Mar 14 15:42:23 2024

Flag: CTF{SSH_BRUT3_F0RC3_CYPR13N}`;
        }
        return 'Access denied';
      }
    }
  }
}; 
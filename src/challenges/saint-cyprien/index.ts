export const saintCyprienChallenge = {
  id: 'saint-cyprien',
  name: 'Saint-Cyprien',
  type: 'Brute Force SSH',
  description: 'Les frontières sont floues, les chemins ordinaires cachent des passages...',
  hint: 'Les nombres basiques protègent ces portes...',
  points: 150,
  flag: 'CTF{SSH_BRUT3_F0RC3_CYPR13N}',
  
  system: {
    files: {
      'ssh_config': `
Host veilleurs-server
  HostName 192.168.1.100
  User admin
  Port 22`,
      'note.txt': 'Le mot de passe est un nombre à 4 chiffres...'
    },
    
    commands: {
      'ls': () => Object.keys(saintCyprienChallenge.system.files).join('\n'),
      'cat': (filename: string) => saintCyprienChallenge.system.files[filename] || 'File not found',
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
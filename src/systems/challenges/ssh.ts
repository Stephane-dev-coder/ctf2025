import { createSystem } from '../base';

export const sshSystem = createSystem(
  {
    'ssh_config': `
Host veilleurs-server
  HostName 192.168.1.100
  User admin
  Port 22`,
    'note.txt': 'Le mot de passe est un nombre à 4 chiffres...'
  },
  {
    ssh: (password: string) => {
      if (password === '1337') {
        return `Welcome admin!
Last login: Thu Mar 14 15:42:23 2024

Flag: CTF{SSH_BRUT3_F0RC3_CYPR13N}`;
      }
      return 'Access denied';
    }
  }
); 
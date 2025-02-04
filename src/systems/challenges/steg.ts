import { createSystem } from '../base';

export const stegSystem = createSystem(
  {
    'secret.jpg': 'Une image avec des données cachées',
    'README.txt': 'Les secrets sont parfois cachés dans les bits les moins significatifs...'
  },
  {
    steghide: (command: string, ...args: string[]) => {
      if (command === 'extract' && args[0] === '-sf' && args[1] === 'secret.jpg' && args[2] === '-p' && args[3] === 'carmes2025') {
        return `Extracted data: CTF{ST3G4N0_C4RM3S_2025}`;
      }
      return 'steghide: could not extract any data';
    }
  }
); 
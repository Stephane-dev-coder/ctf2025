import { FileSystem } from '../../systems/base';

const files: Partial<FileSystem> = {
  'secret.jpg': 'Une image avec des données cachées',
  'README.txt': 'Les secrets sont parfois cachés dans les bits les moins significatifs...'
};

export const carmesChallenge = {
  id: 'carmes',
  name: 'Carmes',
  type: 'Stéganographie',
  description: 'Les documents contiennent plus qu\'ils ne laissent paraître...',
  hint: 'Regarde dans les marges, fouille les détails enfouis...',
  points: 200,
  flag: 'CTF{ST3G4N0_C4RM3S_2025}',
  
  system: {
    files,
    
    commands: {
      'ls': () => Object.keys(files).join('\n'),
      'cat': (filename: keyof typeof files) => files[filename] || 'File not found',
      'steghide': (args: string[]) => {
        if (args[0] === 'extract' && args[1] === '-sf' && args[2] === 'secret.jpg' && args[3] === '-p' && args[4] === 'carmes2025') {
          return `
Extracted data: CTF{ST3G4N0_C4RM3S_2025}
`;
        }
        return 'steghide: could not extract any data';
      }
    }
  }
}; 
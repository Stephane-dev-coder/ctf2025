import { createSystem } from '../base';

export const stegSystem = createSystem(
  {
    'secret.txt': 'https://drive.google.com/file/d/1azUn0tKU1PMsTCI1R79PUfRn8RP3mn_V/view?usp=sharing',
    'README.txt': 'Les secrets sont parfois cachés dans les bits les moins significatifs...'
  },
  {
    steghide: (command: string, ...args: string[]) => {
      if (command === 'extract' && args[0] === '-sf' && args[1] === 'secret.jpg' && args[2] === '-p' && args[3] === 'carmes2025') {
        return `Extracted data: `;
      }
      return 'steghide: could not extract any data';
    }
  }
); 
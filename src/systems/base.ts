import { CommandSystem, baseCommands } from './commands';
import { VirtualFileSystem, createVirtualFileSystem } from './filesystem';

export interface System {
  commands: CommandSystem;
  files: VirtualFileSystem;
  env: {
    [key: string]: string;
  };
}

export const createSystem = (
  files: { [key: string]: string } = {},
  additionalCommands: CommandSystem = {},
  env: { [key: string]: string } = {}
): System => {
  const vfs = createVirtualFileSystem(files);
  
  const commands: CommandSystem = {
    ...baseCommands,
    ls: (path = '.') => {
      const files = Object.keys(vfs).filter(f => !f.includes('/') || f.startsWith(path));
      return files.join('\n');
    },
    cat: (filename: string) => {
      if (vfs[filename]) {
        return vfs[filename].content;
      }
      return 'File not found';
    },
    ...additionalCommands
  };

  return {
    commands,
    files: vfs,
    env: {
      USER: 'user',
      HOME: '/home/user',
      PATH: '/usr/local/bin:/usr/bin:/bin',
      ...env
    }
  };
}; 
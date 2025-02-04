import { CommandSystem, baseCommands } from './commands';

export interface FileSystem {
  [key: string]: string;
}

export interface System {
  commands: CommandSystem;
  files: FileSystem;
  env: {
    [key: string]: string;
  };
}

export const createSystem = (
  files: FileSystem = {},
  additionalCommands: CommandSystem = {},
  env: { [key: string]: string } = {}
): System => {
  const commands: CommandSystem = {
    ...baseCommands,
    ls: () => Object.keys(files).join('\n'),
    cat: (filename: string) => files[filename] || 'File not found',
    ...additionalCommands
  };

  return {
    commands,
    files,
    env: {
      USER: 'user',
      HOME: '/home/user',
      PATH: '/usr/local/bin:/usr/bin:/bin',
      ...env
    }
  };
}; 
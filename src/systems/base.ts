import { CommandSystem, baseCommands } from './commands';

export interface System {
  commands: CommandSystem;
  files: {
    [path: string]: string;
  };
  env: {
    [key: string]: string;
  };
}

export const createSystem = (
  files: { [key: string]: string } = {},
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
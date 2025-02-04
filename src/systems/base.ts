import { CommandSystem, baseCommands } from './commands';
<<<<<<< HEAD

export interface FileSystem {
  [key: string]: string | undefined;
  'login.php': string;
  'config.php': string;
  'database.sql': string;
  'secret.jpg': string;
  'README.txt': string;
  'backup.sh': string;
  'note.txt': string;
  'ssh_config': string;
}

export interface System {
  commands: CommandSystem;
  files: FileSystem;
=======

export interface System {
  commands: CommandSystem;
  files: {
    [path: string]: string;
  };
>>>>>>> parent of 57bf36a (Revert "push modif terminal")
  env: {
    [key: string]: string;
  };
}

export const createSystem = (
  files: Partial<FileSystem> = {},
  additionalCommands: CommandSystem = {},
  env: { [key: string]: string } = {}
): System => {
  const commands: CommandSystem = {
    ...baseCommands,
<<<<<<< HEAD
    ls: () => Object.keys(files).filter(key => files[key] !== undefined).join('\n'),
    cat: (filename: string) => files[filename] ?? 'File not found',
=======
    ls: () => Object.keys(files).join('\n'),
    cat: (filename: string) => files[filename] || 'File not found',
>>>>>>> parent of 57bf36a (Revert "push modif terminal")
    ...additionalCommands
  };

  return {
    commands,
<<<<<<< HEAD
    files: files as FileSystem,
=======
    files,
>>>>>>> parent of 57bf36a (Revert "push modif terminal")
    env: {
      USER: 'user',
      HOME: '/home/user',
      PATH: '/usr/local/bin:/usr/bin:/bin',
      ...env
    }
  };
}; 
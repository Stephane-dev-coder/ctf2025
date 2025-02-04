import { CommandSystem, baseCommands } from './commands';
<<<<<<< HEAD
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
=======
import { VirtualFileSystem, createVirtualFileSystem } from './filesystem';

export interface System {
  commands: CommandSystem;
  files: VirtualFileSystem;
>>>>>>> parent of 9394674 (push modif terminal)
  env: {
    [key: string]: string;
  };
}

export const createSystem = (
  files: Partial<FileSystem> = {},
  additionalCommands: CommandSystem = {},
  env: { [key: string]: string } = {}
): System => {
  const vfs = createVirtualFileSystem(files);
  
  const commands: CommandSystem = {
    ...baseCommands,
<<<<<<< HEAD
<<<<<<< HEAD
    ls: () => Object.keys(files).filter(key => files[key] !== undefined).join('\n'),
    cat: (filename: string) => files[filename] ?? 'File not found',
=======
    ls: () => Object.keys(files).join('\n'),
    cat: (filename: string) => files[filename] || 'File not found',
>>>>>>> parent of 57bf36a (Revert "push modif terminal")
=======
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
>>>>>>> parent of 9394674 (push modif terminal)
    ...additionalCommands
  };

  return {
    commands,
<<<<<<< HEAD
<<<<<<< HEAD
    files: files as FileSystem,
=======
    files,
>>>>>>> parent of 57bf36a (Revert "push modif terminal")
=======
    files: vfs,
>>>>>>> parent of 9394674 (push modif terminal)
    env: {
      USER: 'user',
      HOME: '/home/user',
      PATH: '/usr/local/bin:/usr/bin:/bin',
      ...env
    }
  };
}; 
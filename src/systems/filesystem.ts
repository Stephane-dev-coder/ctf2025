export interface VirtualFile {
  content: string;
  permissions?: string;
  owner?: string;
  group?: string;
  size?: number;
  modified?: string;
}

export interface VirtualFileSystem {
  [path: string]: VirtualFile;
}

export const createVirtualFileSystem = (files: { [key: string]: string }): VirtualFileSystem => {
  const vfs: VirtualFileSystem = {};
  
  Object.entries(files).forEach(([path, content]) => {
    vfs[path] = {
      content,
      permissions: '-rw-r--r--',
      owner: 'user',
      group: 'user',
      size: content.length,
      modified: new Date().toISOString()
    };
  });
  
  return vfs;
}; 
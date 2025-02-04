export type Command = (...args: string[]) => string;

export interface CommandSystem {
  [key: string]: Command;
}

export const baseCommands: CommandSystem = {
  help: () => `
Commandes disponibles:
  ls      - Liste les fichiers
  cat     - Affiche le contenu d'un fichier
  pwd     - Affiche le répertoire courant
  clear   - Efface l'écran
  help    - Affiche cette aide
`,
  pwd: () => '/home/user',
  clear: () => '',
}; 
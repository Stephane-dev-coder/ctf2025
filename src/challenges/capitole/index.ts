import { Terminal } from '../../components/Terminal';
import { FileSystem } from '../../systems/base';

const files: Partial<FileSystem> = {
  'login.php': `
<?php
$username = $_POST['username'];
$password = $_POST['password'];

$query = "SELECT * FROM users WHERE username='$username' AND password='$password'";
?>`,
  'config.php': `
<?php
$db_host = "localhost";
$db_user = "admin";
$db_pass = "********";
$db_name = "veilleurs_db";
?>`,
  'database.sql': `
CREATE TABLE users (
  id INT PRIMARY KEY,
  username VARCHAR(50),
  password VARCHAR(50),
  role VARCHAR(20)
);

INSERT INTO users VALUES (1, 'admin', 'supersecret', 'admin');
`
};

export const capitoleChallenge = {
  id: 'capitole',
  name: 'Capitole',
  type: 'SQL Injection',
  description: 'Les Veilleurs cachent leur système de communication...',
  hint: 'La faille des aveux... un simple caractère suffit...',
  points: 100,
  flag: 'CTF{SQL_1nj3ct10n_C4p1t0l3}',
  
  system: {
    files,
    
    commands: {
      'ls': () => Object.keys(files).join('\n'),
      'cat': (filename: keyof typeof files) => files[filename] || 'File not found',
      'mysql': (query: string) => {
        if (query.toLowerCase().includes("' or '1'='1")) {
          return `
1 rows in set
id  username  password     role
1   admin     supersecret  admin

Flag: CTF{SQL_1nj3ct10n_C4p1t0l3}
`;
        }
        return 'Access denied';
      }
    }
  }
}; 
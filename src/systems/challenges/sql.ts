import { createSystem } from '../base';

export const sqlSystem = createSystem(
  {
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
  },
  {
    mysql: (query: string) => {
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
); 
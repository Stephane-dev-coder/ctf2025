import { createSystem } from '../base';

// Challenge IoT Hacking
export const mirailSystem = createSystem(
  {
    'scan.txt': `
Scan des objets connectés:
192.168.1.50 - Camera de surveillance
192.168.1.51 - Thermostat intelligent
192.168.1.52 - Contrôle d'accès`,
    
    'firmware.bin': `
Firmware version: 1.0.2
Build date: 2024-01-15
Vulnérabilités connues: Buffer Overflow`,

    'protocol.txt': `
Protocole propriétaire:
Header: 0xMIRAIL
Payload: [commande][données]
Footer: 0xEND`
  },
  {
    nmap: (ip: string) => {
      if (ip === '192.168.1.52') {
        return `
PORT   STATE  SERVICE VERSION
8080   open   HTTP    IoT Control Panel
9999   open   Custom  Protocol Handler`;
      }
      return 'Host seems down';
    },
    exploit: (target: string) => {
      if (target === '192.168.1.52:9999' && target.includes('OVERFLOW')) {
        return `
[+] Envoi du payload...
[+] Buffer overflow réussi
[+] Accès root obtenu
[+] Contrôle d'accès désactivé

Flag: CTF{M1R41L_10T_0V3RFL0W_M4ST3R}`;
      }
      return 'Exploit échoué';
    }
  }
); 
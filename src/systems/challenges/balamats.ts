import { createSystem } from '../base';

// Challenge RFID Cloning
export const balamatsSystem = createSystem(
  {
    'rfid_scan.txt': `
Type: MIFARE Classic 1K
UID: A1:B2:C3:D4
Secteur 0: FF FF FF FF FF FF
Secteur 1: ?? ?? ?? ??
Key A: FFFFFFFFFFFF`,
    
    'badge_log.txt': `
14/03/2024 15:30 - Accès autorisé - Badge Admin
14/03/2024 15:35 - Accès refusé - Badge Inconnu
14/03/2024 15:42 - Tentative de clonage détectée`,

    'mfoc_output.txt': `
Secteurs récupérés: 15/16
Clés trouvées: 
A0:A1:A2:A3:A4:A5
B0:B1:B2:B3:B4:B5`
  },
  {
    mfoc: (args: string) => {
      if (args.includes('-O dump.mfd')) {
        return `
[+] Attaque RFID en cours...
[+] Lecture des secteurs...
[+] Dump complet obtenu
[+] Sauvegarde dans dump.mfd`;
      }
      return 'Usage: mfoc -O output.mfd';
    },
    nfc: (args: string) => {
      if (args.includes('--write') && args.includes('dump.mfd')) {
        return `
[+] Écriture du dump sur carte vierge
[+] Clonage réussi
[+] Test du badge cloné...
[+] Accès validé !

Flag: CTF{RF1D_CL0N3_B4L4M4TS_2024}`;
      }
      return 'Erreur de clonage';
    }
  }
); 
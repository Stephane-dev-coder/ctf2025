import { createSystem } from '../base';

// Challenge Wifi Hacking
export const cotePaveSystem = createSystem(
  {
    'wifi_scan.txt': `
Réseaux WiFi détectés:
1. VeilleursNetwork (WPA2)
2. FreeWifi
3. CotePave_Guest

Note importante: Le réseau VeilleursNetwork utilise un mot de passe simple
Format: quartier + chiffre`,
    
    'hint.txt': `
Indice pour le mot de passe:
- Commence par "cotepave"
- Suivi d'un nombre à 2 chiffres
- Année: 19XX`,

    'history.txt': `
Le quartier Côté Pavé a été créé en 1925.
Les premiers réseaux ont été installés en 1945.
Le bâtiment principal date de 1930.`
  },
  {
    scan: () => `
Scanning WiFi networks...
SSID: VeilleursNetwork
Security: WPA2
Signal: 90%
`,
    connect: (password: string) => {
      if (password === 'cotepave30') {
        return `
[+] Connexion réussie à VeilleursNetwork
[+] Accès au réseau établi
[+] Documents secrets trouvés

Flag: CTF{W1F1_CR4CK3D_C0T3_P4V3_1930}`;
      }
      return 'Mot de passe incorrect. Essayez encore...';
    }
  }
); 
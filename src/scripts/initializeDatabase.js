import { db } from '../config/firebase';
import { collection, doc, setDoc } from 'firebase/firestore';

const challenges = {
  capitole: {
    id: 'capitole',
    name: 'Capitole',
    type: 'SQL Injection',
    description: 'Les Veilleurs cachent leur système de communication...',
    hint: 'La faille des aveux... un simple caractère suffit...',
    points: 100,
    flag: 'SQL_1nj3ct10n_C4p1t0l3',
    requirements: [],
    hintCost: 20
  },
  saintCyprien: {
    id: 'saint-cyprien',
    name: 'Saint-Cyprien',
    type: 'Brute Force SSH',
    description: 'Les frontières sont floues, les chemins ordinaires cachent des passages...',
    hint: 'Les nombres basiques protègent ces portes...',
    points: 150,
    flag: 'CTF{SSH_BRUT3_F0RC3_CYPR13N}',
    requirements: ['capitole'],
    hintCost: 30
  },
  carmes: {
    id: 'carmes',
    name: 'Carmes',
    type: 'Stéganographie',
    description: 'Les documents contiennent plus qu\'ils ne laissent paraître...',
    hint: 'Regarde dans les marges, fouille les détails enfouis...',
    points: 200,
    flag: 'CTF{ST3G4N0_C4RM3S_2025}',
    requirements: ['saint-cyprien'],
    hintCost: 40
  },
  jeanJaures: {
    id: 'jean-jaures',
    name: 'Jean-Jaurès',
    type: 'Privilege Escalation',
    description: 'Gravir les échelons de leur réseau...',
    hint: 'Un programme oublié pourrait être la clé...',
    points: 250,
    flag: 'CTF{PR1V_3SC_J34N_J4UR3S}',
    requirements: ['carmes'],
    hintCost: 50
  }
};

export const initializeDatabase = async () => {
  try {
    console.log('Début de l\'initialisation de la base de données...');

    // Initialiser les défis
    for (const challenge of Object.values(challenges)) {
      console.log(`Ajout du défi: ${challenge.name}`);
      
      // Créer le document du défi
      await setDoc(doc(db, 'challenges', challenge.id), challenge);
      console.log(`Défi ${challenge.name} ajouté avec succès`);
      
      // Créer l'indice associé
      await setDoc(doc(db, 'hints', `${challenge.id}-hint`), {
        challengeId: challenge.id,
        content: challenge.hint,
        cost: challenge.hintCost,
        unlockCondition: null
      });
      console.log(`Indice pour ${challenge.name} ajouté avec succès`);
    }

    console.log('Base de données initialisée avec succès');
    return true;
  } catch (error) {
    console.error('Erreur lors de l\'initialisation:', error);
    throw error;
  }
}; 
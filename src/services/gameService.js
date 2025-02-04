import { db } from '../config/firebase';
import { doc, updateDoc, getDoc, arrayUnion } from 'firebase/firestore';

export const GameService = {
  // Système de progression
  async checkDistrictAccess(userId, districtId) {
    try {
      const userRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userRef);
      const userData = userDoc.data();
      
      const districtRef = doc(db, 'challenges', districtId);
      const districtDoc = await getDoc(districtRef);
      const requirements = districtDoc.data().requirements;

      return requirements.every(req => 
        userData.completedChallenges.includes(req)
      );
    } catch (error) {
      console.error('Erreur vérification accès:', error);
      throw error;
    }
  },

  // Système d'indices
  async purchaseHint(userId, hintId) {
    try {
      const hintRef = doc(db, 'hints', hintId);
      const hintDoc = await getDoc(hintRef);
      const hintData = hintDoc.data();

      const userRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userRef);
      const userData = userDoc.data();

      if (userData.score >= hintData.cost) {
        await updateDoc(userRef, {
          score: userData.score - hintData.cost,
          unlockedHints: arrayUnion(hintId)
        });
        return { success: true, hint: hintData.content };
      }
      
      return { success: false, message: 'Points insuffisants' };
    } catch (error) {
      console.error('Erreur achat indice:', error);
      throw error;
    }
  }
}; 
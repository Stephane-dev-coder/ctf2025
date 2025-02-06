import { db } from '../config/firebase';
import { doc, updateDoc, getDoc, arrayUnion } from 'firebase/firestore';

export const GameService = {
  // Système de progression
  async checkDistrictAccess(userId, districtId) {
    try {
      const userRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userRef);
      const userData = userDoc.data();
      
      // Ordre des districts
      const districtOrder = ['cote-pave', 'mirail', 'balamats'];
      const currentIndex = districtOrder.indexOf(districtId);
      
      // Vérifier si tous les districts précédents sont complétés
      if (currentIndex > 0) {
        const previousDistricts = districtOrder.slice(0, currentIndex);
        return previousDistricts.every(district => 
          userData.completedChallenges.includes(district)
        );
      }
      
      return true; // Premier district toujours accessible
    } catch (error) {
      console.error('Erreur vérification accès:', error);
      throw error;
    }
  },

  // Système de points et progression
  async updateProgress(userId, challengeId, points) {
    try {
      const userRef = doc(db, 'users', userId);
      
      await updateDoc(userRef, {
        score: points,
        completedChallenges: arrayUnion(challengeId),
        lastActive: new Date().toISOString()
      });

      // Débloquer des indices bonus après certains scores
      if (points >= 300) {
        await this.unlockBonusHint(userId);
      }

      return true;
    } catch (error) {
      console.error('Erreur mise à jour progression:', error);
      throw error;
    }
  },

  // Système d'indices bonus
  async unlockBonusHint(userId) {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        bonusHints: arrayUnion('master_hint'),
        lastActive: new Date().toISOString()
      });
    } catch (error) {
      console.error('Erreur déblocage indice bonus:', error);
      throw error;
    }
  },

  // Vérification de complétion
  async checkCompletion(userId) {
    try {
      const userRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userRef);
      const userData = userDoc.data();

      const allDistricts = ['cote-pave', 'mirail', 'balamats'];
      const completed = allDistricts.every(district => 
        userData.completedChallenges.includes(district)
      );

      if (completed) {
        await this.unlockMasterAchievement(userId);
      }

      return completed;
    } catch (error) {
      console.error('Erreur vérification complétion:', error);
      throw error;
    }
  },

  // Achievement final
  async unlockMasterAchievement(userId) {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        achievements: arrayUnion('toulouse_master'),
        completionDate: new Date().toISOString()
      });
    } catch (error) {
      console.error('Erreur déblocage achievement:', error);
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
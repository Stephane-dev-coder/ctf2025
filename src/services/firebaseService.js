import { db, auth } from '../config/firebase';
import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  query, 
  orderBy, 
  limit,
  getDocs,
  increment,
  arrayUnion
} from 'firebase/firestore';

export const FirebaseService = {
  // Gestion des utilisateurs
  async createUserProfile(userId, userData) {
    try {
      await setDoc(doc(db, 'users', userId), {
        ...userData,
        score: 0,
        currentDistrict: 'Capitole',
        completedChallenges: [],
        startTime: new Date().toISOString(),
        lastActive: new Date().toISOString()
      });
    } catch (error) {
      console.error('Erreur création profil:', error);
      throw error;
    }
  },

  // Gestion des défis
  async submitFlag(userId, challengeId, flag) {
    try {
      console.log('Début de la soumission du flag:', {
        userId,
        challengeId,
        flag
      });

      const challengeRef = doc(db, 'challenges', challengeId);
      const challengeDoc = await getDoc(challengeRef);
      
      console.log('Document du défi:', challengeDoc.data());

      if (!challengeDoc.exists()) {
        console.log('Défi non trouvé');
        throw new Error('Challenge non trouvé');
      }

      const correctFlag = challengeDoc.data().flag;
      console.log('Comparaison des flags:', {
        soumis: flag,
        correct: correctFlag
      });
      
      if (flag === correctFlag) {
        const userRef = doc(db, 'users', userId);
        await updateDoc(userRef, {
          score: increment(challengeDoc.data().points),
          completedChallenges: arrayUnion(challengeId),
          lastActive: new Date().toISOString()
        });
        console.log('Flag correct, profil utilisateur mis à jour');
        return { success: true, message: 'Flag correct!' };
      }
      
      console.log('Flag incorrect');
      return { success: false, message: 'Flag incorrect' };
    } catch (error) {
      console.error('Erreur détaillée dans submitFlag:', error);
      throw error;
    }
  },

  // Tableau des scores
  async getLeaderboard() {
    try {
      const q = query(
        collection(db, 'users'),
        orderBy('score', 'desc'),
        limit(10)
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Erreur récupération classement:', error);
      throw error;
    }
  }
}; 
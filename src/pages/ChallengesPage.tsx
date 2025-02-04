import React from 'react';
import { Challenge } from '../components/Challenge';
import { useAuth } from '../contexts/AuthContext';
import { doc, runTransaction, arrayUnion } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { toast } from 'react-hot-toast';

export function ChallengesPage() {
  const { user, userData } = useAuth();

  const handleSubmitFlag = async (flag: string) => {
    if (!user || !userData) return;
    
    try {
      // ... logique existante de soumission du flag ...
    } catch (error) {
      console.error('Erreur lors de la soumission du flag:', error);
      toast.error('Erreur lors de la soumission du flag');
    }
  };

  const handleUseHint = async (challengeId: string) => {
    if (!user || !userData) return;
    
    try {
      const userRef = doc(db, 'users', user.uid);
      
      await runTransaction(db, async (transaction) => {
        const userDoc = await transaction.get(userRef);
        if (!userDoc.exists()) return;
        
        // Mettre à jour les points de l'utilisateur
        const currentPoints = userDoc.data().points || 0;
        transaction.update(userRef, {
          points: currentPoints - 10,
          usedHints: arrayUnion(challengeId)
        });
      });

      toast.warning('Indice débloqué (-10 points)');
    } catch (error) {
      console.error('Erreur lors de l\'utilisation de l\'indice:', error);
      toast.error('Erreur lors de l\'utilisation de l\'indice');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {userData?.currentChallenge && (
        <Challenge 
          challenge={userData.currentChallenge}
          onSubmit={handleSubmitFlag}
          onUseHint={handleUseHint}
        />
      )}
    </div>
  );
} 
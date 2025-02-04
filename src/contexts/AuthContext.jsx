import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../lib/firebase';
import { doc, onSnapshot, collection } from 'firebase/firestore';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [challenges, setChallenges] = useState({});

  // Charger les challenges
  useEffect(() => {
    const fetchChallenges = async () => {
      const challengesRef = collection(db, 'challenges');
      const unsubscribe = onSnapshot(challengesRef, (snapshot) => {
        const challengesData = {};
        snapshot.forEach((doc) => {
          challengesData[doc.id] = {
            id: doc.id,
            ...doc.data()
          };
        });
        setChallenges(challengesData);
      });

      return unsubscribe;
    };

    fetchChallenges();
  }, []);

  // Gérer l'authentification
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Gérer les données utilisateur et le challenge actuel
  useEffect(() => {
    if (user) {
      const unsubscribe = onSnapshot(doc(db, 'users', user.uid), (doc) => {
        if (doc.exists()) {
          const data = doc.data();
          setUserData(data);
          
          // Mettre à jour le challenge actuel
          if (data.currentDistrict && challenges[data.currentDistrict]) {
            setCurrentChallenge(challenges[data.currentDistrict]);
          }
        }
      });

      return () => unsubscribe();
    }
  }, [user, challenges]);

  const value = {
    user,
    userData,
    currentChallenge,
    loading,
    challenges
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
} 
import { useState, useEffect } from 'react';
import { auth, db } from '../lib/firebase';
import { User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { User } from '../types';

interface AuthState {
  firebaseUser: FirebaseUser | null;
  user: User | null;
  loading: boolean;
  error: Error | null;
}

export function useAuth(): AuthState {
  const [state, setState] = useState<AuthState>({
    firebaseUser: null,
    user: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged(async (firebaseUser) => {
      try {
        if (firebaseUser) {
          // Écouter les changements en temps réel du document utilisateur
          const unsubscribeUser = onSnapshot(
            doc(db, 'users', firebaseUser.uid),
            (doc) => {
              const userData = doc.data() as User | undefined;
              setState({
                firebaseUser,
                user: userData || null,
                loading: false,
                error: null
              });
            },
            (error) => {
              setState({
                firebaseUser: null,
                user: null,
                loading: false,
                error: error as Error
              });
            }
          );

          return () => unsubscribeUser();
        } else {
          setState({
            firebaseUser: null,
            user: null,
            loading: false,
            error: null
          });
        }
      } catch (error) {
        setState({
          firebaseUser: null,
          user: null,
          loading: false,
          error: error as Error
        });
      }
    });

    return () => unsubscribeAuth();
  }, []);

  return state;
} 
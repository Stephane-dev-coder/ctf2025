import React, { useState, useEffect } from 'react';
import { Matrix } from './components/Matrix';
import { Terminal } from './components/Terminal';
import { Login } from './components/Login';
import { Challenge } from './components/Challenge';
import { Shield, Timer, Map, Trophy } from 'lucide-react';
import type { Challenge as ChallengeType, User, ScoreEntry } from './types';
import { auth, db } from './lib/firebase';
import { doc, setDoc, updateDoc, getDoc } from 'firebase/firestore';
import { signInAnonymously } from 'firebase/auth';
import { useAuth } from './hooks/useAuth';
import { Toast } from './components/Toast';
import { VictoryScreen } from './components/VictoryScreen';
import { LandingPage } from './components/LandingPage';
import { LeaderboardPage } from './components/LeaderboardPage';

const CHALLENGES: ChallengeType[] = [
  {
    id: 'capitole',
    name: 'SQL Injection',
    district: 'Capitole',
    message: 'Les Veilleurs cachent leur système de communication...',
    hint: 'La faille des aveux... un simple caractère suffit...',
    completed: false,
    flag: 'CTF{SQL_1nj3ct10n_C4p1t0l3}',
    points: 100
  },
  {
    id: 'saint-cyprien',
    name: 'Brute Force SSH',
    district: 'Saint-Cyprien',
    message: 'Les frontières sont floues, les chemins ordinaires cachent des passages...',
    hint: 'Les nombres basiques protègent ces portes...',
    completed: false,
    flag: 'CTF{SSH_BRUT3_F0RC3_CYPR13N}',
    points: 150
  },
  {
    id: 'carmes',
    name: 'Stéganographie',
    district: 'Carmes',
    message: 'Les documents contiennent plus qu\'ils ne laissent paraître...',
    hint: 'Regarde dans les marges, fouille les détails enfouis...',
    completed: false,
    flag: 'CTF{ST3G4N0_C4RM3S_2025}',
    points: 200
  },
  {
    id: 'jean-jaures',
    name: 'Privilege Escalation',
    district: 'Jean-Jaurès',
    message: 'Gravir les échelons de leur réseau...',
    hint: 'Un programme oublié pourrait être la clé...',
    completed: false,
    flag: 'CTF{PR1V_3SC_J34N_J4UR3S}',
    points: 250
  },
  {
    id: 'cote-pave',
    name: 'WiFi Hacking',
    district: 'Côté Pavé',
    message: 'Un réseau WiFi suspect a été détecté dans le quartier...',
    hint: 'L\'histoire du quartier pourrait être la clé...',
    completed: false,
    flag: 'CTF{W1F1_CR4CK3D_C0T3_P4V3_1930}',
    points: 150
  },
  {
    id: 'mirail',
    name: 'IoT Hacking',
    district: 'Mirail',
    message: 'Des objets connectés vulnérables contrôlent les accès...',
    hint: 'Le buffer overflow est votre ami...',
    completed: false,
    flag: 'CTF{M1R41L_10T_0V3RFL0W_M4ST3R}',
    points: 200
  },
  {
    id: 'balamats',
    name: 'RFID Cloning',
    district: 'Balamats',
    message: 'Les badges d\'accès cachent des secrets...',
    hint: 'MIFARE Classic - une technologie avec des faiblesses connues...',
    completed: false,
    flag: 'CTF{RF1D_CL0N3_B4L4M4TS_2024}',
    points: 250
  }
];

function App() {
  const { user: userData, loading: authLoading, error: authError } = useAuth();
  const [challenges, setChallenges] = useState(CHALLENGES);
  const [timeLeft, setTimeLeft] = useState(7200);
  const [scores, setScores] = useState<ScoreEntry[]>([]);
  const [audio] = useState(new Audio('/terminal.mp3'));
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [showVictoryScreen, setShowVictoryScreen] = useState(false);
  const [showLanding, setShowLanding] = useState(true);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  useEffect(() => {
    if (!userData) return;
    const interval = setInterval(() => {
      setTimeLeft((time) => (time > 0 ? time - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [userData]);

  const handleLogin = async (username: string) => {
    try {
      audio.play();
      // Connexion anonyme à Firebase
      const { user: firebaseUser } = await signInAnonymously(auth);
      
      // Création du profil utilisateur dans Firestore
      await setDoc(doc(db, 'users', firebaseUser.uid), {
        username,
        score: 0,
        currentDistrict: 'capitole',
        completedChallenges: [],
        startTime: new Date().toISOString(),
        lastActive: new Date().toISOString()
      });

      setScores(prev => [...prev, {
        username,
        score: 0,
        currentDistrict: 'capitole',
        completedChallenges: []
      }]);
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
    }
  };

  const handleFlagSubmit = async (flag: string) => {
    if (!userData || !auth.currentUser) return;
    
    try {
      audio.play();
      const currentChallenge = challenges.find(c => c.id === userData.currentDistrict);
      
      if (!currentChallenge) return;

      console.log('Tentative de validation du flag...');

      if (flag === currentChallenge.flag) {
        const userRef = doc(db, 'users', auth.currentUser.uid);
        const newScore = userData.score + currentChallenge.points;
        
        // Modifier l'ordre des districts pour inclure les nouveaux
        const challengeOrder = [
          'capitole', 
          'saint-cyprien', 
          'carmes', 
          'jean-jaures',
          'cote-pave',
          'mirail',
          'balamats'
        ];
        const currentIndex = challengeOrder.indexOf(currentChallenge.id);
        const nextDistrict = challengeOrder[currentIndex + 1] || currentChallenge.id;

        const newCompletedChallenges = [...userData.completedChallenges, currentChallenge.id];

        await updateDoc(userRef, {
          score: newScore,
          completedChallenges: newCompletedChallenges,
          currentDistrict: nextDistrict,
          lastActive: new Date().toISOString()
        });

        setChallenges(current =>
          current.map(c => 
            c.id === currentChallenge.id ? { ...c, completed: true } : c
          )
        );

        setToast({ 
          message: `Flag correct ! Challenge ${currentChallenge.district} validé ! +${currentChallenge.points} points`, 
          type: 'success' 
        });

        // Modifier la condition de victoire pour inclure tous les challenges
        if (newCompletedChallenges.length === challengeOrder.length) {
          setTimeout(() => {
            setShowVictoryScreen(true);
          }, 1000);
        } else if (currentIndex < challengeOrder.length - 1) {
          setTimeout(() => {
            setToast({
              message: `Nouveau district débloqué : ${challenges.find(c => c.id === nextDistrict)?.district}`,
              type: 'success'
            });
          }, 3500);
        }
      } else {
        setToast({ 
          message: 'Flag incorrect. Réessayez !', 
          type: 'error' 
        });
      }
    } catch (error) {
      console.error('Erreur lors de la soumission du flag:', error);
      setToast({ 
        message: 'Erreur lors de la soumission du flag', 
        type: 'error' 
      });
    }
  };

  if (showLanding) {
    return <LandingPage onStart={() => setShowLanding(false)} />;
  }

  if (showLeaderboard) {
    return <LeaderboardPage scores={scores} onBack={() => setShowLeaderboard(false)} />;
  }

  if (authLoading) {
    return <div>Chargement...</div>;
  }

  if (!userData) {
    return <Login onLogin={handleLogin} />;
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentChallenge = challenges.find(c => c.id === userData.currentDistrict);

  const NavBar = () => (
    <div className="fixed top-0 left-0 right-0 bg-black/80 backdrop-blur-sm border-b border-green-500/30 z-50">
      <div className="max-w-6xl mx-auto p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            <span>{userData?.username || 'Agent'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Timer className="w-5 h-5" />
            <span className="font-mono">{formatTime(timeLeft)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5" />
            <span>{userData?.score || 0} pts</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowLeaderboard(true)}
            className="flex items-center gap-2 hover:text-green-400 transition-colors px-4 py-2 rounded-lg bg-green-500/10"
          >
            <Trophy className="w-5 h-5" />
            Classement
          </button>
          {userData && (
            <button
              onClick={() => auth.signOut()}
              className="flex items-center gap-2 hover:text-red-400 transition-colors"
            >
              Déconnexion
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-green-500">
      <Matrix />
      
      <NavBar />
      
      <div className="pt-20 p-4">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              {currentChallenge && (
                <Challenge
                  challenge={currentChallenge}
                  onSubmit={handleFlagSubmit}
                />
              )}
            </div>

            <Terminal>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Map className="w-5 h-5" />
                  <h3 className="font-bold">Progression</h3>
                </div>
                <div className="space-y-3">
                  {challenges.map((challenge, index) => (
                    <div
                      key={challenge.id}
                      className={`
                        flex items-center gap-3 p-2 rounded
                        ${challenge.id === userData.currentDistrict ? 'bg-green-500/10' : ''}
                        ${challenge.completed ? 'text-green-500' : 'text-green-500/50'}
                        transition-all duration-300
                      `}
                    >
                      <div className="relative">
                        <span className="w-6 h-6 flex items-center justify-center border-2 border-current rounded-full text-xs">
                          {challenge.completed ? '✓' : (index + 1)}
                        </span>
                        {index < challenges.length - 1 && (
                          <div className={`
                            absolute top-full left-1/2 w-0.5 h-3 
                            ${challenge.completed ? 'bg-green-500' : 'bg-green-500/20'}
                            -translate-x-1/2
                          `} />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-bold">{challenge.district}</div>
                        <div className="text-xs opacity-70">{challenge.name}</div>
                      </div>
                      <div className="text-xs">
                        {challenge.points} pts
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Terminal>
          </div>
        </div>
      </div>
      
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {showVictoryScreen && (
        <VictoryScreen 
          score={userData.score} 
          onClose={() => setShowVictoryScreen(false)} 
        />
      )}
    </div>
  );
}

export default App
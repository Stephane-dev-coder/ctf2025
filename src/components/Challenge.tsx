import React, { useState } from 'react';
import { Terminal } from './Terminal';
import { Flag } from 'lucide-react';
import { SQLInjectionChallenge } from './challenges/SQLInjectionChallenge';
import { SSHBruteForceChallenge } from './challenges/SSHBruteForceChallenge';
import { SteganographyChallenge } from './challenges/SteganographyChallenge';
import { PrivEscChallenge } from './challenges/PrivEscChallenge';
import { ChatGPT } from './ChatGPT';

interface ChallengeProps {
  challenge: {
    id: string;
    name: string;
    type: string;
    description: string;
    hint: string;
    points: number;
    flag: string;
  };
  onSubmit: (flag: string) => void;
  onUseHint: (challengeId: string) => Promise<void>;
}

export function Challenge({ challenge, onSubmit, onUseHint }: ChallengeProps) {
  const [flag, setFlag] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [showInteractive, setShowInteractive] = useState(false);
  const [foundFlag, setFoundFlag] = useState<string | null>(null);
  const [showChatGPT, setShowChatGPT] = useState(false);
  const [hintUsed, setHintUsed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!flag) return;
    onSubmit(flag);
    setFlag('');
  };

  const handleFlagFound = (flag: string) => {
    setFoundFlag(flag);
  };

  const handleShowHint = async () => {
    if (!showHint && !hintUsed) {
      try {
        await onUseHint(challenge.id);
        setHintUsed(true);
      } catch (error) {
        console.error('Erreur lors de l\'utilisation de l\'indice:', error);
        return;
      }
    }
    setShowHint(!showHint);
  };

  const handleOpenChatGPT = async () => {
    if (!showChatGPT) {
      try {
        await onUseHint(challenge.id + '_chatgpt');
      } catch (error) {
        console.error('Erreur lors de l\'activation de ChatGPT:', error);
        return;
      }
    }
    setShowChatGPT(true);
  };

  const renderInteractiveChallenge = () => {
    switch (challenge.id) {
      case 'capitole':
        return <SQLInjectionChallenge onFlag={handleFlagFound} />;
      case 'saint-cyprien':
        return <SSHBruteForceChallenge onFlag={handleFlagFound} />;
      case 'carmes':
        return <SteganographyChallenge onFlag={handleFlagFound} />;
      case 'jean-jaures':
        return <PrivEscChallenge onFlag={handleFlagFound} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {showChatGPT && <ChatGPT onClose={() => setShowChatGPT(false)} />}
      <Terminal>
        <div className="space-y-4">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Flag className="w-5 h-5" />
            {challenge.name} - {challenge.type}
          </h3>

          <div className="flex items-center justify-between">
            <span className="text-green-500">Points: {challenge.points}</span>
            {hintUsed && (
              <span className="text-red-500">-10 points (indice utilisé)</span>
            )}
          </div>

          <div className="typing-effect">
            {challenge.description}
          </div>

          {showHint && (
            <div className="typing-effect text-green-500/50">
              INDICE: {challenge.hint}
            </div>
          )}

          {foundFlag && (
            <div className="bg-green-500/10 border border-green-500 p-4 rounded my-4">
              <p className="text-green-500 font-mono mb-2">Flag trouvé !</p>
              <code className="bg-black p-2 rounded block select-all">
                {foundFlag}
              </code>
              <p className="text-green-500/70 text-sm mt-2">
                Copiez le flag ci-dessus et soumettez-le pour valider le challenge
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={flag}
              onChange={(e) => setFlag(e.target.value)}
              className="w-full bg-black border border-green-500/30 p-2 text-green-500 focus:outline-none focus:border-green-500"
              placeholder="Entrez le flag..."
            />

            <div className="flex gap-2">
              <button
                type="submit"
                disabled={!flag}
                className="flex-1 bg-green-500/10 border border-green-500/30 p-2 hover:bg-green-500/20 transition-colors disabled:opacity-50"
              >
                SOUMETTRE
              </button>
              <button
                type="button"
                onClick={handleShowHint}
                className="bg-green-500/10 border border-green-500/30 p-2 hover:bg-green-500/20 transition-colors"
              >
                {!showHint ? (
                  <>
                    AFFICHER INDICE
                    {!hintUsed && <span className="text-red-500 ml-1">(-10 pts)</span>}
                  </>
                ) : (
                  'CACHER INDICE'
                )}
              </button>
              <button
                type="button"
                onClick={handleOpenChatGPT}
                className="bg-green-500/10 border border-green-500/30 p-2 hover:bg-green-500/20 transition-colors"
              >
                CHATGPT
                {!showChatGPT && <span className="text-red-500 ml-1">(-100 pts)</span>}
              </button>
              <button
                type="button"
                onClick={() => setShowInteractive(!showInteractive)}
                className="bg-green-500/10 border border-green-500/30 p-2 hover:bg-green-500/20 transition-colors"
              >
                {showInteractive ? 'CACHER TERMINAL' : 'AFFICHER TERMINAL'}
              </button>
            </div>
          </form>
        </div>
      </Terminal>

      {showInteractive && (
        <div className="mt-4">
          {renderInteractiveChallenge()}
        </div>
      )}
    </div>
  );
}
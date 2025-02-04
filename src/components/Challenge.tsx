import React, { useState } from 'react';
import { Terminal } from './Terminal';
import { Flag } from 'lucide-react';
import type { Challenge as ChallengeType } from '../types/challenge';
import {
  SQLInjectionChallenge,
  SSHBruteForceChallenge,
  SteganographyChallenge,
  PrivEscChallenge
} from './challenges/index';

interface ChallengeProps {
  challenge: ChallengeType;
  onSubmit: (flag: string) => void;
}

export function Challenge({ challenge, onSubmit }: ChallengeProps) {
  const [flag, setFlag] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [showInteractive, setShowInteractive] = useState(false);
  const [foundFlag, setFoundFlag] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!flag) return;
    onSubmit(flag);
    setFlag('');
  };

  const handleFlagFound = (flag: string) => {
    setFoundFlag(flag);
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
      <Terminal>
        <div className="space-y-4">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Flag className="w-5 h-5" />
            {challenge.name} - {challenge.type}
          </h3>

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
                onClick={() => setShowHint(!showHint)}
                className="bg-green-500/10 border border-green-500/30 p-2 hover:bg-green-500/20 transition-colors"
              >
                {showHint ? 'CACHER INDICE' : 'AFFICHER INDICE'}
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
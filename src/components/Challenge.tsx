import React, { useState } from 'react';
import { Terminal } from './Terminal';
import { Flag } from 'lucide-react';
import { SQLInjectionChallenge } from './challenges/SQLInjectionChallenge';
import { SSHBruteForceChallenge } from './challenges/SSHBruteForceChallenge';
import { SteganographyChallenge } from './challenges/SteganographyChallenge';
import { PrivEscChallenge } from './challenges/PrivEscChallenge';

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
}

export function Challenge({ challenge, onSubmit }: ChallengeProps) {
  const [flag, setFlag] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [showInteractive, setShowInteractive] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!flag) return;
    onSubmit(flag);
    setFlag('');
  };

  const renderInteractiveChallenge = () => {
    switch (challenge.id) {
      case 'capitole':
        return <SQLInjectionChallenge onFlag={onSubmit} />;
      case 'saint-cyprien':
        return <SSHBruteForceChallenge onFlag={onSubmit} />;
      case 'carmes':
        return <SteganographyChallenge onFlag={onSubmit} />;
      case 'jean-jaures':
        return <PrivEscChallenge onFlag={onSubmit} />;
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
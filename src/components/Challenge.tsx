import React, { useState } from 'react';
import { Terminal } from './Terminal';
import { Flag } from 'lucide-react';
import type { Challenge as ChallengeType } from '../types';

interface ChallengeProps {
  challenge: ChallengeType;
  onSubmit: (flag: string) => void;
}

export function Challenge({ challenge, onSubmit }: ChallengeProps) {
  const [flag, setFlag] = useState('');
  const [showHint, setShowHint] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!flag) return;
    onSubmit(flag);
    setFlag('');
  };

  return (
    <Terminal>
      <div className="space-y-4">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Flag className="w-5 h-5" />
          {challenge.district} - {challenge.name}
        </h3>

        <div className="typing-effect">
          {challenge.message}
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
          </div>
        </form>
      </div>
    </Terminal>
  );
}
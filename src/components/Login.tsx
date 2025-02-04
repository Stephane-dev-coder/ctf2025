import React, { useState } from 'react';
import { Terminal } from './Terminal';
import { Lock } from 'lucide-react';

interface LoginProps {
  onLogin: (username: string) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [hacking, setHacking] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onLogin(username.trim());
    }
  };

  return (
    <Terminal>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Lock className="w-5 h-5" />
          <h2 className="text-xl font-bold">SYSTÈME DE SURVEILLANCE TOULOUSE</h2>
        </div>
        
        <div className="typing-effect">
          {'>>'} Initialisation du protocole d'accès...
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-green-500">Nom de code de l'agent</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-black border border-green-500 text-green-500 p-2"
              placeholder="Entrez votre nom de code..."
              required
            />
          </div>
          
          {hacking && (
            <div className="space-y-2">
              <div className="h-1 bg-black border border-green-500/30">
                <div 
                  className="h-full bg-green-500 transition-all duration-100"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="text-sm">
                Déchiffrement en cours... {progress}%
              </div>
            </div>
          )}
          
          <button
            type="submit"
            disabled={!username || hacking}
            className="w-full bg-green-500 text-black py-2 hover:bg-green-600"
          >
            Commencer la mission
          </button>
        </form>
      </div>
    </Terminal>
  );
};
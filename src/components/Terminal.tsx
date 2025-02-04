import React from 'react';
import { Terminal as TerminalIcon, Shield, Timer, Flag, Map, Trophy } from 'lucide-react';

interface TerminalProps {
  children: React.ReactNode;
}

export const Terminal = ({ children }: TerminalProps) => {
  return (
    <div className="relative bg-black border border-green-500/30 p-4 overflow-hidden">
      {/* Effet de scan fixe qui ne bouge pas le contenu */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-green-500/50 to-transparent animate-scan" />
        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,255,0,0.025)_50%)] bg-[length:100%_4px]" />
      </div>
      
      {/* Contenu du terminal */}
      <div className="relative z-10">
        <div className="flex items-center gap-2 border-b border-green-500/30 pb-2 mb-4">
          <TerminalIcon className="w-4 h-4" />
          <div className="text-sm opacity-50">root@toulouse-ctf:~#</div>
        </div>
        {children}
      </div>
    </div>
  );
};
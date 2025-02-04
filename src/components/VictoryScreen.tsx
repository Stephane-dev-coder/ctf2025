import React, { useEffect } from 'react';

interface VictoryScreenProps {
  score: number;
  onClose: () => void;
}

export const VictoryScreen = ({ score, onClose }: VictoryScreenProps) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 10000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-50 overflow-hidden animate-fadeIn">
      {/* Effet de scan */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-green-500/50 to-transparent animate-scan" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,255,0,0.15)_1px,transparent_1px)] bg-[size:100%_2px]" />
      </div>

      {/* Contenu */}
      <div className="relative z-10 text-center space-y-8">
        <div className="text-4xl font-bold text-green-500 animate-glitch">
          MISSION ACCOMPLIE
        </div>
        
        <div className="text-2xl text-green-500 font-mono drop-shadow-[0_0_10px_rgba(0,255,0,0.5)]">
          Score Final: {score} points
        </div>
        
        <div className="text-xl text-green-500">
          Tous les districts sont sécurisés
        </div>
      </div>
    </div>
  );
}; 
import React from 'react';
import { Terminal } from './Terminal';
import { Trophy, Crown, Medal, ChevronLeft, Timer, Shield, Flag } from 'lucide-react';
import type { ScoreEntry } from '../types';

interface LeaderboardPageProps {
  scores: ScoreEntry[];
  onBack: () => void;
}

export const LeaderboardPage = ({ scores, onBack }: LeaderboardPageProps) => {
  const sortedScores = [...scores].sort((a, b) => b.score - a.score);

  const formatTime = (startTime: string) => {
    const start = new Date(startTime).getTime();
    const now = new Date().getTime();
    const diff = Math.floor((now - start) / 1000); // en secondes
    const minutes = Math.floor(diff / 60);
    const seconds = diff % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getMedalColor = (index: number) => {
    switch(index) {
      case 0: return 'text-yellow-500'; // Or
      case 1: return 'text-gray-300';   // Argent
      case 2: return 'text-amber-600';  // Bronze
      default: return 'text-green-500'; // Autres
    }
  };

  const getPositionIcon = (index: number) => {
    switch(index) {
      case 0: return <Crown className="w-6 h-6" />;
      case 1: return <Medal className="w-6 h-6" />;
      case 2: return <Trophy className="w-6 h-6" />;
      default: return <span className="w-6 text-center">{index + 1}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-black text-green-500 p-4">
      <Terminal>
        <div className="space-y-8 p-4">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={onBack}
              className="flex items-center gap-2 hover:text-green-400 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              Retour
            </button>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Trophy className="w-6 h-6" />
              Classement des Agents
            </h1>
          </div>

          {/* Top 3 Podium */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {sortedScores.slice(0, 3).map((score, index) => (
              <div
                key={index}
                className={`${
                  index === 0 ? 'md:order-2' : index === 1 ? 'md:order-1' : 'md:order-3'
                } bg-green-500/5 border border-green-500/20 p-6 rounded-lg text-center`}
              >
                <div className={`${getMedalColor(index)} text-3xl mb-2`}>
                  {getPositionIcon(index)}
                </div>
                <div className="font-bold text-xl mb-1">{score.username}</div>
                <div className="opacity-80">{score.score} points</div>
                <div className="text-sm opacity-60 mt-2">
                  <div className="flex items-center justify-center gap-1">
                    <Flag className="w-4 h-4" />
                    {score.completedChallenges.length} défis
                  </div>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <Timer className="w-4 h-4" />
                    {formatTime(score.startTime)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tableau détaillé */}
          <div className="bg-green-500/5 border border-green-500/20 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-green-500/20">
                  <th className="p-4 text-left">Position</th>
                  <th className="p-4 text-left">Agent</th>
                  <th className="p-4 text-left">Score</th>
                  <th className="p-4 text-left hidden md:table-cell">Défis</th>
                  <th className="p-4 text-left hidden md:table-cell">Temps</th>
                  <th className="p-4 text-left hidden md:table-cell">District actuel</th>
                </tr>
              </thead>
              <tbody>
                {sortedScores.map((score, index) => (
                  <tr
                    key={index}
                    className="border-b border-green-500/10 hover:bg-green-500/5 transition-colors"
                  >
                    <td className="p-4">
                      <div className={`flex items-center gap-2 ${getMedalColor(index)}`}>
                        {getPositionIcon(index)}
                      </div>
                    </td>
                    <td className="p-4 font-medium">{score.username}</td>
                    <td className="p-4">{score.score} pts</td>
                    <td className="p-4 hidden md:table-cell">
                      {score.completedChallenges.length} / {7}
                    </td>
                    <td className="p-4 hidden md:table-cell font-mono">
                      {formatTime(score.startTime)}
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      {score.currentDistrict || 'Non commencé'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-center text-sm opacity-70 mt-8">
            <p>Classement mis à jour en temps réel</p>
            <p>Tous les agents sont affichés, y compris ceux n'ayant pas encore commencé</p>
          </div>
        </div>
      </Terminal>
    </div>
  );
}; 
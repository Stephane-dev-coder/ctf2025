import React from 'react';
import { Terminal } from './Terminal';
import { Shield, Map, Trophy, Timer, ChevronRight } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

export const LandingPage = ({ onStart }: LandingPageProps) => {
  return (
    <div className="min-h-screen bg-black text-green-500 p-4">
      <Terminal>
        <div className="space-y-8 p-4">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold glitch-text">
              CTF Toulouse 2024
            </h1>
            <p className="text-xl opacity-80">
              Infiltrez le réseau des Veilleurs de Toulouse
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <div className="bg-green-500/5 p-6 rounded-lg border border-green-500/20">
              <h2 className="flex items-center gap-2 text-xl mb-4">
                <Map className="w-5 h-5" />
                7 Districts
              </h2>
              <ul className="space-y-2 opacity-80">
                <li>• Capitole - SQL Injection</li>
                <li>• Saint-Cyprien - SSH Brute Force</li>
                <li>• Carmes - Stéganographie</li>
                <li>• Jean-Jaurès - Privilege Escalation</li>
                <li>• Côté Pavé - WiFi Hacking</li>
                <li>• Mirail - IoT Hacking</li>
                <li>• Balamats - RFID Cloning</li>
              </ul>
            </div>

            <div className="bg-green-500/5 p-6 rounded-lg border border-green-500/20">
              <h2 className="flex items-center gap-2 text-xl mb-4">
                <Shield className="w-5 h-5" />
                Objectifs
              </h2>
              <ul className="space-y-2 opacity-80">
                <li>• Exploiter les vulnérabilités</li>
                <li>• Collecter les flags</li>
                <li>• Débloquer les districts</li>
                <li>• Gagner des points</li>
                <li>• Monter dans le classement</li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4">
              <Timer className="w-8 h-8 mx-auto mb-2" />
              <h3 className="text-lg font-bold">Temps Limité</h3>
              <p className="opacity-70">2 heures pour réussir</p>
            </div>
            <div className="text-center p-4">
              <Trophy className="w-8 h-8 mx-auto mb-2" />
              <h3 className="text-lg font-bold">Points & Classement</h3>
              <p className="opacity-70">Défiez les autres agents</p>
            </div>
            <div className="text-center p-4">
              <Shield className="w-8 h-8 mx-auto mb-2" />
              <h3 className="text-lg font-bold">Indices Disponibles</h3>
              <p className="opacity-70">En cas de blocage</p>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={onStart}
              className="bg-green-500 text-black px-8 py-3 rounded-lg font-bold hover:bg-green-400 transition-colors flex items-center gap-2 mx-auto"
            >
              Commencer la Mission
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="text-center opacity-70 text-sm mt-8">
            <p>Version 2024 - Développé par l'équipe Sécurité</p>
            <p>Tous les challenges sont fictifs et à but éducatif</p>
          </div>
        </div>
      </Terminal>
    </div>
  );
}; 
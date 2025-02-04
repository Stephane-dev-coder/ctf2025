import { useRef } from 'react';

interface Sounds {
  error: HTMLAudioElement;
  success: HTMLAudioElement;
  typing: HTMLAudioElement;
  victory: HTMLAudioElement;
}

export const useSound = () => {
  const sounds = useRef<Partial<Sounds>>({});

  const loadSound = (name: keyof Sounds, url: string) => {
    const audio = new Audio(url);
    sounds.current[name] = audio;
  };

  const playSound = (name: keyof Sounds) => {
    const audio = sounds.current[name];
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(console.error);
    }
  };

  return { loadSound, playSound };
}; 
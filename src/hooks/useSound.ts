import { useEffect, useRef } from 'react';

const sounds = {
  success: '/success.mp3',
  error: '/error.mp3',
  victory: '/victory.mp3',
  typing: '/typing.mp3'
} as const;

export const useSound = () => {
  const audioRefs = useRef<{ [K in keyof typeof sounds]?: HTMLAudioElement }>({});

  useEffect(() => {
    Object.entries(sounds).forEach(([key, path]) => {
      audioRefs.current[key as keyof typeof sounds] = new Audio(path);
    });
  }, []);

  const play = (soundName: keyof typeof sounds) => {
    const audio = audioRefs.current[soundName];
    if (audio) {
      audio.currentTime = 0;
      audio.play();
    }
  };

  return { play };
}; 
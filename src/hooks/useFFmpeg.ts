import { FFmpeg } from '@ffmpeg/ffmpeg';
import { useEffect, useRef, useState } from 'react';

export const useFFmpeg = () => {
  const ffmpegRef = useRef<FFmpeg>(new FFmpeg());
  const [isLoaded, setIsLoaded] = useState(false);

  const loadFFmpeg = async () => {
    if (!ffmpegRef.current.loaded) {
      await ffmpegRef.current.load();
      setIsLoaded(true);
    }
  };

  useEffect(() => {
    loadFFmpeg().catch((err) => {
      console.error('failed loading ffmpeg:', err);
    });
  }, []);

  return { ffmpeg: ffmpegRef.current, isLoaded };
};

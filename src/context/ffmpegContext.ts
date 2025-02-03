import { useFFmpeg } from '@/hooks/useFFmpeg';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { createContext } from 'react';

interface FFmpegContextValue {
  ffmpeg: FFmpeg;
  isLoaded: boolean;
}

export const FFmpegContext = createContext<FFmpegContextValue | undefined>(
  undefined
);

interface FFmpegProviderProps {
  children: React.ReactNode;
}

export const FFmpegProvider: React.FC<FFmpegProviderProps> = ({ children }) => {
  const { ffmpeg, isLoaded } = useFFmpeg();
  return (
    <FFmpegContext.Provider value={{ ffmpeg, isLoaded }}>
      {children}
    </FFmpegContext.Provider>
  );
};

import { useFFmpeg } from "@/hooks/useFFmpeg";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { createContext } from "react";

interface FFmpegContextValue {
  ffmpeg: FFmpeg;
  isLoaded: boolean;
}

export const FfmpegContext = createContext<FFmpegContextValue | undefined>(
  undefined
);

export const FFmpegProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { ffmpeg, isLoaded } = useFFmpeg();
  return (
    <FfmpegContext.Provider value={{ ffmpeg, isLoaded }}>
      {children}
    </FfmpegContext.Provider>
  );
};

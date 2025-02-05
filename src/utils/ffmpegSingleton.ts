import { FFmpeg } from "@ffmpeg/ffmpeg";

class FFmpegSingleton {
  private static ffmpeg: FFmpeg;
  constructor() {}
  public static getFFmpeg(): FFmpeg {
    if (!FFmpegSingleton.ffmpeg) {
      FFmpegSingleton.ffmpeg = new FFmpeg();
    }
    return FFmpegSingleton.ffmpeg;
  }
}

export default FFmpegSingleton;

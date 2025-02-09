import { FFmpeg } from '@ffmpeg/ffmpeg';
import { toBlobURL } from '@ffmpeg/util';

class FFmpegSingleton {
  private static ffmpeg: FFmpeg;
  private static isLoaded: boolean = false;
  private static loadingPromise: Promise<void> | null = null;

  constructor() {}
  public static async getFFmpeg(): Promise<FFmpeg> {
    if (!FFmpegSingleton.ffmpeg) {
      FFmpegSingleton.ffmpeg = new FFmpeg();
    }

    if (!FFmpegSingleton.isLoaded) {
      if (!FFmpegSingleton.loadingPromise) {
        FFmpegSingleton.loadingPromise = FFmpegSingleton.initialize();
      }
      await FFmpegSingleton.loadingPromise;
    }
    return FFmpegSingleton.ffmpeg;
  }

  public static async initialize() {
    if (FFmpegSingleton.isLoaded) return;
    // console.log('FFmpeg loading');
    const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.10/dist/esm';
    const ffmpeg = FFmpegSingleton.ffmpeg;
    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
      wasmURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.wasm`,
        'application/wasm'
      ),
    });
    FFmpegSingleton.isLoaded = true;
    // console.log('FFmpeg successfully loaded');
  }
}

export default FFmpegSingleton;

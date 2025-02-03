import { ElementCardType } from '@/typedef/typedef';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';
export async function startDownload(
  toDownload: ElementCardType[],
  format: string
) {
  const worker = new Worker(new URL('../downloadWorker', import.meta.url));
  let downloaded: { video: Blob; title: string | undefined }[] = [];
  worker.postMessage({ toDownload });
  worker.onmessage = (e) => {
    downloaded = e.data;
  };
  console.log(downloaded);
  if (format !== 'default'){
    const converted = downloaded.map((element)=> startConversion(element,format,))
  }
}

async function startConversion(
  media: { blob: Blob; fileName: string },
  format: string,
  ffmpegRef: React.MutableRefObject<FFmpeg>
) {
  const { blob, fileName } = media;
  const video = await fetchFile(blob);
  const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.10/dist/esm';
  const ffmpeg = ffmpegRef.current;

  await ffmpeg.load({
    coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
    wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
  });

  await ffmpeg.writeFile(fileName, video);
  await ffmpeg.exec(['-i', 'input.webm', 'output.mp4']);
  const data = await ffmpeg.readFile('output.mp4');
  videoRef.current.src = URL.createObjectURL(
    new Blob([data.buffer], { type: 'video/mp4' })
  );
}

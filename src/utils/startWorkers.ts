import { ElementCardType } from '@/typedef/typedef';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';
export async function startDownload(
  toDownload: ElementCardType[],
  format: string
) {
  let blobList: Blob[] = [];
  const worker = new Worker(new URL('../downloadWorker', import.meta.url));
  const mediaUrls = toDownload.map((card) => card.url);
  console.log(mediaUrls);
  //TODO: add proxy route for downloading
  //TODO: fix selector and checking logic
  worker.postMessage({ mediaUrls });
  worker.onmessage = (e) => {
    blobList = e.data;
  };
  console.log(blobList);
  return blobList;
}

async function startConversion(
  media: any,
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

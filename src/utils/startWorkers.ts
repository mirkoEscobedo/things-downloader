import { ElementCardType } from "@/typedef/typedef";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
export async function startDownload(
  toDownload: ElementCardType[],
  format: string | null,
  ffmpegRef: FFmpeg
) {
  const worker = new Worker(new URL("../downloadWorker", import.meta.url));
  let downloaded: { blob: Blob; title: string | undefined }[] = [];
  worker.postMessage({ toDownload });
  worker.onmessage = (e) => {
    downloaded = e.data;
  };
  console.log(downloaded);
  let converted;
  if (format && format !== "default") {
    converted = downloaded.map(
      async (element) => await startConversion(element, format, ffmpegRef)
    );
  }
  
}

async function startConversion(
  media: { blob: Blob; title: string | undefined },
  format: string,
  ffmpegRef: FFmpeg
) {
  let { blob, title } = media;
  if (title === undefined) {
    title = "input.webm";
  }
  const video = await fetchFile(blob);
  const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.10/dist/esm";
  const ffmpeg = ffmpegRef;

  await ffmpeg.load({
    coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
    wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
  });

  await ffmpeg.writeFile(title, video);
  const outputName = title.replace(/\.[^/.]+$/, "") + `.${format}`;
  await ffmpeg.exec(["-i", title, outputName]);

  const data = await ffmpeg.readFile(outputName);
  const mimeTypes: Record<string, string> = {
    mp4: "video/mp4",
    webm: "video/webm",
    mp3: "audio/mpeg",
    ogg: "audio/oggg",
    wav: "audio/wav",
    acc: "audio/acc",
    flac: "audio/flac",
  };
  const lowerFormat = format.toLowerCase();

  const mimeType = mimeTypes[lowerFormat] || "application/octet-stream";
  const outputBlob = new Blob([data], { type: mimeType });
  console.log({ blob: outputBlob, fileName: outputName, mimeType });

  return { blob: outputBlob, fileName: outputName, mimeType };
}

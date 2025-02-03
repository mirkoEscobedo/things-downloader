import { ElementCardType, ProcessedFiles } from "@/typedef/typedef";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import JSZip from "jszip";

export async function startDownload(
  toDownload: ElementCardType[],
  ffmpegRef: FFmpeg,
  format?: string
): Promise<ProcessedFiles> {
  return new Promise((resolve, rejects) => {
    const worker = new Worker(new URL("../downloadWorker", import.meta.url));
    let converted: ProcessedFiles[] = [];

    worker.onmessage = async (e) => {
      const downloaded: { blob: Blob; title: string | undefined }[] = e.data;
      if (format && format !== "default") {
        for (const element of downloaded) {
          const result = await startConversion(element, format, ffmpegRef);
          converted.push(result);
        }
      } else {
        for (const element of downloaded) {
          converted.push({
            blob: element.blob,
            fileName: element.title ? element.title : "input.webm",
            mimeType: element.blob.type,
          });
        }
      }
      let processedFiles:ProcessedFiles;
      if (converted.length > 1) {
        processedFiles = await zipFiles(converted);
      } else {
        processedFiles = converted[0];
      }
      resolve(processedFiles);
    };
    worker.onerror = (error) => rejects(error);
    worker.postMessage({ toDownload });
  });
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
    ogg: "audio/ogg",
    wav: "audio/wav",
    aac: "audio/aac",
    flac: "audio/flac",
  };
  const lowerFormat = format.toLowerCase();

  const mimeType = mimeTypes[lowerFormat] || "application/octet-stream";
  const outputBlob = new Blob([data], { type: mimeType });
  console.log({ blob: outputBlob, fileName: outputName, mimeType });

  return { blob: outputBlob, fileName: outputName, mimeType };
}

async function zipFiles(files: ProcessedFiles[]): Promise<ProcessedFiles> {
  const zip = new JSZip();
  for (const file of files) {
    zip.file(file.fileName, file.blob);
  }
  const zippedBlob = await zip.generateAsync({ type: "blob" });
  return {
    blob: zippedBlob,
    fileName: "output.zip",
    mimeType: "application/zip",
  };
}

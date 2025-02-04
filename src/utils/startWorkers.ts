import {
  finishDownloadProgress,
  startDownloadProgress,
  updateProgressProgress,
} from "@/state/reducers/progressSlice";
import store from "@/state/store";
import { ElementCardType, ProcessedFiles } from "@/typedef/typedef";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import JSZip from "jszip";

export async function startDownload(
  toDownload: ElementCardType[],
  ffmpegRef: FFmpeg,
  format?: string
): Promise<ProcessedFiles> {
  store.dispatch(startDownloadProgress());
  return new Promise((resolve, rejects) => {
    const worker = new Worker(new URL("../downloadWorker", import.meta.url));
    let converted: ProcessedFiles[] = [];

    worker.onmessage = async (e) => {
      const downloaded: { video: Blob; title: string | undefined }[] = e.data;
      store.dispatch(
        updateProgressProgress({ status: "Compressing", progress: 30 })
      );
      if (format && format !== "default") {
        for (const element of downloaded) {
          const result = await startConversion(element, format, ffmpegRef);
          converted.push(result);
        }
      } else {
        for (const element of downloaded) {
          console.log("element from worker", element);
          converted.push({
            blob: element.video,
            fileName: element.title ? element.title : "input.webm",
            mimeType: element.video.type,
          });
        }
      }
      store.dispatch(
        updateProgressProgress({ status: "Archiving", progress: 70 })
      );
      let processedFiles: ProcessedFiles;
      if (converted.length > 1) {
        processedFiles = await zipFiles(converted);
      } else {
        processedFiles = converted[0];
      }
      store.dispatch(finishDownloadProgress());
      resolve(processedFiles);
    };
    worker.onerror = (error) => rejects(error);
    worker.postMessage({ toDownload });
  });
}

async function startConversion(
  media: { video: Blob; title: string | undefined },
  format: string,
  ffmpegRef: FFmpeg
) {
  let { video, title } = media;
  if (title === undefined) {
    title = "input.webm";
  }
  const convertedVid = await fetchFile(video);
  const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.10/dist/esm";
  const ffmpeg = ffmpegRef;

  await ffmpeg.load({
    coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
    wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
  });

  await ffmpeg.writeFile(title, convertedVid);
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

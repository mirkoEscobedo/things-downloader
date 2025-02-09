import {
  finishDownloadProgress,
  startDownloadProgress,
  updateProgressProgress,
} from '@/state/reducers/progressSlice';
import store from '@/state/store';
import {
  DownloadResponse,
  ElementCardType,
  ProcessedFiles,
} from '@/typedef/typedef';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';
import JSZip from 'jszip';

export async function startDownload(
  toDownload: ElementCardType[],
  ffmpegRef: FFmpeg,
  format?: string
): Promise<ProcessedFiles> {
  store.dispatch(startDownloadProgress());

  return new Promise((resolve, reject) => {
    const worker = new Worker(new URL('../downloadWorker', import.meta.url));
    let converted: ProcessedFiles[] = [];

    worker.onmessage = async ({ data: eventData }) => {
      // console.log('received event from worker', eventData);

      if (!eventData || typeof eventData !== 'object') {
        console.error('Received invalid event data from worker', eventData);
        return;
      }
      const { type, progress, status, data, message } = eventData;

      if (type === 'progress') {
        store.dispatch(
          updateProgressProgress({ status: 'Downloading...', progress })
        );
      } else if (type === 'status') {
        store.dispatch(updateProgressProgress({ status })); // Keep progress intact
      } else if (type === 'error') {
        console.error('Download Error:', message);
        store.dispatch(
          updateProgressProgress({ status: `Error: ${message}`, progress: 0 })
        );
        worker.terminate();
        reject(new Error(message)); // Properly reject the promise
        return;
      } else if (type === 'complete') {
        if (!Array.isArray(data) || data.length === 0) {
          console.error('Worker returned invalid data format:', data);
          worker.terminate();
          reject(new Error('Invalid data from worker'));
          return;
        }

        // console.log('valid downloaded files:', data);

        const downloaded: DownloadResponse[] = data.filter(
          (item) => item !== undefined && item.video
        );

        if (downloaded.length === 0) {
          console.error('All download failed, no valid files to process.');
          store.dispatch(
            updateProgressProgress({
              status: 'All download failed',
              progress: 0,
            })
          );
          worker.terminate();
          reject(new Error('No Valid downloads found'));
          return;
        }

        store.dispatch(
          updateProgressProgress({ status: 'Converting', progress: 10 })
        );

        if (format && format !== 'default') {
          const totalItems = downloaded.length;
          let completedItems = 0;
          for (const element of downloaded) {
            const result = await startConversion(
              element,
              format,
              ffmpegRef,
              (ratio) => {
                const fileProgressFraction = ratio / totalItems;
                const overallRatio =
                  (completedItems + fileProgressFraction) / totalItems;
                const overallPercent = 10 + overallRatio * 60;
                const roundedPercent = Math.round(overallPercent);
                store.dispatch(
                  updateProgressProgress({
                    status: `Converting (${completedItems + 1}/${totalItems})`,
                    progress: roundedPercent,
                  })
                );
              }
            );
            converted.push(result);
            completedItems++;
          }
        } else {
          for (const element of downloaded) {
            if (!element.video) {
              console.error('Skipping undefined video element:', element);
              continue;
            }
            console.log('element from worker', element);
            converted.push({
              blob: element.video,
              fileName: element.title ? element.title : 'input.webm',
              mimeType: element.video.type,
              ext: element.ext,
            });
          }
        }
        store.dispatch(
          updateProgressProgress({ status: 'Archiving', progress: 70 })
        );
        let processedFiles: ProcessedFiles;
        if (converted.length > 1) {
          processedFiles = await zipFiles(converted);
        } else {
          processedFiles = converted[0];
        }
        store.dispatch(finishDownloadProgress());
        resolve(processedFiles);
      }
      worker.onerror = (error) => {
        store.dispatch(finishDownloadProgress());
        reject(error);
        worker.terminate();
      };
    };

    worker.postMessage({ toDownload });
  });
}

async function startConversion(
  media: { video: Blob; title: string | undefined; ext: string },
  format: string,
  ffmpegRef: FFmpeg,
  onProgress?: (ratio: number) => void
) {
  let { video, title, ext } = media;
  if (title === undefined) {
    title = 'input.webm';
  }

  const handleProgress = ({ progress }: { progress: number; time: number }) => {
    if (onProgress) {
      onProgress(progress);
    }
  };

  const ffmpeg = ffmpegRef;
  ffmpeg.on('progress', handleProgress);

  try {
    const convertedVid = await fetchFile(video);
    await ffmpeg.writeFile(title, convertedVid);
    let outputName;
    if (format) {
      outputName = title.replace(/\.[^/.]+$/, '') + `.${format}`;
    } else {
      outputName = title + ext;
    }
    await ffmpeg.exec(['-i', title, outputName]);

    const data = await ffmpeg.readFile(outputName);
    const mimeTypes: Record<string, string> = {
      mp4: 'video/mp4',
      webm: 'video/webm',
      mp3: 'audio/mpeg',
      ogg: 'audio/ogg',
      wav: 'audio/wav',
      aac: 'audio/aac',
      flac: 'audio/flac',
    };
    const lowerFormat = format.toLowerCase();

    const mimeType = mimeTypes[lowerFormat] || 'application/octet-stream';
    const outputBlob = new Blob([data], { type: mimeType });
    console.log({ blob: outputBlob, fileName: outputName, mimeType });

    return { blob: outputBlob, fileName: outputName, mimeType, ext };
  } finally {
    ffmpeg.off('progress', handleProgress);
  }
}

async function zipFiles(files: ProcessedFiles[]): Promise<ProcessedFiles> {
  const zip = new JSZip();

  for (const file of files) {
    let fileName = file.fileName;
    if (!fileName.includes('.')) {
      const extension = file.ext || file.mimeType.split('/')[1];
      fileName = `${fileName}.${extension}`;
    }
    zip.file(fileName, file.blob);
  }
  const zippedBlob = await zip.generateAsync({ type: 'blob' }, (metadata) => {
    const progress = 70 + (metadata.percent / 100) * 30;
    const roundedProgress = Math.round(progress);
    store.dispatch(
      updateProgressProgress({ status: 'Archiving', progress: roundedProgress })
    );
  });
  return {
    blob: zippedBlob,
    fileName: 'output.zip',
    mimeType: 'application/zip',
    ext: '.zip',
  };
}

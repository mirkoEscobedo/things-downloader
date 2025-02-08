import { resolve } from 'path';
import { ElementCardType } from './typedef/typedef';

self.onmessage = async (e: MessageEvent) => {
  const cards: ElementCardType[] = e.data.toDownload;
  let downloadedFiles: {
    video?: Blob;
    title?: string;
    ext: string;
  }[] = [];
  try {
    for (const card of cards) {
      const downloaded = await downloadMediaFiles(card);
      const downloadedAndExt = { ...downloaded, ext: card.ext };
      downloadedFiles.push(downloadedAndExt);
    }

    self.postMessage(downloadedFiles);
  } catch (err) {
    console.error('failed: ', err);
  }
};

async function downloadMediaFiles(
  card: ElementCardType,
  retries: number = 5,
  baseDelay: number = 2000
) {
  console.log(card);
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      if (
        !card.url.startsWith('https://i.4cdn.org/') &&
        !card.url.startsWith('https://a.4cdn.org/')
      ) {
        throw new Error(`Invalid link ${card.url}`);
      }
      new URL(card.url);
      const url = `http://localhost:4000/proxy/${encodeURIComponent(card.url)}`;
      const response = await fetch(url);
      console.log(response);
      if (response.status === 429 || response.status === 500) {
        const retryAfter = response.headers.get('Retry-After');
        let waitTime = retryAfter
          ? parseInt(retryAfter) * 1000
          : baseDelay * 2 ** attempt;
        waitTime += Math.random() * 1000;
        console.warn(`Rate limited. Retrying in ${waitTime}`);
        await new Promise((resolve) => setTimeout(resolve, waitTime));
        continue;
      }
      if (!response.ok) {
        throw new Error(`HTTP error, status: ${response.status}`);
      }
      const videoBlob = await response.blob();
      return {
        video: videoBlob,
        title: card.title !== undefined ? card.title : 'things-downloader',
      };
    } catch (err) {
      console.warn(`Attempt ${attempt} failed for ${card.url}: ${err}`);

      if (attempt < retries) {
        let waitTime = baseDelay * 2 ** attempt;
        waitTime += Math.random() * 1000;
        console.log(`Retrying in ${waitTime}ms...`);
        await new Promise((resolve) => setTimeout(resolve, waitTime));
      } else {
        console.error(
          `Failed to download after ${retries} attempts: ${card.url}`
        );
        throw new Error(`Failed to download: ${card.title}`);
      }
    }
  }
}

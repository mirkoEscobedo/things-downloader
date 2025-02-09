import { ElementCardType } from './typedef/typedef';

self.onmessage = async (e: MessageEvent) => {
  const cards: ElementCardType[] = e.data.toDownload;
  let downloadedFiles: {
    video?: Blob;
    title?: string;
    ext: string;
  }[] = [];

  const totalItems = cards.length;
  let completedItems = 0;

  try {
    for (const card of cards) {
      self.postMessage({
        type: 'status',
        status: `Downloading ${completedItems + 1}/${totalItems}`,
        progress: Math.round((completedItems / totalItems) * 100),
      });
      try {
        const downloaded = await downloadMediaFiles(card);
        if (downloaded && downloaded.video) {
          const downloadedAndExt = { ...downloaded, ext: card.ext };
          downloadedFiles.push(downloadedAndExt);
        } else {
          console.warn(`Skipping failed download for ${card.title}`);
        }
      } catch (err) {
        console.error(`Download failed for ${card.title}:`, err);
      }

      completedItems++;
      const progress = Math.round((completedItems / totalItems) * 100);
      self.postMessage({
        type: 'progress',
        status: 'Downloading...',
        progress,
      });
    }
    self.postMessage({
      type: 'complete',
      data: Array.isArray(downloadedFiles) ? downloadedFiles : [],
    });
  } catch (err) {
    console.error('failed: ', err);
    self.postMessage({ type: 'error', message: err, progress: 0 });
  }
};

async function downloadMediaFiles(
  card: ElementCardType,
  retries: number = 5,
  baseDelay: number = 2000
) {
  // console.log(card);
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
      // console.log(response);
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
        // console.log(`Retrying in ${waitTime}ms...`);
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

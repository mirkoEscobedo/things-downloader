import { ElementCardType } from "./typedef/typedef";

self.onmessage = async (e: MessageEvent) => {
  const cards: ElementCardType[] = e.data.toDownload;
  let downloadedFiles: { video: Blob; title: string | undefined }[] = [];
  try {
    for (const card of cards) {
      const downloaded = await downloadMediaFiles(card);
      downloadedFiles.push(downloaded);
    }

    self.postMessage(downloadedFiles);
  } catch (err) {
    console.error("failed: ", err);
  }
};

async function downloadMediaFiles(card: ElementCardType) {
  console.log(card);
  try {
    if (
      !card.url.startsWith("https://i.4cdn.org/") &&
      !card.url.startsWith("https://a.4cdn.org/")
    ) {
      throw new Error(`Invalid link ${card.url}`);
    }
    new URL(card.url);
    const url = `http://localhost:4000/proxy/${encodeURIComponent(card.url)}`;
    const response = await fetch(url);
    console.log(response);
    if (!response.ok) {
      throw new Error(`HTTP error, status: ${response.status}`);
    }
    const videoBlob = await response.blob();
    return { video: videoBlob, title: card.title };
  } catch (err) {
    throw new Error(`Failed to download: ${(card.title, card.url)}`);
  }
}

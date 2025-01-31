self.onmessage = async (e: MessageEvent) => {
  const { mediaUrls, format } = e.data;
  try {
    const downloadedFiles: Blob[] = await downloadMediaFiles(mediaUrls);
  } catch (err) {
    console.error("failed: ", err);
  }
};

async function downloadMediaFiles(mediaUrls: string[]): Promise<Blob[]> {
  const downloadedFiles: Blob[] = [];
  for (const url of mediaUrls) {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      downloadedFiles.push(blob);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  }
  return downloadedFiles;
}

async function convert(blobList: Blob[]) {
    
}

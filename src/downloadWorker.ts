
self.onmessage = async (e: MessageEvent) => {
  const { mediaUrls } = e.data;
  try {
    const downloadedFiles = await downloadMediaFiles(mediaUrls);
    self.postMessage(downloadedFiles);
  } catch (err) {
    console.error('failed: ', err);
  }
};

async function downloadMediaFiles(mediaUrls: string[]): Promise<{blob:Blob,fileName:string}[]> {
  const downloadedFiles = [];
  for (const url of mediaUrls) {
    try {
      const response = await fetch(url);
      const fileName = await getName(response, url);
      const blob = await response.blob();
      downloadedFiles.push({ blob: blob, fileName });
      console.log(blob);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  }
  return downloadedFiles;
}
async function getName(response: Response, url: string) {
  const contentDisposition =
    response.headers.get('Content-Disposition') ||
    response.headers.get('content-disposition');
  if (contentDisposition) {
    const match = contentDisposition.match(
      /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
    );
    if (match?.[1]) {
      return match[1].replace(/['"]/g, '');
    }
  }
  return url.substring(url.lastIndexOf('/') + 1);
}

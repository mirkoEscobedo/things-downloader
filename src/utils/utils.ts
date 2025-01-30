export const isUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
};

export async function getBase64Thumbnail(url: string): Promise<string | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("failed to fetch thumbnail");
    }
    const blob = await response.blob();
    const base64 = await blobToBase64(blob);
    const mimeType = response.headers.get("content-type");
    return `data:${mimeType};base64,${base64}`;
  } catch (error) {
    console.error(`Error fetching thumbnail from ${url}: `, error);
    return null;
  }
}

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

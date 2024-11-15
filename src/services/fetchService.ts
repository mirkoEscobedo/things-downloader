import { CHAN } from '@/const/const';

export async function fetchData(url: string) {
  try {
    const urlString = String(url);
    console.log(urlString);
    let endpoint: string = '';
    console.log('fetching in fetchData');
    if (urlString.includes(CHAN)) {
      endpoint = `http://localhost:4000/trpc/media.getChanMediaList?input={"link":"${urlString}"}`;
    } else {
      throw new Error('Unsupported platform link.');
    }

    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`HTTP error! status ${response.status}`);
    }
    const data = await response.json();
    console.log('almost returning data', data);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function callConvertAndDownloadMedia(
  mediaUrls: string[],
  format: string
) {
  const input = {
    mediaUrls,
    format,
  };
  try {
    console.log('fetchService starting call', input);
    const endpoint = `http://localhost:4000/trpc/media.convertAndDownloadMedia`;
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status ${response.status}`);
    }

    const data = await response.blob();
    const filename =
      format !== 'default' ? `convert_media.${format}` : `downloaded_media.zip`;

    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(data);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
  } catch (error) {
    console.error('Failed to convert and download media: ', error);
  }
}

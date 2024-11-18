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
    const responseData = await response.json();
    console.log(responseData);
    const filePath = responseData.result?.data?.filePath;
    if (!filePath) {
      throw new Error('File path not found in the response');
    }
    console.log(filePath);

    const downloadEndopoint = `http://localhost:4000/download?path=${encodeURIComponent(
      filePath
    )}`;
    window.location.href = downloadEndopoint;
  } catch (error) {
    console.error('Failed to convert and download media: ', error);
  }
}

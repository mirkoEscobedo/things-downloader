import { CHAN } from '@/const/const';

export async function fetchData(url: string) {
  try {
    let endpoint: string = '';

    switch (url) {
      case CHAN:
        endpoint = `http://localhost:4000/trpc/media.getChanMediaList?input={"link":"${url}"}`;
        break;
      default:
        throw new Error('Unsupported platform link.');
    }
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`HTTP error! status ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

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

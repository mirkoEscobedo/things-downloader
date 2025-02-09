import { CHAN } from '@/const/const';
import { chanTransform } from '@/utils/transformLink';

export async function fetchMedia(url: string) {
  try {
    if (url.includes(CHAN)) {
      const modifiedLink = chanTransform(url);
      // console.log(modifiedLink);
      const response = await fetch(
        `http://localhost:4000/chan/${encodeURIComponent(modifiedLink)}`
      );
      const data = await response.json();
      // console.log(data);
      return data;
    } else {
      throw new Error('not a valid url');
    }
  } catch (e) {
    throw new Error('failed to fetch media');
  }
}

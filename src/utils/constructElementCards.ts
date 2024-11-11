import { ElementCardType } from '@/typedef/typedef';

interface MediaItem {
  filename: string;
  url: string;
  board: string;
  tim: string;
  thumbnail: string | null;
}

interface MediaResponse {
  result: {
    data: MediaItem[];
  };
}

export function constructElementCards(
  response: MediaResponse
): ElementCardType[] {
  const { data } = response.result;

  const cards: ElementCardType[] = data.map((item) => {
    let icon = 'default';

    if (item.url.includes('4cdn')) {
      icon = '4chan';
    } else if (
      item.url.includes('youtube.com') ||
      item.url.includes('youtu.be')
    ) {
      icon = 'youtube';
    }

    return { title: item.filename, thumbnail: item.thumbnail, icon };
  });

  return cards;
}

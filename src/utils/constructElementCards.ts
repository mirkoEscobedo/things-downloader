import { ElementCardType, MediaItem } from "@/typedef/typedef";


export function constructElementCards(
  response: MediaItem[]
): ElementCardType[] {

  const cards: ElementCardType[] = response.map((item) => {
    let icon = "default";

    if (item.url.includes("4cdn")) {
      icon = "4chan";
    } else if (
      item.url.includes("youtube.com") ||
      item.url.includes("youtu.be")
    ) {
      icon = "youtube";
    }

    return {
      title: item.filename,
      thumbnail: item.thumbnail,
      icon,
      url: item.url,
    };
  });

  return cards;
}

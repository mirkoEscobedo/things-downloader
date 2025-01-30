import { chanTransform } from "@/utils/transformLink";
import { getBase64Thumbnail } from "@/utils/utils";

export async function getChan(url: string) {
  try {
    const { board, link } = chanTransform(url);
    const response = await fetch(link);
    if (!response.ok) {
      console.log(response.statusText);
      throw new Error("Fatching failed");
    }
    const data = await response.json();
    console.log(data);
    if (!data || !Array.isArray(data.posts)) {
      throw new Error("Failed to fetch thread data");
    }
    const mediaPosts = data.posts.filter((post: any) =>
      post.ext?.match(/\.(webm|jpg|jpeg|png|gif)$/)
    );
    const mediaList = await Promise.all(
      mediaPosts.map(async (post: any) => {
        let thumbnail = null;
        const thumbnailUrl = `https://i.4cnd.org/${board}/${post.tim}s.jpg`;
        const corsThumbnailUrl = `https://corsproxy.io/?key=0676e644&url=${thumbnailUrl}`;
        thumbnail = await getBase64Thumbnail(corsThumbnailUrl);
        return {
          filename: post.filename,
          url: `https://i.4cdn.org/${board}/${post.tim}${post.ext}`,
          thumbnail: thumbnail,
          board: board,
          tim: post.tim,
        };
      })
    );
    console.log(mediaList);
    return { mediaList };
  } catch (e) {
    console.error(e);
  }
}

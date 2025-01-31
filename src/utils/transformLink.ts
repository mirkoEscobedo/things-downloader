export const chanTransform = (threadUrl: string) => {
  try {
    const url = new URL(threadUrl);
    const board = url.pathname.split("/")[1];
    const threadId = url.pathname.split("/")[3];

    if (!board || !threadId) {
      throw new Error("invalid or expired thread");
    }
    const cdnUrl: string = `https://a.4cdn.org/${board}/thread/${threadId}.json`;

    return cdnUrl;
  } catch (e) {
    console.log(e);
    throw new Error("invalid or expired thread url");
  }
};

import { CHAN } from "@/const/const";
import { chanTransform } from "@/utils/transformLink";

export async function fetchMedia(url: string) {
  try {
    if (url.includes(CHAN)) {
      const modifiedLink = chanTransform(url);
      console.log(modifiedLink);
      const response = await fetch(
        `http://localhost:4000/chan/${encodeURIComponent(modifiedLink)}`
      );
      const data = await response.json();
      console.log(data);
      return data;
    } else {
      throw new Error("not a valid url");
    }
  } catch (e) {
    throw new Error("failed to fetch media");
  }
}

export async function callConvertAndDownloadMedia(
  taskId: string,
  mediaUrls: string[],
  format: string
) {
  const input = {
    taskId,
    mediaUrls,
    format,
  };
  try {
    console.log("fetchService starting call", input);

    const endpoint = `http://localhost:4000/trpc/media.convertAndDownloadMedia`;
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status ${response.status}`);
    }
    const responseData = await response.json();
    console.log(responseData);
    const filePath = responseData.result?.data?.filePath;
    if (!filePath) {
      throw new Error("File path not found in the response");
    }
    console.log(filePath);

    const downloadEndopoint = `http://localhost:4000/download?path=${encodeURIComponent(
      filePath
    )}`;
    window.location.href = downloadEndopoint;
  } catch (error) {
    console.error("Failed to convert and download media: ", error);
  }
}

export async function getNewTask() {
  try {
    console.log("fetching new task");
    const response = await fetch("http://localhost:4000/task");
    const data = await response.json();
    console.log("task fetched: ", data.taskId);
    return data.taskId;
  } catch (error) {
    console.error("failed to get New task", error);
  }
}

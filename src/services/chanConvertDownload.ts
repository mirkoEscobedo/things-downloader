export async function chanConvertDownlaod(
  mediaUrls: string[],
  format: string,
  taskId: string
) {
  const worker = new Worker(new URL("../worker", import.meta.url));

  worker.postMessage({ mediaUrls, format, taskId });
  // worker.onmessage= (e:MessageEvent) {

  // }
}

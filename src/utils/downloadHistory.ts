import { DOWNLOAD_HYSTORY_KEY } from '@/const/const';
import { ElementCardType } from '@/typedef/typedef';

export function addDownloadToHistory(download: ElementCardType) {
  const currentHistory = getDownloadHistory();
  currentHistory.push(download);
  localStorage.setItem(DOWNLOAD_HYSTORY_KEY, JSON.stringify(currentHistory));
}

export function getDownloadHistory(): ElementCardType[] {
  const history = localStorage.getItem(DOWNLOAD_HYSTORY_KEY);
  return history ? JSON.parse(history) : [];
}

export function deleteDownloadHistory() {
  localStorage.removeItem(DOWNLOAD_HYSTORY_KEY);
}

export function downloadHistoryAsJson() {
  const history = getDownloadHistory();
  const blob = new Blob([JSON.stringify(history, null, 2)], {
    type: 'application/json',
  });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', 'download_history.json');
  document.body.appendChild(link);
  link.click();
  link.parentNode?.removeChild(link);
}

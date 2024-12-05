import { createContext, useContext, useState } from 'react';
interface DownloadContextProps {
  isDownloading: boolean;

  startDownload: () => void;
  finishDownload: () => void;
}
const DownloadContext = createContext<DownloadContextProps | null>(null);

export const DownloadProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const startDownload = () => {
    setIsDownloading(true);
  };

  const finishDownload = () => {
    setIsDownloading(false);
  };

  return (
    <DownloadContext.Provider
      value={{ isDownloading, startDownload, finishDownload }}
    >
      {children}
    </DownloadContext.Provider>
  );
};

export const useDownload = () => {
  const context = useContext(DownloadContext);
  if (!context) {
    throw new Error('useDownload must be used in a provider');
  }
  return context as DownloadContextProps;
};

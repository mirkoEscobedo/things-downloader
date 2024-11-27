import { ElementCardType } from '@/typedef/typedef';
import { getDownloadHistory } from '@/utils/downloadHistory';
import { createContext, useContext, useEffect, useState } from 'react';

interface DownloadHistoryContextProps {
  downloadHistory: ElementCardType[];
  setDownloadHistory: React.Dispatch<React.SetStateAction<ElementCardType[]>>;
}
const DownloadHistoryContext = createContext<
  DownloadHistoryContextProps | undefined
>(undefined);

export const DownloadHistoryProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [downloadHistory, setDownloadHistory] = useState<ElementCardType[]>(
    () => getDownloadHistory()
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setDownloadHistory(getDownloadHistory());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  return (
    <DownloadHistoryContext.Provider
      value={{ downloadHistory, setDownloadHistory }}
    >
      {children}
    </DownloadHistoryContext.Provider>
  );
};

export const useDownloadHistory = () => {
  const context = useContext(DownloadHistoryContext);
  if (!context) {
    throw new Error('useDownloadHistory inside a provider scrub');
  }
  return context;
};

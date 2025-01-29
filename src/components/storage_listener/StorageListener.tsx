import { useAppDispatch } from "@/hooks/hooks";
import { setDownloadHistory } from "@/state/reducers/downloadHistorySlice";
import { getDownloadHistory } from "@/utils/downloadHistory";
import { useEffect } from "react";

const StorageListener: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const handleStorageChange = () => {
      dispatch(setDownloadHistory(getDownloadHistory()));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  });
  return null;
};

export default StorageListener;

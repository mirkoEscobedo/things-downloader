import { FakeAd } from "../fake_ad/FakeAd";
import { useAppSelector } from "@/hooks/hooks";

export const ProgessView = () => {
  const isDownloading = useAppSelector(
    (state) => state.downloadProgress.isDownloading
  );
  const progress = useAppSelector((state) => state.downloadProgress.progress);
  const status = useAppSelector((state) => state.downloadProgress.status);
  if (!isDownloading) {
    return null;
  }
  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto p-5">
      <FakeAd></FakeAd>
      <div className="w-full h-5 bg-gray-300 rounded-lg overflow-hidden">
        <div
          className="h-full bg-green-500 transition-all ease-linear duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="mt-2 text-sm text-neutral-50">
        {status} - {progress}%
      </div>
    </div>
  );
};

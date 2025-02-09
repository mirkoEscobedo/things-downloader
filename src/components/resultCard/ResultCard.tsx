import GeneralCard from '@/shared/components/general_card/General_Card';
import GeneralButton from '@/shared/components/generalButton/GeneralButton';
import { ElementCardType } from '@/typedef/typedef';
import {
  addDownloadToHistory,
  getDownloadHistory,
} from '@/utils/downloadHistory';
import { ProgessView } from '../progress_view/ProgressView';
import { DownloadIcon, X } from 'lucide-react';
import ConvertSelector from '../convertSelector/ConvertSelector';
import DownloadCardList from '../downloadCardList/DownloadCardList';
import './resultCard.css';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { setDownloadHistory } from '@/state/reducers/downloadHistorySlice';
import { resetList } from '@/state/reducers/selectedToDownloadSlice';
import { startDownload } from '@/utils/startWorkers';
import FFmpegSingleton from '@/utils/ffmpegSingleton';

interface ResultCardProps {
  downloadCardList: ElementCardType[];
  className?: string;
}
const ResultCard: React.FC<ResultCardProps> = ({
  downloadCardList,
  className,
}) => {
  const dispatch = useAppDispatch();
  const isDownloading = useAppSelector(
    (state) => state.downloadProgress.isDownloading
  );
  const translations = useAppSelector((state) => state.language.translations);
  const selectedToDownload = useAppSelector(
    (state) => state.selectToDownload.list
  );
  const format = useAppSelector((state) => state.selectFormat.format);

  const handleDownloadAll = async () => {
    try {
      const ffmpeg = await FFmpegSingleton.getFFmpeg();
      const result = await startDownload(
        selectedToDownload.length > 0 ? selectedToDownload : downloadCardList,
        ffmpeg,
        format
      );
      const url = URL.createObjectURL(result.blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = result.fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      selectedToDownload.length > 0
        ? selectedToDownload.forEach((toDownload) => {
            const card = downloadCardList.find(
              (card) => card.url === toDownload.url
            );
            if (card) {
              addDownloadToHistory(card);
            }
            dispatch(setDownloadHistory(getDownloadHistory()));
          })
        : downloadCardList.forEach((element) => {
            addDownloadToHistory(element);
            dispatch(setDownloadHistory(getDownloadHistory()));
          });

      // console.log('Download successfull');
    } catch (err) {
      console.error('Download Failed: ', err);
    }
  };

  const handleResetSelection = () => {
    dispatch(resetList());
  };

  return (
    <>
      <GeneralCard className={`mt-6 justify-self-center ${className || ''}`}>
        {downloadCardList.length > 1 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center w-full mt-4 mb-2">
            <div className="flex items-center justify-center text-xl">
              <h2 className="text-white">
                the '
                <span className="text-red-600 font-bold text-2xl">THINGS</span>'
              </h2>
            </div>
            <div className="flex items-center justify-center">
              <ConvertSelector
                name="convertAll"
                selectText={
                  selectedToDownload.length > 0
                    ? translations.resultCardConvertSelected
                    : translations.resultCardConvertAll
                }
              ></ConvertSelector>
            </div>
            <div className="flex items-center justify-center">
              {selectedToDownload.length > 0 && (
                <GeneralButton className="mr-2" onClick={handleResetSelection}>
                  <X></X>
                </GeneralButton>
              )}
              <GeneralButton onClick={handleDownloadAll} className="gap-1">
                <DownloadIcon></DownloadIcon>
                {selectedToDownload.length > 0
                  ? translations.resultCardDownloadSelected
                  : translations.resultCardDownloadAll}
              </GeneralButton>
            </div>
          </div>
        )}
        {isDownloading && <ProgessView />}
        <div className="overflow-y-auto max-h-[600px] scrollbar scrollbar-thumb-neutral-600 scrollbar-track-neutral-800 scrollbar-thumb-rounded no-scrollbar">
          <DownloadCardList
            selectedUrls={selectedToDownload}
          ></DownloadCardList>
        </div>
      </GeneralCard>
    </>
  );
};

export default ResultCard;

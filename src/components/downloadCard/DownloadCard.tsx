import ElementCard from '@/shared/components/element_card/ElementCard';
import GeneralButton from '@/shared/components/generalButton/GeneralButton';
import {
  addDownloadToHistory,
  getDownloadHistory,
} from '@/utils/downloadHistory';
import { DownloadIcon } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { setDownloadHistory } from '@/state/reducers/downloadHistorySlice';
import { setTrue } from '@/state/reducers/downloadSlice';
import { ElementCardType } from '@/typedef/typedef';
import { startDownload } from '@/utils/startWorkers';
import {
  addSelectedToDownload,
  removeSelectedToDownload,
} from '@/state/reducers/selectedToDownloadSlice';
import FFmpegSingleton from '@/utils/ffmpegSingleton';

interface DonwloadCardProps {
  card: ElementCardType;
  onClick?: () => void;
}

const DonwloadCard: React.FC<DonwloadCardProps> = ({ card, onClick }) => {
  const dispatch = useAppDispatch();
  const translations = useAppSelector((state) => state.language.translations);
  const format = useAppSelector((state) => state.selectFormat.format);
  const selectedCards = useAppSelector((state) => state.selectToDownload.list);
  const isChecked = selectedCards.some((item) => item.url === card.url);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = event.target.checked;
    if (newChecked) {
      dispatch(addSelectedToDownload(card));
    } else {
      dispatch(removeSelectedToDownload(card.url));
    }
  };

  const handleDownloadSingle = async () => {
    const cards = [card];
    dispatch(setTrue());
    try {
      const ffmpeg = await FFmpegSingleton.getFFmpeg();
      const result = await startDownload(cards, ffmpeg, format);
      const url = URL.createObjectURL(result.blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = result.fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      console.log('Download successfull: ', url);
      addDownloadToHistory({
        title: card.title,
        icon: card.icon,
        thumbnail: card.thumbnail,
        url: card.url,
        ext: card.ext,
      });

      dispatch(setDownloadHistory(getDownloadHistory()));
    } catch (err) {
      console.error('Download Failed: ', err);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-between w-full">
        <div className="flex items-center justify-center">
          <ElementCard
            url={card.url}
            title={card.title}
            icon={card.icon}
            thumbnail={card.thumbnail == null ? '' : card.thumbnail}
            onClick={onClick}
            extraClasses=""
            ext={card.ext}
          ></ElementCard>
        </div>
        <div className="flex items-center justify-center">
          <input
            className="mr-4 size-5"
            type="checkbox"
            onChange={handleCheckboxChange}
            checked={isChecked}
          ></input>
          <GeneralButton onClick={handleDownloadSingle} className="gap-1">
            <DownloadIcon></DownloadIcon>
            {translations.downloadCardButtonText}
          </GeneralButton>
        </div>
      </div>
    </>
  );
};

export default DonwloadCard;

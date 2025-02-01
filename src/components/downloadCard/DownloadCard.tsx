import ElementCard from '@/shared/components/element_card/ElementCard';
import GeneralButton from '@/shared/components/generalButton/GeneralButton';
import React from 'react';
import { getNewTask } from '@/services/fetchService';
import {
  addDownloadToHistory,
  getDownloadHistory,
} from '@/utils/downloadHistory';
import { DownloadIcon } from 'lucide-react';
import ConvertSelector from '../convertSelector/ConvertSelector';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { setDownloadHistory } from '@/state/reducers/downloadHistorySlice';
import { setTrue } from '@/state/reducers/downloadSlice';
import { ElementCardType } from '@/typedef/typedef';
import { startDownload } from '@/utils/startWorkers';

interface DonwloadCardProps {
  card: ElementCardType;
  onClick?: () => void;
  onCheckboxChange: (toDownload: ElementCardType, checked: boolean) => void;
  checked: boolean;
  onTaskIdGenerated: (taskId: string) => void;
}

const DonwloadCard: React.FC<DonwloadCardProps> = ({
  card,
  onClick,
  onCheckboxChange,
  checked,
  onTaskIdGenerated,
}) => {
  const dispatch = useAppDispatch();
  const translations = useAppSelector((state) => state.language.translations);
  const format = useAppSelector((state) => state.selectFormat.format);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onCheckboxChange(card, event.target.checked);
  };

  const handleDownloadSingle = async () => {
    const taskId = await getNewTask();
    console.log(taskId);
    onTaskIdGenerated(taskId);
    const cards = [card];
    dispatch(setTrue());
    await startDownload(cards, format);
    // await callConvertAndDownloadMedia(taskId, mediaUrl, selectedFormat);

    addDownloadToHistory({
      title: card.title,
      icon: card.icon,
      thumbnail: card.thumbnail,
      url: card.url,
    });

    dispatch(setDownloadHistory(getDownloadHistory()));
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center w-full">
        <div className="flex items-center justify-center">
          <ElementCard
            url={card.url}
            title={card.title}
            icon={card.icon}
            thumbnail={card.thumbnail == null ? '' : card.thumbnail}
            onClick={onClick}
            extraClasses=""
          ></ElementCard>
        </div>
        <div className="flex items-center justify-center">
          <ConvertSelector
            name="convertSingle"
            selectText={translations.downloadCardSelectText}
          ></ConvertSelector>
        </div>
        <div className="flex items-center justify-center">
          <input
            className="mr-4 size-5"
            type="checkbox"
            onChange={handleCheckboxChange}
            checked={checked}
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

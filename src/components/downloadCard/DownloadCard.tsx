import ElementCard from '@/shared/components/element_card/ElementCard';
import GeneralButton from '@/shared/components/generalButton/GeneralButton';
import React, { useState } from 'react';

import { useDownloadHistory } from '@/context/DownloadHistoryContext';
import { useLanguage } from '@/context/LanguageContext';
import {
  callConvertAndDownloadMedia,
  getNewTask,
} from '@/services/fetchService';
import {
  addDownloadToHistory,
  getDownloadHistory,
} from '@/utils/downloadHistory';
import { DownloadIcon } from 'lucide-react';
import ConvertSelector from '../convertSelector/ConvertSelector';
import { useDownload } from '@/context/DownloadContext';

interface DonwloadCardProps {
  elementCardTitle?: string;
  elementCardIcon?: string;
  elementCardThumbnail?: string;
  url: string;
  onClick?: () => void;
  onCheckboxChange: (url: string, checked: boolean) => void;
  checked: boolean;
  onTaskIdGenerated: (taskId: string) => void;
}

const DonwloadCard: React.FC<DonwloadCardProps> = ({
  elementCardIcon,
  elementCardTitle,
  url,
  elementCardThumbnail,
  onClick,
  onCheckboxChange,
  checked,
  onTaskIdGenerated,
}) => {
  const { translations } = useLanguage();
  const { setDownloadHistory } = useDownloadHistory();
  const { startDownload } = useDownload();
  const [selectedFormat, setSelectedFormat] = useState<string>('default');

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onCheckboxChange(url, event.target.checked);
  };

  const handleDownloadSingle = async () => {
    const taskId = await getNewTask();
    console.log(taskId);
    onTaskIdGenerated(taskId);
    const mediaUrl = [url];
    startDownload();
    await callConvertAndDownloadMedia(taskId, mediaUrl, selectedFormat);

    addDownloadToHistory({
      title: elementCardTitle,
      icon: elementCardIcon,
      thumbnail: elementCardThumbnail,
      url,
    });

    setDownloadHistory(getDownloadHistory());
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center w-full">
        <div className="flex items-center justify-center">
          <ElementCard
            url={url}
            title={elementCardTitle}
            icon={elementCardIcon}
            thumbnail={elementCardThumbnail}
            onClick={onClick}
            extraClasses=""
          ></ElementCard>
        </div>
        <div className="flex items-center justify-center">
          <ConvertSelector
            onFormatChange={setSelectedFormat}
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

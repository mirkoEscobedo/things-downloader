import ElementCard from '@/shared/components/element_card/ElementCard';
import GeneralButton from '@/shared/components/generalButton/GeneralButton';
import React from 'react';

import { DownloadIcon } from 'lucide-react';
import ConvertSelector from '../convertSelector/ConvertSelector';
import { useLanguage } from '@/context/LanguageContex';
import { callConvertAndDownloadMedia } from '@/services/fetchService';

interface DonwloadCardProps {
  elementCardTitle?: string;
  elementCardIcon?: string;
  elementCardThumbnail?: string;
  url: string;
  onClick?: () => void;
}

const DonwloadCard: React.FC<DonwloadCardProps> = ({
  elementCardIcon,
  elementCardTitle,
  url,
  elementCardThumbnail,
  onClick,
}) => {
  const { translations } = useLanguage();

  const handleDownloadSingle = async () => {
    const mediaUrl = [url];
    const formatSelectElement = document.querySelector(
      '[name="convertSingle"]'
    ) as HTMLSelectElement;
    const format = formatSelectElement?.value || 'default';
    await callConvertAndDownloadMedia(mediaUrl, format);
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
            name="convertSingle"
            selectText={translations.downloadCardSelectText}
          ></ConvertSelector>
        </div>
        <div className="flex items-center justify-center">
          <input className="mr-4 size-5" type="checkbox"></input>
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

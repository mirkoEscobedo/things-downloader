import ElementCard from '@/shared/components/element_card/ElementCard';
import GeneralButton from '@/shared/components/generalButton/GeneralButton';
import React from 'react';

import { DownloadIcon } from 'lucide-react';
import ConvertSelector from '../convertSelector/ConvertSelector';
import { DownloadCardType } from '@/typedef/typedef';
import { useLanguage } from '@/context/LanguageContex';

interface DonwloadCardProps extends DownloadCardType {}
const DonwloadCard: React.FC<DonwloadCardProps> = ({
  elementCardProps,
  onClick,
}) => {
  const { translations } = useLanguage();
  return (
    <>
      <div className="flex items-center gap-4">
        <ElementCard
          title={elementCardProps.title}
          icon={elementCardProps.icon}
          thumbnail={elementCardProps.thumbnail}
          onClick={onClick}
          extraClasses=""
        ></ElementCard>
        <ConvertSelector
          selectText={translations.downloadCardSelectText}
        ></ConvertSelector>
        <input type="checkbox"></input>
        <GeneralButton className="gap-1">
          <DownloadIcon></DownloadIcon>
          {translations.downloadCardButtonText}
        </GeneralButton>
      </div>
    </>
  );
};

export default DonwloadCard;

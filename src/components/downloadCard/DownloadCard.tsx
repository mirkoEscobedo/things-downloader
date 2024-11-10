import ElementCard from "@/shared/components/element_card/ElementCard";
import GeneralButton from "@/shared/components/generalButton/GeneralButton";
import React from "react";

import { DownloadIcon } from 'lucide-react';
import ConvertSelector from '../convertSelector/ConvertSelector';
import { useLanguage } from '@/context/LanguageContex';

interface DonwloadCardProps {
  elementCardTitle?: string;
  elementCardIcon?: string;
  elementCardThumbnail?: string;
  onClick?: () => void;
}

const DonwloadCard: React.FC<DonwloadCardProps> = ({
  elementCardIcon,
  elementCardTitle,
  elementCardThumbnail,
  onClick,
}) => {
  const { translations } = useLanguage();
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center w-full">
        <div className="flex items-center justify-center">
          <ElementCard
            title={elementCardTitle}
            icon={elementCardIcon}
            thumbnail={elementCardThumbnail}
            onClick={onClick}
            extraClasses=""
          ></ElementCard>
        </div>
        <div className="flex items-center justify-center">
          <ConvertSelector
            selectText={translations.downloadCardSelectText}
          ></ConvertSelector>
        </div>
        <div className="flex items-center justify-center">
          <input className="mr-4" type="checkbox"></input>
          <GeneralButton className="gap-1">
            <DownloadIcon></DownloadIcon>
            {translations.downloadCardButtonText}
          </GeneralButton>
        </div>
      </div>
    </>
  );
};

export default DonwloadCard;

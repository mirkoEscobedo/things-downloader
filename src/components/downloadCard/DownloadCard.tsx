import ElementCard from '@/shared/components/element_card/ElementCard';
import GeneralButton from '@/shared/components/generalButton/GeneralButton';
import React from 'react';

import { DownloadIcon } from 'lucide-react';
import ConvertSelector from '../convertSelector/ConvertSelector';
import { DownloadCardType } from '@/typedef/typedef';

interface DonwloadCardProps extends DownloadCardType {}
const DonwloadCard: React.FC<DonwloadCardProps> = ({
  selectText,
  elementCardProps,
  onClick,
  buttonText,
}) => {
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
        <ConvertSelector selectText={selectText}></ConvertSelector>
        <input type="checkbox"></input>
        <GeneralButton className="gap-1">
          <DownloadIcon></DownloadIcon>
          {buttonText}
        </GeneralButton>
      </div>
    </>
  );
};

export default DonwloadCard;

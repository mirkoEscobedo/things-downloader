import ElementCard from '@/shared/components/element_card/ElementCard';
import GeneralButton from '@/shared/components/generalButton/GeneralButton';
import React from 'react';

import { DownloadIcon } from 'lucide-react';
import ConvertSelector from '../convertSelector/ConvertSelector';

interface DonwloadCardProps {
  selectText: string;

  buttonText: string;
}
const DonwloadCard: React.FC<DonwloadCardProps> = ({
  selectText,

  buttonText,
}) => {
  return (
    <>
      <div className="flex items-center gap-4">
        <ElementCard title="text" icon="youtube" extraClasses=""></ElementCard>
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

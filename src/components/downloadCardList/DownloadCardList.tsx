import { ElementCardType } from '@/typedef/typedef';
import React from 'react';
import DonwloadCard from '../downloadCard/DownloadCard';

interface DownloadCardListProsp {
  dowloadcardList: ElementCardType[];
  onCheckboxChange: (url: string, checked: boolean) => void;
}
const DownloadCardList: React.FC<DownloadCardListProsp> = ({
  onCheckboxChange,
  dowloadcardList,
}) => {
  return (
    <>
      {dowloadcardList.map((downloadCard, index) => (
        <DonwloadCard
          onCheckboxChange={onCheckboxChange}
          url={downloadCard.url}
          key={index}
          elementCardIcon={downloadCard.icon}
          elementCardThumbnail={
            downloadCard.thumbnail === null ? '' : downloadCard.thumbnail
          }
          elementCardTitle={downloadCard.title}
          onClick={downloadCard.onClick}
        ></DonwloadCard>
      ))}
    </>
  );
};

export default DownloadCardList;

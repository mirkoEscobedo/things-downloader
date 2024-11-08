import { ElementCardType } from '@/typedef/typedef';
import React from 'react';
import DonwloadCard from '../downloadCard/DownloadCard';

interface DownloadCardListProsp {
  dowloadcardList: ElementCardType[];
}
const DownloadCardList: React.FC<DownloadCardListProsp> = ({
  dowloadcardList,
}) => {
  return (
    <>
      {dowloadcardList.map((downloadCard, index) => (
        <DonwloadCard
          key={index}
          elementCardIcon={downloadCard.icon}
          elementCardThumbnail={downloadCard.thumbnail}
          elementCardTitle={downloadCard.title}
          onClick={downloadCard.onClick}
        ></DonwloadCard>
      ))}
    </>
  );
};

export default DownloadCardList;

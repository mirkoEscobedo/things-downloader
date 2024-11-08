import { DownloadCardType } from '@/typedef/typedef';
import React from 'react';
import DonwloadCard from '../downloadCard/DownloadCard';

interface DownloadCardListProsp {
  dowloadcardList: DownloadCardType[];
}
const DownloadCardList: React.FC<DownloadCardListProsp> = ({
  dowloadcardList,
}) => {
  return (
    <>
      {dowloadcardList.map((downloadCard, index) => (
        <DonwloadCard
          key={index}
          elementCardProps={downloadCard.elementCardProps}
        ></DonwloadCard>
      ))}
    </>
  );
};

export default DownloadCardList;

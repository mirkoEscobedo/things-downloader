import { ElementCardType } from '@/typedef/typedef';
import React from 'react';
import DonwloadCard from '../downloadCard/DownloadCard';

interface DownloadCardListProsp {
  dowloadcardList: ElementCardType[];
  onCheckboxChange: (url: string, checked: boolean) => void;
  selectedUrls: string[];
  onTaskIdGenerated: (taskId: string) => void;
}
const DownloadCardList: React.FC<DownloadCardListProsp> = ({
  onCheckboxChange,
  dowloadcardList,
  selectedUrls,
  onTaskIdGenerated,
}) => {
  return (
    <>
      {dowloadcardList.map((downloadCard, index) => (
        <DonwloadCard
          onTaskIdGenerated={onTaskIdGenerated}
          onCheckboxChange={onCheckboxChange}
          url={downloadCard.url}
          key={index}
          elementCardIcon={downloadCard.icon}
          elementCardThumbnail={
            downloadCard.thumbnail === null ? '' : downloadCard.thumbnail
          }
          elementCardTitle={downloadCard.title}
          onClick={downloadCard.onClick}
          checked={selectedUrls.includes(downloadCard.url)}
        ></DonwloadCard>
      ))}
    </>
  );
};

export default DownloadCardList;

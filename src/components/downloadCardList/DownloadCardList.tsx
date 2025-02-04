import { ElementCardType } from "@/typedef/typedef";
import React from "react";
import DonwloadCard from "../downloadCard/DownloadCard";
import { useAppSelector } from "@/hooks/hooks";

interface DownloadCardListProsp {
  // onCheckboxChange: (toDownload: ElementCardType, checked: boolean) => void;
  selectedUrls: ElementCardType[];
}
const DownloadCardList: React.FC<DownloadCardListProsp> = ({
  // onCheckboxChange,
  selectedUrls,
}) => {
  const downloadCardList = useAppSelector(
    (state) => state.downloadCardList.value
  );
  return (
    <>
      {downloadCardList.map((downloadCard, index) => (
        <DonwloadCard
          card={downloadCard}
          // onCheckboxChange={onCheckboxChange}
          key={index}
          onClick={downloadCard.onClick}
          // checked={selectedUrls.includes({
          //   url: downloadCard.url,
          //   title: downloadCard.title,
          // })}
        ></DonwloadCard>
      ))}
    </>
  );
};

export default DownloadCardList;

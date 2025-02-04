import { ElementCardType } from "@/typedef/typedef";
import React from "react";
import DonwloadCard from "../downloadCard/DownloadCard";
import { useAppSelector } from "@/hooks/hooks";

interface DownloadCardListProsp {
  selectedUrls: ElementCardType[];
}
const DownloadCardList: React.FC<DownloadCardListProsp> = ({
}) => {
  const downloadCardList = useAppSelector(
    (state) => state.downloadCardList.value
  );
  return (
    <>
      {downloadCardList.map((downloadCard, index) => (
        <DonwloadCard
          card={downloadCard}
          key={index}
          onClick={downloadCard.onClick}
        ></DonwloadCard>
      ))}
    </>
  );
};

export default DownloadCardList;

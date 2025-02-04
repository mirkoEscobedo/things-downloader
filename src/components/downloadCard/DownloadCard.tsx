import ElementCard from "@/shared/components/element_card/ElementCard";
import GeneralButton from "@/shared/components/generalButton/GeneralButton";
import React, { useState } from "react";
import {
  addDownloadToHistory,
  getDownloadHistory,
} from "@/utils/downloadHistory";
import { DownloadIcon } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { setDownloadHistory } from "@/state/reducers/downloadHistorySlice";
import { setTrue } from "@/state/reducers/downloadSlice";
import { ElementCardType } from "@/typedef/typedef";
import { startDownload } from "@/utils/startWorkers";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { setSelectedToDownload } from "@/state/reducers/selectedToDownloadSlice";

interface DonwloadCardProps {
  card: ElementCardType;
  onClick?: () => void;
}

const DonwloadCard: React.FC<DonwloadCardProps> = ({
  card,
  onClick,
}) => {
  const dispatch = useAppDispatch();
  const translations = useAppSelector((state) => state.language.translations);
  const format = useAppSelector((state) => state.selectFormat.format);
  const [checked, setChecked] = useState<boolean>(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    dispatch(setSelectedToDownload({ toDownload: card, checked }));
  };

  const handleDownloadSingle = async () => {
    const cards = [card];
    dispatch(setTrue());
    try {
      const result = await startDownload(cards, new FFmpeg(), format);
      const url = URL.createObjectURL(result.blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = result.fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      console.log("Download successfull: ", url);
    } catch (err) {
      console.error("Download Failed: ", err);
    }

    addDownloadToHistory({
      title: card.title,
      icon: card.icon,
      thumbnail: card.thumbnail,
      url: card.url,
    });

    dispatch(setDownloadHistory(getDownloadHistory()));
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center justify-center w-full">
        <div className="flex items-center justify-center">
          <ElementCard
            url={card.url}
            title={card.title}
            icon={card.icon}
            thumbnail={card.thumbnail == null ? "" : card.thumbnail}
            onClick={onClick}
            extraClasses=""
          ></ElementCard>
        </div>
        <div className="flex items-center justify-center">
          <input
            className="mr-4 size-5"
            type="checkbox"
            onChange={handleCheckboxChange}
            checked={checked}
          ></input>
          <GeneralButton onClick={handleDownloadSingle} className="gap-1">
            <DownloadIcon></DownloadIcon>
            {translations.downloadCardButtonText}
          </GeneralButton>
        </div>
      </div>
    </>
  );
};

export default DonwloadCard;

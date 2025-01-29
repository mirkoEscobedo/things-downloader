import {
  callConvertAndDownloadMedia,
  getNewTask,
} from "@/services/fetchService";
import GeneralCard from "@/shared/components/general_card/General_Card";
import GeneralButton from "@/shared/components/generalButton/GeneralButton";
import { ElementCardType } from "@/typedef/typedef";
import {
  addDownloadToHistory,
  getDownloadHistory,
} from "@/utils/downloadHistory";
import { useState } from "react";
import { ProgessView } from "../progress_view/ProgressView";
import { DownloadIcon, X } from "lucide-react";
import ConvertSelector from "../convertSelector/ConvertSelector";
import DownloadCardList from "../downloadCardList/DownloadCardList";
import "./resultCard.css";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { setTrue } from "@/state/reducers/downloadSlice";
import { setDownloadHistory } from "@/state/reducers/downloadHistorySlice";

interface ResultCardProps {
  downloadCardList: ElementCardType[];
  className?: string;
}
const ResultCard: React.FC<ResultCardProps> = ({
  downloadCardList,
  className,
}) => {
  const dispatch = useAppDispatch();
  const isDownloading = useAppSelector((state) => state.download.value);
  const translations = useAppSelector((state) => state.language.translations);
  const [selectedUrls, setSelectedUrls] = useState<string[]>([]);
  const [selectedFormat, setSelectedFormat] = useState<string>("default");
  const [taskId, setTaskId] = useState("");

  const handleCheckboxChange = (url: string, checked: boolean) => {
    setSelectedUrls((prev) => {
      if (checked) {
        return [...prev, url];
      } else {
        return prev.filter((selectedUrls) => selectedUrls !== url);
      }
    });
  };

  const handleDownloadAll = async () => {
    const taskId = await getNewTask();
    console.log(taskId);
    setTaskId(taskId);
    const urlsToDownload =
      selectedUrls.length > 0
        ? selectedUrls
        : downloadCardList.map((card) => card.url);
    dispatch(setTrue());
    await callConvertAndDownloadMedia(taskId, urlsToDownload, selectedFormat);

    selectedUrls.forEach((url) => {
      const card = downloadCardList.find((card) => card.url === url);
      if (card) {
        addDownloadToHistory(card);
      }
      dispatch(setDownloadHistory(getDownloadHistory()));
    });
  };

  function handleTaskIdGenerated(taskId: string) {
    setTaskId(taskId);
  }

  const handleResetSelection = () => {
    setSelectedUrls([]);
  };

  return (
    <>
      <GeneralCard className={`mt-6 justify-self-center ${className || ""}`}>
        {downloadCardList.length > 1 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center w-full mt-4 mb-2">
            <div className="flex items-center justify-center text-xl">
              <h2 className="text-white">
                the '
                <span className="text-red-600 font-bold text-2xl">THINGS</span>'
              </h2>
            </div>
            <div className="flex items-center justify-center">
              <ConvertSelector
                onFormatChange={setSelectedFormat}
                name="convertAll"
                selectText={
                  selectedUrls.length > 0
                    ? translations.resultCardConvertSelected
                    : translations.resultCardConvertAll
                }
              ></ConvertSelector>
            </div>
            <div className="flex items-center justify-center">
              {selectedUrls.length > 0 && (
                <GeneralButton className="mr-2" onClick={handleResetSelection}>
                  {/* {translations.resetCheckbox} */}
                  <X></X>
                </GeneralButton>
              )}
              <GeneralButton onClick={handleDownloadAll} className="gap-1">
                <DownloadIcon></DownloadIcon>
                {selectedUrls.length > 0
                  ? translations.resultCardDownloadSelected
                  : translations.resultCardDownloadAll}
              </GeneralButton>
            </div>
          </div>
        )}
        {isDownloading && <ProgessView taskId={taskId!} />}
        <div className="overflow-y-auto max-h-[600px] scrollbar scrollbar-thumb-neutral-600 scrollbar-track-neutral-800 scrollbar-thumb-rounded no-scrollbar">
          <DownloadCardList
            onTaskIdGenerated={handleTaskIdGenerated}
            selectedUrls={selectedUrls}
            onCheckboxChange={handleCheckboxChange}
            dowloadcardList={downloadCardList}
          ></DownloadCardList>
        </div>
      </GeneralCard>
    </>
  );
};

export default ResultCard;

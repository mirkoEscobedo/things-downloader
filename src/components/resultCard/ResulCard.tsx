import GeneralCard from '@/shared/components/general_card/General_Card';
import DownloadCardList from '../downloadCardList/DownloadCardList';
import { ElementCardType } from '@/typedef/typedef';
import ConvertSelector from '../convertSelector/ConvertSelector';
import GeneralButton from '@/shared/components/generalButton/GeneralButton';
import { DownloadIcon } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContex';
import {
  callConvertAndDownloadMedia,
  getNewTask,
} from '@/services/fetchService';
import { addDownloadToHistory } from '@/utils/downloadHistory';
import { useState } from 'react';
interface ResultCardProps {
  downloadCardList: ElementCardType[];
  className?: string;
}
const ResultCard: React.FC<ResultCardProps> = ({
  downloadCardList,
  className,
}) => {
  const { translations } = useLanguage();
  const [selectedUrls, setSelectedUrls] = useState<string[]>([]);
  const [selectedFormat, setSelectedFormat] = useState<string>('default');

  console.log(selectedFormat);
  console.log(downloadCardList.length);
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
    const { taskId } = await getNewTask();

    const urlsToDownload =
      selectedUrls.length > 0
        ? selectedUrls
        : downloadCardList.map((card) => card.url);

    await callConvertAndDownloadMedia(taskId, urlsToDownload, selectedFormat);
    selectedUrls.forEach((url) => {
      const card = downloadCardList.find((card) => card.url === url);
      if (card) {
        addDownloadToHistory(card);
      }
    });
    // downloadCardList.map((card) => addDownloadToHistory(card));
  };
  return (
    <>
      <GeneralCard className={`mt-6 justify-self-center ${className || ''}`}>
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
              <GeneralButton onClick={handleDownloadAll} className="gap-1">
                <DownloadIcon></DownloadIcon>
                {selectedUrls.length > 0
                  ? translations.resultCardDownloadSelected
                  : translations.resultCardDownloadAll}
              </GeneralButton>
            </div>
          </div>
        )}
        <div className="overflow-y-auto max-h-[600px] scrollbar scrollbar-thumb-neutral-600 scrollbar-track-neutral-800 scrollbar-thumb-rounded">
          <DownloadCardList
            onCheckboxChange={handleCheckboxChange}
            dowloadcardList={downloadCardList}
          ></DownloadCardList>
        </div>
      </GeneralCard>
    </>
  );
};

export default ResultCard;

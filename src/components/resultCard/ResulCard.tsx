import GeneralCard from '@/shared/components/general_card/General_Card';
import DownloadCardList from '../downloadCardList/DownloadCardList';
import { ElementCardType } from '@/typedef/typedef';
import ConvertSelector from '../convertSelector/ConvertSelector';
import GeneralButton from '@/shared/components/generalButton/GeneralButton';
import { DownloadIcon } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContex';
interface ResultCardProps {
  downloadCardList: ElementCardType[];
  className?: string;
}
const ResultCard: React.FC<ResultCardProps> = ({
  downloadCardList,
  className,
}) => {
  const { translations } = useLanguage();
  console.log(downloadCardList.length);
  return (
    <>
      <GeneralCard className={`justify-self-center ${className || ''}`}>
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
                selectText={translations.resultCardConvertAll}
              ></ConvertSelector>
            </div>
            <div className="flex items-center justify-center">
              <GeneralButton className="gap-1">
                <DownloadIcon></DownloadIcon>
                {translations.resultCardDownloadAll}
              </GeneralButton>
            </div>
          </div>
        )}
        <DownloadCardList dowloadcardList={downloadCardList}></DownloadCardList>
      </GeneralCard>
    </>
  );
};

export default ResultCard;

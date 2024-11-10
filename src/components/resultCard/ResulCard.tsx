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
  return (
    <>
      <GeneralCard className={`justify-self-center ${className || ''}`}>
        {downloadCardList.length > 1 && (
          <div className="flex items-center">
            <h2 className="text-white">
              the '<span className="text-red-600 font-bold">THINGS</span>'
            </h2>
            <ConvertSelector
              selectText={translations.resultCardConvertAll}
            ></ConvertSelector>
            <GeneralButton className="gap-1">
              <DownloadIcon></DownloadIcon>
              {translations.resultCardDownloadAll}
            </GeneralButton>
          </div>
        )}
        <DownloadCardList dowloadcardList={downloadCardList}></DownloadCardList>
      </GeneralCard>
    </>
  );
};

export default ResultCard;

import ConvenienceIcon from '@/components/convenienceIcon/ConvenienceIcon';
import OrbitingCircle from '@/components/orbitingCircles/OrbitingCircle';
import ResultCard from '@/components/resultCard/ResulCard';
import SearchBox from '@/components/searchBox/SearchBox';
import ShieldIcon from '@/components/shieldIcon/ShieldIcon';
import SimplicityIcon from '@/components/simplicityIcon/SimplicityIcon';
import Title from '@/components/title/Title';
import TopBar from '@/components/topBar/TopBar';
import WhyChooseUsParent from '@/components/whyChooseUsParent/WhyChooseUsParent';
import { useLanguage } from '@/context/LanguageContex';
import DownloadIcon from '@/shared/components/downloadIcon/DownloadIcon';
import TextCard from '@/shared/components/textCard/TextCard';
import { ElementCardType } from '@/typedef/typedef';
import { constructElementCards } from '@/utils/constructElementCards';
import { useState } from 'react';

const Home: React.FC = () => {
  const { translations } = useLanguage();
  const [downloadCardList, setDownloadCardList] = useState<ElementCardType[]>(
    []
  );

  const handleSearch = async (response: any) => {
    const formattedData = constructElementCards(response);
    setDownloadCardList(formattedData);
  };
  return (
    <>
      <TopBar></TopBar>
      <Title />
      <SearchBox onSearch={handleSearch} className="z-50" />
      <div className="relative">
        <OrbitingCircle className=" absolute -top-20 -z-9" />
      </div>
      {downloadCardList.length > 0 && (
        <ResultCard downloadCardList={downloadCardList} />
      )}
      <WhyChooseUsParent>
        <TextCard
          title={translations.simplicityTitle}
          description={translations.simplicityDescription}
          image={<SimplicityIcon />}
        />
        <TextCard
          title={translations.convenienceTitle}
          description={translations.convenienceDescription}
          image={<ConvenienceIcon />}
        />
        <TextCard
          title={translations.qualityDownloadsTitle}
          description={translations.qualityDownloadsDescription}
          image={<DownloadIcon />}
        />

        <TextCard
          description={translations.safeAndSecureDescription}
          title={translations.safeAndSecureTitle}
          image={<ShieldIcon />}
        />
      </WhyChooseUsParent>
    </>
  );
};

export default Home;

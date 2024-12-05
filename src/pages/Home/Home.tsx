import CardGrid from "@/components/card_grid/CardGrid";
import ConvenienceIcon from "@/components/convenienceIcon/ConvenienceIcon";
import Footer from "@/components/footer/Footer";
import OrbitingCircle from "@/components/orbitingCircles/OrbitingCircle";
import ResultCard from "@/components/resultCard/ResultCard";
import SearchBox from "@/components/searchBox/SearchBox";
import ShieldIcon from "@/components/shieldIcon/ShieldIcon";
import SimplicityIcon from "@/components/simplicityIcon/SimplicityIcon";
import Title from "@/components/title/Title";
import TopBar from "@/components/topBar/TopBar";
import WhyChooseUsParent from "@/components/whyChooseUsParent/WhyChooseUsParent";
import { useDownloadHistory } from "@/context/DownloadHistoryContext";
import { useLanguage } from "@/context/LanguageContext";
import DownloadIcon from "@/shared/components/downloadIcon/DownloadIcon";
import TextCard from "@/shared/components/textCard/TextCard";
import { ElementCardType } from "@/typedef/typedef";
import { constructElementCards } from "@/utils/constructElementCards";
import { useState } from "react";

const Home: React.FC = () => {
  const { translations } = useLanguage();
  const [downloadCardList, setDownloadCardList] = useState<ElementCardType[]>(
    []
  );
  const { downloadHistory } = useDownloadHistory();

  const handleSearch = async (response: any) => {
    const formattedData = constructElementCards(response);
    setDownloadCardList(formattedData);
  };
  return (
    <>
      <TopBar></TopBar>
      <div className="relative">
        <Title className="relative z-10 " />
        <SearchBox onSearch={handleSearch} className="sz-50 z-10 relative" />
        <OrbitingCircle className=" absolute top-14 -z-1 h-full left-1/2 transform -translate-x-1/2" />

        {downloadCardList.length > 0 && (
          <ResultCard downloadCardList={downloadCardList} />
        )}
        {downloadHistory.length > 0 && (
          <div className="mt-8">
            <h2 className="text-white text-xl font-bold text-center">
              {translations.downloadHistory}
            </h2>
            <CardGrid data={downloadHistory}></CardGrid>
          </div>
        )}
        <WhyChooseUsParent className="relative z-10">
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
      </div>
      <Footer />
    </>
  );
};

export default Home;

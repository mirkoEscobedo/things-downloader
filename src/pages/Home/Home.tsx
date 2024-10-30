import SearchBox from "@/components/searchBox/SearchBox";
import Title from "@/components/title/Title";
import TopBar from "@/components/topBar/TopBar";
import TextCard from "@/components/whyChooseUsElements/TextCard";
import WhyChooseUsParent from "@/components/whyChooseUsParent/WhyChooseUsParent";
import { useLanguage } from "@/context/LanguageContex";
import DownloadIcon from "@/shared/components/downloadIcon/DownloadIcon";

const Home: React.FC = () => {
  const { translations } = useLanguage();
  return (
    <>
      <TopBar></TopBar>
      <Title />
      <SearchBox />
      <WhyChooseUsParent>
        <TextCard
          title={translations.convenienceTitle}
          description={translations.convenienceDescription}
        />
        <TextCard
          title={translations.qualityDownloadsTitle}
          description={translations.qualityDownloadsDescription}
          image={<DownloadIcon />}
        />

        <TextCard
          description={translations.safeAndSecureDescription}
          title={translations.safeAndSecureTitle}
        />

        <TextCard
          title={translations.SimplicityTitle}
          description={translations.simplicityDescription}
        />
      </WhyChooseUsParent>
    </>
  );
};

export default Home;

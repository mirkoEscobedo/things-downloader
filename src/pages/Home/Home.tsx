import SearchBox from "@/components/searchBox/SearchBox";
import Title from "@/components/title/Title";
import TopBar from "@/components/topBar/TopBar";
import QualityDownloads from "@/components/whyChooseUsElements/QualityDownloads";
import SafeAndSecure from "@/components/whyChooseUsElements/SafeAndSecure";
import Simplicity from "@/components/whyChooseUsElements/Simplicity";
import TextCard from "@/components/whyChooseUsElements/TextCard";
import WhyChooseUsParent from "@/components/whyChooseUsParent/WhyChooseUsParent";
import { useLanguage } from "@/hooks/LanguageContex";

const Home: React.FC = () => {
  const { translations } = useLanguage();
  return (
    <>
      <TopBar></TopBar>
      <Title />
      <SearchBox />
      <WhyChooseUsParent>
        <TextCard
          title={translations.convinieceTitle}
          description={translations.convinienceDescription}
        />
        <Simplicity />
        <SafeAndSecure />
        <QualityDownloads />
      </WhyChooseUsParent>
    </>
  );
};

export default Home;

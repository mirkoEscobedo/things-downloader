import CardGrid, { sampleData } from '@/components/card_grid/CardGrid';
import ConvenienceIcon from '@/components/convenienceIcon/ConvenienceIcon';
import SearchBox from '@/components/searchBox/SearchBox';
import ShieldIcon from '@/components/shieldIcon/ShieldIcon';
import SimplicityIcon from '@/components/simplicityIcon/SimplicityIcon';
import Title from '@/components/title/Title';
import TopBar from '@/components/topBar/TopBar';
import WhyChooseUsParent from '@/components/whyChooseUsParent/WhyChooseUsParent';
import { useLanguage } from '@/context/LanguageContex';
import DownloadIcon from '@/shared/components/downloadIcon/DownloadIcon';
import TextCard from '@/shared/components/textCard/TextCard';

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

        <TextCard
          title={translations.simplicityTitle}
          description={translations.simplicityDescription}
          image={<SimplicityIcon />}
        />
      </WhyChooseUsParent>
    </>
  );
};

export default Home;

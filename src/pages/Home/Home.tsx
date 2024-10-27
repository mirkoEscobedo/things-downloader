import SearchBox from '@/components/searchBox/SearchBox';
import Title from '@/components/title/Title';
import TopBar from '@/components/topBar/TopBar';
import Convenience from '@/components/whyChooseUsElements/Convenience';
import QualityDownloads from '@/components/whyChooseUsElements/QualityDownloads';
import SafeAndSecure from '@/components/whyChooseUsElements/SafeAndSecure';
import Simplicity from '@/components/whyChooseUsElements/Simplicity';
import WhyChooseUsParent from '@/components/whyChooseUsParent/WhyChooseUsParent';

const Home: React.FC = () => {
  return (
    <>
      <TopBar></TopBar>
      <Title />
      <SearchBox />
      <WhyChooseUsParent>
        <Convenience />
        <Simplicity />
        <SafeAndSecure />
        <QualityDownloads />
      </WhyChooseUsParent>
    </>
  );
};

export default Home;

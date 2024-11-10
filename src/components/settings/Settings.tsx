import { useLanguage } from '@/context/LanguageContex';
import GeneralButton from '@/shared/components/generalButton/GeneralButton';
import { DownloadIcon, TrashIcon } from 'lucide-react';
import React from 'react';
import EnLogo from '../en_logo/EnLogo';
import ItLogo from '../it_logo/ItLogo';

const Settings: React.FC = () => {
  const { translations, setLanguage, language } = useLanguage();
  function toggleLanguage() {
    setLanguage(language === 'en' ? 'it' : 'en');
  }
  return (
    <>
      <div className="grid grid-col-2 grid-rows-3 items-center gap-1">
        <div className="text-white  flex items-center justify-between">
          <h2 className="mr-2">{translations.settingsLanguage}</h2>
          <GeneralButton onClick={toggleLanguage}>
            <EnLogo
              style={language === 'en' ? { opacity: 1 } : { opacity: 0.5 }}
            ></EnLogo>
            <span className="mx-2">/</span>
            <ItLogo
              style={language === 'it' ? { opacity: 1 } : { opacity: 0.5 }}
            ></ItLogo>
          </GeneralButton>
        </div>
        <div className="text-white  flex items-center justify-between">
          <h2 className="mr-2">{translations.settingsExportData}</h2>
          <GeneralButton>
            <DownloadIcon></DownloadIcon>
          </GeneralButton>
        </div>
        <div className="text-white text-black flex items-center justify-between">
          <h2 className="mr-2">{translations.settingsDeleteData}</h2>
          <GeneralButton>
            <TrashIcon></TrashIcon>
          </GeneralButton>
        </div>
      </div>
    </>
  );
};
export default Settings;

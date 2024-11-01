import { useLanguage } from '@/context/LanguageContex';
import GeneralButton from '@/shared/components/generalButton/GeneralButton';
import { DownloadIcon, TrashIcon } from 'lucide-react';
import React from 'react';
import EnLogo from '../en_logo/EnLogo';
import ItLogo from '../it_logo/ItLogo';

const Settings: React.FC = () => {
  const { translations } = useLanguage();
  return (
    <>
      <div className="text-white text-black flex items-center mb-2">
        <h2 className="mr-2">{translations.settingsLanguage}</h2>
        <GeneralButton>
          <EnLogo></EnLogo>
          <span className="mx-2">/</span>
          <ItLogo></ItLogo>
        </GeneralButton>
      </div>
      <div className="text-white text-black flex items-center mb-2">
        <h2 className="mr-2">{translations.settingsExportData}</h2>
        <GeneralButton>
          <DownloadIcon></DownloadIcon>
        </GeneralButton>
      </div>
      <div className="text-white text-black flex items-center">
        <h2 className="mr-2">{translations.settingsDeleteData}</h2>
        <GeneralButton>
          <TrashIcon></TrashIcon>
        </GeneralButton>
      </div>
    </>
  );
};
export default Settings;

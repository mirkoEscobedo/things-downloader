import TransformingButton from '@/shared/components/transforming_button/TransformingButton';
import { useLanguage } from '@/context/LanguageContex';
import Settings from '../settings/Settings';
import { SettingsIcon } from 'lucide-react';

const TopBar: React.FC = () => {
  const { translations } = useLanguage();
  return (
    <>
      <div className="flex justify-end ">
        <TransformingButton
          card_children={<Settings></Settings>}
          button_children={
            <>
              <SettingsIcon className="mr-1"></SettingsIcon>
              {translations.settingsButton}
            </>
          }
        ></TransformingButton>
      </div>
    </>
  );
};
export default TopBar;

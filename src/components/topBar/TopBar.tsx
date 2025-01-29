import TransformingButton from "@/shared/components/transforming_button/TransformingButton";
import { SettingsIcon } from "lucide-react";
import Settings from "../settings/Settings";
import { useAppSelector } from "@/hooks/hooks";

const TopBar: React.FC = () => {
  const translations = useAppSelector((state) => state.language.translations);
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

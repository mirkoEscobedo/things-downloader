import { useDownloadHistory } from "@/context/DownloadHistoryContext";
import GeneralButton from "@/shared/components/generalButton/GeneralButton";
import {
  deleteDownloadHistory,
  downloadHistoryAsJson,
} from "@/utils/downloadHistory";
import { DownloadIcon, TrashIcon } from "lucide-react";
import React from "react";
import EnLogo from "../en_logo/EnLogo";
import ItLogo from "../it_logo/ItLogo";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { setLanguage } from "@/state/reducers/languageSlice";

const Settings: React.FC = () => {

  const language = useAppSelector((state) => state.language.language);
  const translations = useAppSelector((state) => state.language.translations);

  const dispatch = useAppDispatch();
  const { setDownloadHistory } = useDownloadHistory();

  function toggleLanguage() {
    dispatch(setLanguage(language === "en" ? "it" : "en"));
  }

  const handleExportData = () => {
    downloadHistoryAsJson();
  };

  const handleDeleteData = () => {
    deleteDownloadHistory();
    setDownloadHistory([]);
  };

  return (
    <>
      <div className="grid grid-col-2 grid-rows-3 items-center gap-1">
        <div className="text-white  flex items-center justify-between">
          <h2 className="mr-2">{translations.settingsLanguage}</h2>
          <GeneralButton onClick={toggleLanguage}>
            <EnLogo
              style={language === "en" ? { opacity: 1 } : { opacity: 0.5 }}
            ></EnLogo>
            <span className="mx-2">/</span>
            <ItLogo
              style={language === "it" ? { opacity: 1 } : { opacity: 0.5 }}
            ></ItLogo>
          </GeneralButton>
        </div>
        <div className="text-white  flex items-center justify-between">
          <h2 className="mr-2">{translations.settingsExportData}</h2>
          <GeneralButton onClick={handleExportData}>
            <DownloadIcon></DownloadIcon>
          </GeneralButton>
        </div>
        <div className="text-white text-black flex items-center justify-between">
          <h2 className="mr-2">{translations.settingsDeleteData}</h2>
          <GeneralButton onClick={handleDeleteData}>
            <TrashIcon></TrashIcon>
          </GeneralButton>
        </div>
      </div>
    </>
  );
};
export default Settings;

import { createContext, ReactNode, useContext, useState } from "react";
import en from "../utils/lang/en.json";
import it from "../utils/lang/it.json";

type Language = "en" | "it";

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  translations: { [key: string]: any };
}

const translationsMap = { en, it };
const LanguageContext = createContext<LanguageContextProps | undefined>(
  undefined
);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>("en");
  const value: LanguageContextProps = {
    language,
    setLanguage,
    translations: translationsMap[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextProps => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be use within the language provider");
  }
  return context;
};

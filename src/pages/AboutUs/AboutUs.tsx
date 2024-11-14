import { useLanguage } from "@/context/LanguageContex";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import "./About.css";

const AboutUs: React.FC = () => {
  const { translations } = useLanguage();
  return (
    <>
      <span id="linkSpan">
        <ArrowLeft size={35} color="blueviolet" />
        <Link className="linkR" to="/">
          {translations.backHomeLinkText}
        </Link>
      </span>

      <section>
        <div className="about">
          <h1>{translations.aboutUsTitle}</h1>
          <p>{translations.aboutUsP}</p>
          <h3>{translations.aboutUsHS}</h3>
          <h3>{translations.aboutUsHT}</h3>
          <h3>{translations.aboutUs}</h3>
        </div>
      </section>
    </>
  );
};

export default AboutUs;

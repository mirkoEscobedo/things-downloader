import { useLanguage } from "@/context/LanguageContex";
import { Link } from "react-router-dom";
import "./footer.css";

const Footer: React.FC = () => {
  const { translations } = useLanguage();
  return (
    <footer>
      <h2>
        <Link to="/about">{translations.linkAboutTitle}</Link>
      </h2>
      <h2>
        <Link to="/contact">{translations.linkContactTitle}</Link>
      </h2>

      <h2>
        <Link to="/privacy">{translations.linkPrivacyTitle}</Link>
      </h2>
    </footer>
  );
};

export default Footer;

import { Link } from "react-router-dom";
import "./footer.css";
import { useAppSelector } from "@/hooks/hooks";

const Footer: React.FC = () => {
  const translations = useAppSelector((state) => state.language.translations);
  return (
    <footer className="  mb-4 mt-80">
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

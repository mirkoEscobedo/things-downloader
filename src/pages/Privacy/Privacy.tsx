import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import "./Privacy.css";
import { useAppSelector } from "@/hooks/hooks";

const Privacy: React.FC = () => {
  const translations = useAppSelector((state) => state.language.translations);
  return (
    <>
      <div>
        <span id="linkSpan">
          <ArrowLeft size={35} color="blueviolet" />
          <Link className="linkR" to="/">
            {translations.backHomeLinkText}
          </Link>
        </span>
      </div>

      <section>
        <div>
          <h2>{translations.privacyH2Inf}</h2>
          <p>{translations.privacyPInf}</p>
        </div>

        <div>
          <h2>{translations.privacyHowH2}</h2>
          <p>{translations.privacyHowP}</p>

          <ol>
            <li>{translations.privacyLi1}</li>
            <li>{translations.privacyLi2}</li>
            <li>{translations.privacyLi3}</li>
            <li>{translations.privacyLi4}</li>
            <li>{translations.privacyLi5}</li>
            <li>{translations.privacyLi6}</li>
            <li>{translations.privacyLi7}</li>
            <li>{translations.privacyLi8}</li>
          </ol>
        </div>

        <div>
          <h2>{translations.privacySh2}</h2>
          <p>{translations.privacySP}</p>
          <ol>
            <li>{translations.privacySLi1}</li>

            <li>{translations.privacySLi2}</li>

            <li>{translations.privacySLi3}</li>
            <li>{translations.privacySLi4}</li>
          </ol>
        </div>

        <div>
          <h2>{translations.privacySecH2}</h2>
          <p>{translations.privacySecP}</p>
        </div>

        <div>
          <h2>{translations.privacyRightsH2}</h2>
          <p>{translations.privacyRightsP}</p>
        </div>
      </section>
    </>
  );
};

export default Privacy;

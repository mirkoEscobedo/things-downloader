import { useLanguage } from "@/context/LanguageContext";
import "./WhyChooseUsParent.css";
type WhyChooseUsParentProps = {
  children: React.ReactNode;
  className?: string;
}; //sto dichiarando il tipo

const WhyChooseUsParent: React.FC<WhyChooseUsParentProps> = ({
  children,
  className,
}) => {
  const { translations } = useLanguage();
  return (
    <>
      <h2 id="whyHeading" className={`${className}`}>
        {translations.whyUsText}
      </h2>
      <section className={`md:grid-cols-2 lg:grid-cols-3 ${className}`}>
        {children}
      </section>
    </>
  );
};

export default WhyChooseUsParent;

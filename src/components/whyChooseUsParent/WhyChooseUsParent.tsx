import "./WhyChooseUsParent.css";
import { useAppSelector } from "@/hooks/hooks";
type WhyChooseUsParentProps = {
  children: React.ReactNode;
  className?: string;
}; //sto dichiarando il tipo

const WhyChooseUsParent: React.FC<WhyChooseUsParentProps> = ({
  children,
  className,
}) => {
  const translations = useAppSelector((state) => state.language.translations);
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

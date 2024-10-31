import "./WhyChooseUsParent.css";
type WhyChooseUsParentProps = {
  children: React.ReactNode;
}; //sto dichiarando il tipo

const WhyChooseUsParent: React.FC<WhyChooseUsParentProps> = ({ children }) => {
  return (
    <>
      <h2 id="whyHeading" className="bg-transparent">
        Why Choose Us?
      </h2>
      <section className="md:grid-cols-2 lg:grid-cols-3 bg-transparent">
        {children}
      </section>
    </>
  );
};

export default WhyChooseUsParent;

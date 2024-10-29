import { ReactNode } from "react";
import "./WhyChooseUsElements.css";
interface TextCardProps {
  title: string;
  description: string;
  image?: ReactNode;
}

const TextCard: React.FC<TextCardProps> = ({ title, description, image }) => {
  return (
    <div id="topman" className="rela">
      <h3 className="">
        {image}
        {title}
      </h3>
      <p className=" ">{description}</p>
    </div>
  );
};

export default TextCard;

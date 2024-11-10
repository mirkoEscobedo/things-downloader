import { Link } from "react-router-dom";
import "./footer.css";

const Footer: React.FC = () => {
  return (
    <footer>
      <h2>
        <Link to="/about">About</Link>
      </h2>
      <h2>
        <Link to="/contact">Contact</Link>
      </h2>

      <h2>
        <Link to="/privacy">Privacy</Link>
      </h2>
    </footer>
  );
};

export default Footer;

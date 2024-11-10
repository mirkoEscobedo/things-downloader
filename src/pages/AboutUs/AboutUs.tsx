import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import "./About.css";

const AboutUs: React.FC = () => {
  return (
    <>
      <span id="linkSpan">
        <ArrowLeft size={35} color="blueviolet" />
        <Link className="linkR" to="/">
          Go Back To Home Page
        </Link>
      </span>

      <section>
        <div className="about">
          <h1>About Us</h1>
          <p>
            Welcome to things downloader, your number one source for all things
            downloadable. We’re dedicated to providing you the very best of
            digital content, with an emphasis on quality, reliability, and user
            experience. Founded in 2024 by Team1, Things Downloader has come a
            long way from its beginnings in Italy. When things downloader first
            started out, their passion for making digital content easily
            accessible drove them to start their own business. We hope you enjoy
            our app as much as we enjoy offering it to you. If you have any
            questions or comments, please don’t hesitate to contact us.
          </p>
          <h3>Sincerely,</h3>
          <h3>Team1s</h3>
          <h3>Founder & CEO</h3>
        </div>
      </section>
    </>
  );
};

export default AboutUs;

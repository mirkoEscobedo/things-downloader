import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import "./Privacy.css";

const Privacy: React.FC = () => {
  return (
    <>
      <div>
        <span id="linkSpan">
          <ArrowLeft size={35} color="blueviolet" />
          <Link className="linkR" to="/">
            Go Back To Home Page
          </Link>
        </span>
      </div>

      <section>
        <div>
          <h2>Information We Collect</h2>
          <p>
            We collect personal information that you voluntarily provide to us
            when you register on the app, express an interest in obtaining
            information about us or our products and services, when you
            participate in activities on the app, or otherwise when you contact
            us.
          </p>
        </div>

        <div>
          <h2>How We Use Your Information</h2>
          <p>
            We use personal information collected via our app for a variety of
            business purposes described below. We process your personal
            information for these purposes in reliance on our legitimate
            business interests, in order to enter into or perform a contract
            with you, with your consent, and/or for compliance with our legal
            obligations. We use the information we collect or receive:
          </p>

          <ol>
            <li>To send administrative information to you.</li>
            <li>To fulfill and manage your orders.</li>
            <li>To request feedback.</li>
            <li>To protect our services.</li>
            <li>To enforce our terms, conditions, and policies.</li>
            <li>To respond to legal requests and prevent harm.</li>
            <li>To deliver and facilitate delivery of services to the user.</li>
            <li>To respond to user inquiries/offer support to users.</li>
          </ol>
        </div>

        <div>
          <h2>Sharing Your Information</h2>
          <p>
            We only share information with your consent, to comply with laws, to
            provide you with services, to protect your rights, or to fulfill
            business obligations. We may process or share your data that we hold
            based on the following legal basis:
          </p>
          <ol>
            <li>
              Consent: We may process your data if you have given us specific
              consent to use your personal information for a specific purpose.
            </li>

            <li>
              Legitimate Interests: We may process your data when it is
              reasonably necessary to achieve our legitimate business interests.
            </li>

            <li>
              Legal Obligations: We may disclose your information where we are
              legally required to do so in order to comply with applicable law,
              governmental requests, a judicial proceeding, court order, or
              legal process, such as in response to a court order or a subpoena
              (including in response to public authorities to meet national
              security or law enforcement requirements).
            </li>
            <li>
              Vital Interests: We may disclose your information where we believe
              it is necessary to investigate, prevent, or take action regarding
              potential violations of our policies, suspected fraud, situations
              involving potential threats to the safety of any person and
              illegal activities, or as evidence in litigation in which we are
              involved.
            </li>
          </ol>
        </div>

        <div>
          <h2>Security of Your Information</h2>
          <p>
            We use administrative, technical, and physical security measures to
            help protect your personal information. While we have taken
            reasonable steps to secure the personal information you provide to
            us, please be aware that despite our efforts, no security measures
            are perfect or impenetrable, and no method of data transmission can
            be guaranteed against any interception or other type of misuse.
          </p>
        </div>

        <div>
          <h2>Your Privacy Rights</h2>
          <p>
            In some regions (like the European Economic Area), you have certain
            rights under applicable data protection laws. These may include the
            right (i) to request access and obtain a copy of your personal
            information, (ii) to request rectification or erasure; (iii) to
            restrict the processing of your personal information; and (iv) if
            applicable, to data portability. In certain circumstances, you may
            also have the right to object to the processing of your personal
            information. To make such a request, please use the contact details
            provided below. We will consider and act upon any request in
            accordance with applicable data protection laws.
          </p>
        </div>
      </section>
    </>
  );
};

export default Privacy;

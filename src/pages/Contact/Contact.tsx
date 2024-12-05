import ShineBorder from '@/components/ui/shine-border';
import { useLanguage } from '@/context/LanguageContext';
import GeneralButton from '@/shared/components/generalButton/GeneralButton';
import { ArrowLeft } from 'lucide-react';
import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Link } from 'react-router-dom';
import './Contact.css';

const Contact: React.FC = () => {
  const { translations } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form data submitted:', formData);
  };

  const inputRefContact = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    inputRefContact.current?.focus();
  }, []);

  return (
    <>
      <span id="linkSpan">
        <ArrowLeft size={35} color="blueviolet" />
        <Link className="linkR" to="/">
          {translations.backHomeLinkText}
        </Link>
      </span>
      <div className="contact-page">
        <h1>{translations.contactUsTitle}</h1>
        <form onSubmit={handleSubmit} className="flex flex-col justify-center">
          <div className="nameDiv">
            {/* <label htmlFor="name">{translations.contactUsInputName}</label> */}

            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="   Name"
              required
            />
          </div>

          <div className="emailDiv ">
            {/* <label htmlFor="email">{translations.contactUsInputEmail}</label> */}
            <input
              type="email"
              id="email"
              name="email"
              placeholder="   Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div
            className={`messageDiv flex justify-center  w-full max-w-full md:max-w-xl lg:max-w-2xl mx-auto px-4 `}
          >
            {/*<label htmlFor="message">
              {translations.contactUsInputMessage}
            </label>*/}
            <ShineBorder
              className="z-1 message p-0 flex"
              color={['#A07CFE', '#FE8FB5', '#FFBE7B']}
              borderWidth={4}
            >
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="z-10 flex-1 px-4 py-2 text-lg outline-none bg-transparent"
                ref={inputRefContact}
                placeholder="Message"
              />
            </ShineBorder>
          </div>

          <GeneralButton>
            <span className="text-white">{translations.contactSubmitText}</span>
          </GeneralButton>
        </form>
      </div>
    </>
  );
};

export default Contact;

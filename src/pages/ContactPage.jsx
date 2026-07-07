import ContactSection from '../sections/ContactSection';
import usePageTitle from '../hooks/usePageTitle';

const ContactPage = () => {
  usePageTitle('Contact — Ranbeer Chaudhary');
  return (
    <div className="page">
      <ContactSection />
    </div>
  );
};

export default ContactPage;

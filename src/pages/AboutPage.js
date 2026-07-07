import AboutMe from '../sections/AboutMe';
import CommissionBand from '../sections/CommissionBand';
import ContactSection from '../sections/ContactSection';
import usePageTitle from '../hooks/usePageTitle';

const AboutPage = () => {
  usePageTitle('About — Ranbeer Chaudhary');
  return (
    <div className="page">
      <AboutMe />
      <CommissionBand />
      <ContactSection />
    </div>
  );
};

export default AboutPage;

import './AboutPage.css'; 
import AboutMe from '../Sections/AboutMe';
import Contact from '../Sections/Contact';

const AboutPage = () => {
  return (
    <div className="page">
      <AboutMe />
      <Contact />
    </div>
  );
}

export default AboutPage;

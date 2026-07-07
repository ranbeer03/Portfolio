import { useParams } from 'react-router-dom';
import { LEGAL_DOCUMENTS } from '../data/legalContent';
import usePageTitle from '../hooks/usePageTitle';
import NotFoundPage from './NotFoundPage';
import './LegalPage.css';

const LegalPage = () => {
  const { slug } = useParams();
  const document = LEGAL_DOCUMENTS[slug];
  usePageTitle(document ? `${document.title} — Ranbeer Chaudhary` : undefined);

  if (!document) return <NotFoundPage />;

  return (
    <div className="page legal-page">
      <div className="legal-inner">
        <p className="eyebrow">Last updated {document.updated}</p>
        <h1 className="page-header">{document.title}</h1>
        {document.sections.map(({ heading, body }) => (
          <section key={heading} className="legal-section">
            <h2 className="legal-heading">{heading}</h2>
            <p>{body}</p>
          </section>
        ))}
      </div>
    </div>
  );
};

export default LegalPage;

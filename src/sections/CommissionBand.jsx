import './CommissionBand.css';
import { CONTACT_EMAIL } from '../config';

const COMMISSION_EMAIL_SUBJECT = 'Interested in a Commissioned Piece';
const COMMISSION_EMAIL_BODY = `Hi Ranbeer,\n\nI would like to discuss an idea for a commissioned piece. Could you please get in touch with me?\n\nCommission details (optional):\n[Size, theme, colors, and any specific elements you want in the painting]\n\nBest regards,\n[Your Name]`;

const openCommissionEmail = () => {
  const subject = encodeURIComponent(COMMISSION_EMAIL_SUBJECT);
  const body = encodeURIComponent(COMMISSION_EMAIL_BODY);
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
};

/** Full-width dark call-to-action band for commissions. */
const CommissionBand = () => {
  return (
    <section className="commission-band">
      <div className="commission-inner">
        <div>
          <p className="eyebrow">Commissions</p>
          <h2 className="commission-title">
            A painting that exists for no one else
          </h2>
          <p className="commission-copy">
            From one-of-a-kind canvases to limited giclée prints — share the
            size, theme, and colors you have in mind, and we will shape it
            together.
          </p>
        </div>
        <button className="btn btn-inverse" onClick={openCommissionEmail}>
          Commission Your Piece
        </button>
      </div>
    </section>
  );
};

export default CommissionBand;

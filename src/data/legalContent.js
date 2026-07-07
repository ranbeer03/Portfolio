/**
 * Content for the legal pages. Review before launch and replace the
 * [bracketed placeholders] with your real details.
 */
export const LEGAL_DOCUMENTS = {
  privacy: {
    title: 'Privacy Policy',
    updated: 'July 2026',
    sections: [
      {
        heading: 'Who we are',
        body: 'This website is operated by Ranbeer Chaudhary ("we", "I"), an independent artist based in Geneva, Switzerland. For any privacy question, contact ranbeerchaudhary03@gmail.com.',
      },
      {
        heading: 'What we collect',
        body: 'We collect only what you give us: contact-form messages (name, email, message), order details (name, email, phone, shipping address, items), and account credentials if you create an account. Data is stored securely with Supabase (our database and authentication provider).',
      },
      {
        heading: 'How we use it',
        body: 'Your data is used solely to respond to inquiries, fulfil orders, and manage your account. We do not sell or share your data with third parties, and we do not run advertising or tracking cookies.',
      },
      {
        heading: 'Your rights',
        body: 'You can request a copy of your data or its deletion at any time by emailing ranbeerchaudhary03@gmail.com. Account holders can also ask for their account to be removed.',
      },
    ],
  },
  terms: {
    title: 'Terms of Sale',
    updated: 'July 2026',
    sections: [
      {
        heading: 'Orders',
        body: 'Placing an order through the cart is a purchase request — no payment is taken online. I confirm availability and send secure payment instructions by email within 24 hours. An order is binding only once payment is confirmed.',
      },
      {
        heading: 'Prices',
        body: 'All prices are in British Pounds (GBP) and include the artwork as described (framed or unframed, as selected). Delivery is charged at a flat rate shown at checkout. Prices may change, but confirmed orders keep their agreed price.',
      },
      {
        heading: 'Originals and prints',
        body: 'Original paintings are unique — one per artwork. Prints are produced in limited quantities per size. Minor colour variation between screen and physical artwork is natural and not a defect.',
      },
      {
        heading: 'Copyright',
        body: 'All artworks and images on this site are © Ranbeer Chaudhary. Purchase of an artwork or print does not transfer copyright or reproduction rights.',
      },
    ],
  },
  'shipping-returns': {
    title: 'Shipping & Returns',
    updated: 'July 2026',
    sections: [
      {
        heading: 'Shipping',
        body: 'Artworks ship worldwide at a flat delivery rate shown at checkout. Prints are dispatched within [X] working days; originals within [X] working days, packed professionally. You will receive tracking details by email once dispatched.',
      },
      {
        heading: 'Returns — prints',
        body: 'Prints can be returned within 14 days of delivery in their original condition and packaging. Return shipping is at your cost; the print price is refunded once received.',
      },
      {
        heading: 'Returns — originals',
        body: 'Original paintings are sold as final sale. If an original arrives damaged, contact me within 48 hours of delivery with photos and I will arrange a repair, replacement where possible, or refund.',
      },
      {
        heading: 'Damaged in transit',
        body: 'Every parcel is insured. If anything arrives damaged, email ranbeerchaudhary03@gmail.com within 48 hours with photos of the artwork and packaging so I can raise the claim and make it right.',
      },
    ],
  },
};

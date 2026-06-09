// Centralised contact configuration — change in one place to retarget every CTA
export const CONTACT_EMAIL = 'sainiharsimar@gmail.com';

const SUBJECT = 'I’d love a website like Maison';
const BODY = `Hi,

I came across your site and I’d love something similar built for my brand.

A few details:
• Brand name:
• What I sell:
• Timeline:
• Budget range:

Could we set up a call?

Thanks!`;

export const MAILTO_URL =
  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(SUBJECT)}&body=${encodeURIComponent(BODY)}`;

export function mailtoFor(subject: string, body?: string) {
  const b = body ?? BODY;
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(b)}`;
}

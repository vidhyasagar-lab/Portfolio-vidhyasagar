/**
 * Single source of truth for identity. Swap these values once and the
 * whole site updates. Placeholders are marked — replace before launch.
 */
export const site = {
  name: 'Vidhyasagar K',            // TODO: confirm display name
  role: 'AI Engineer',
  blurb:
    'I build retrieval and evaluation systems for language models — the unglamorous layer that decides whether an AI product is trustworthy or just demoable.',
  location: 'India',
  email: 'hello@example.com',        // TODO: confirm public contact address
  github: 'https://github.com/',     // TODO
  linkedin: 'https://linkedin.com/in/', // TODO
  /** Shown in the hero as a small availability line. */
  status: 'Open to AI engineering roles',
} as const;

export const nav = [
  { href: '/#work', label: 'Work' },
  { href: '/#approach', label: 'Approach' },
  { href: '/#contact', label: 'Contact' },
] as const;

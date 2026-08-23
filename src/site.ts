/**
 * Identity. Sourced from the resume — deliberately excluding the phone number,
 * which stays off a public page regardless of what the CV contains.
 */
export const site = {
  /** Short form, used in the nav mark. */
  name: 'Vidhya Sagar',
  /** Full form, used in page titles and the footer. */
  fullName: 'Kokirala Vidhya Sagar',
  role: 'AI Engineer',
  blurb:
    'Four years building multi-agent systems and fine-tuned language models for enterprise quality engineering — including small language models deployed on customers’ own secured hardware, where calling a hosted API was never an option.',
  location: 'India',
  email: 'vidhyasagar54321@gmail.com',
  github: 'https://github.com/vidhyasagar-lab',
  linkedin: 'https://www.linkedin.com/in/kokirala-vidhyasagar',
  status: 'Open to AI engineering roles',
} as const;

/** Public CV. Drop the file at public/cv.pdf; nothing else references it. */
export const cv = '/cv.pdf';

/** Professional summary — the "first seven seconds" block on the CV page. */
export const summary =
  'Around four years building and deploying AI applications — multi-agent systems, fine-tuned language models, and the APIs and pipelines around them. Most of that work has shipped inside customer environments rather than on hosted infrastructure, which shapes how I choose models: the largest one is rarely the deployable one.';

/** Grouped so the left edge of the table is scannable in an F-pattern. */
export const skills = [
  { group: 'Languages', items: ['Python'] },
  { group: 'AI & LLM', items: ['LangGraph', 'Azure OpenAI', 'AWS Bedrock', 'GCP Gemini', 'Llama', 'Qwen', 'Gemma', 'Hugging Face'] },
  { group: 'Model tuning', items: ['LoRA', 'QLoRA', 'SLM on-prem deployment', 'Domain fine-tuning'] },
  { group: 'Frameworks', items: ['Django', 'FastAPI', 'Flask'] },
  { group: 'Data', items: ['PostgreSQL', 'Redis', 'Vector stores'] },
  { group: 'Cloud', items: ['Azure', 'AWS'] },
  { group: 'Platform', items: ['Docker', 'Git', 'Linux', 'REST APIs', 'CI/CD'] },
  { group: 'Web', items: ['HTML', 'CSS', 'JavaScript'] },
] as const;

export const certifications = [
  { body: 'Microsoft Azure', items: ['AZ-900 Fundamentals', 'AI-900 AI Fundamentals', 'AI-102 AI Engineer Associate'] },
  { body: 'Amazon Web Services', items: ['Cloud Practitioner', 'AI Practitioner'] },
] as const;

export const recognition = [
  'Employee of the Quarter',
  'Innovation Award',
  'Spot Recognition — test automation',
  'Spot Recognition — solution delivery',
] as const;

export const education = [
  { award: 'MCA, Computer Science', place: 'University of Madras', detail: '75.7%' },
  { award: 'BSc, Computer Science', place: 'AP Residential Degree College', detail: '62%' },
] as const;

export const nav = [
  { href: '/experience', label: 'Experience' },
  { href: '/#work', label: 'Work' },
  { href: '/#contact', label: 'Contact' },
] as const;

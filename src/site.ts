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
    'Four years building production Generative AI — RAG chatbots, multi-agent workflows and LLM evaluation pipelines. Currently building AI products for LMS platforms at Red Nucleus; before that, IQE, a node-based test automation platform, and an eight-agent QA framework that automated up to 80% of manual validation.',
  location: 'Hyderabad, India',
  email: 'vidhyasagar54321@gmail.com',
  github: 'https://github.com/vidhyasagar-lab',
  linkedin: 'https://www.linkedin.com/in/kokirala-vidhyasagar',
  /** Eyebrow above the hero. Deliberately states the specialism, not
      availability: the site gets shared with colleagues, not only recruiters. */
  status: 'RAG · Multi-agent systems · LLM evaluation',
} as const;

/**
 * The downloadable CV, served verbatim from the resume export. Replace
 * public/cv.pdf on every resume update — /experience is maintained separately
 * in this file, so the two can drift if only one is touched.
 */
export const cv = '/cv.pdf';

/** What the file is called once it lands in someone's Downloads folder. */
export const cvFilename = 'Vidhyasagar_Resume_AI_Engineer.pdf';

/** Professional summary — the "first seven seconds" block on the CV page. */
export const summary =
  'Four years building production Generative AI systems — RAG chatbots, multi-agent workflows, LLM evaluation pipelines and the APIs around them. Most recently IQE, a node-based test automation platform where QA teams compose AI agents on a canvas, and an eight-agent QA framework. Much of that work has shipped inside customer environments rather than on hosted infrastructure, which shapes how I choose models: the largest one is rarely the deployable one. Microsoft Certified Azure AI Engineer Associate.';

/**
 * Grouped so the left edge of the table is scannable in an F-pattern.
 * Groups mirror the resume's, deliberately: a recruiter often has both open,
 * and two different taxonomies of the same skills reads as two people.
 */
export const skills = [
  { group: 'AI frameworks & tools', items: ['LangGraph', 'LangChain', 'CrewAI', 'Microsoft Agent Framework', 'Letta', 'n8n', 'Hugging Face'] },
  { group: 'AI techniques', items: ['RAG', 'Multi-agent systems', 'Human-in-the-loop', 'Prompt engineering', 'Fine-tuning (LoRA, QLoRA)'] },
  { group: 'LLMs & platforms', items: ['Azure OpenAI', 'OpenAI', 'Claude', 'AWS Bedrock', 'Gemini', 'Llama', 'Qwen', 'Gemma'] },
  { group: 'Evaluation & observability', items: ['LLM evaluation', 'RAGAS', 'DeepEval', 'Langfuse'] },
  { group: 'Languages & frameworks', items: ['Python', 'SQL', 'FastAPI', 'Django', 'Flask', 'JavaScript', 'HTML', 'CSS'] },
  { group: 'Data & infrastructure', items: ['PostgreSQL', 'pgvector', 'Redis', 'Docker', 'Git', 'CI/CD', 'Linux', 'Azure', 'AWS'] },
] as const;

/** AI-102 leads: it is the associate-level one, and the only one that is
    evidence rather than familiarity. */
export const certifications = [
  { body: 'Microsoft Azure', items: ['AI-102 AI Engineer Associate', 'AI-900 AI Fundamentals', 'AZ-900 Fundamentals'] },
  { body: 'Amazon Web Services', items: ['AI Practitioner', 'Cloud Practitioner'] },
] as const;

export const recognition = [
  'Employee of the Quarter',
  'Innovation Award',
  'Spot Recognition — test automation',
  'Spot Recognition — solution delivery',
  'Customer Demo Recognition',
] as const;

/**
 * No percentages. The updated resume dropped them, and four years of shipped
 * production systems is the stronger evidence — a grade next to that invites
 * a comparison that helps nobody. `detail` is optional for the same reason.
 */
export const education = [
  { award: 'MCA, Computer Applications', place: 'University of Madras (Distance Education)' },
  { award: 'BSc, Computer Science', place: 'Andhra Pradesh Residential Degree College' },
] as const;

/**
 * `match` is the path prefix that makes an item the current one, and it is
 * separate from `href` because two of these links point at sections of the
 * home page rather than at pages. Work is the case in point: its href is
 * `/#work`, but a reader is "in" Work while reading any `/work/<slug>` case
 * study, which is exactly when the nav should say so. Contact has no match
 * because it is a section and nothing else — there is no page to be on.
 */
export const nav: ReadonlyArray<{ href: string; label: string; match?: string }> = [
  { href: '/experience', label: 'Experience', match: '/experience' },
  { href: '/#work', label: 'Work', match: '/work' },
  { href: '/#contact', label: 'Contact' },
];

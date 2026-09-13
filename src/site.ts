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
    'Four years building production Generative AI — RAG chatbots, multi-agent workflows and LLM evaluation pipelines. Currently building AI products for LMS platforms at Red Nucleus; before that, an eight-agent QA framework that automated up to 80% of manual validation, and small language models fine-tuned onto customers’ own secured hardware.',
  location: 'Hyderabad, India',
  email: 'vidhyasagar54321@gmail.com',
  github: 'https://github.com/vidhyasagar-lab',
  linkedin: 'https://www.linkedin.com/in/kokirala-vidhyasagar',
  status: 'Open to AI engineering roles',
} as const;

/** Public CV. Drop the file at public/cv.pdf; nothing else references it. */
export const cv = '/cv.pdf';

/** Professional summary — the "first seven seconds" block on the CV page. */
export const summary =
  'Four years building production Generative AI systems — RAG chatbots, multi-agent workflows, LLM evaluation pipelines and the APIs around them. Much of that work has shipped inside customer environments rather than on hosted infrastructure, which shapes how I choose models: the largest one is rarely the deployable one. Microsoft Certified Azure AI Engineer Associate.';

/** Grouped so the left edge of the table is scannable in an F-pattern. */
export const skills = [
  { group: 'Generative AI', items: ['RAG', 'Prompt engineering', 'Text-to-SQL', 'LLM evaluation', 'Fine-tuning (LoRA, QLoRA)'] },
  { group: 'Agentic AI', items: ['LangGraph', 'Letta', 'Multi-agent systems', 'Agent memory & state'] },
  { group: 'LLMs & platforms', items: ['Azure OpenAI', 'AWS Bedrock', 'Google Gemini', 'Llama', 'Qwen', 'Gemma', 'Hugging Face'] },
  { group: 'Eval & observability', items: ['RAGAS', 'DeepEval', 'Langfuse'] },
  { group: 'Languages', items: ['Python', 'SQL', 'JavaScript', 'HTML', 'CSS'] },
  { group: 'Frameworks', items: ['FastAPI', 'Django', 'Flask', 'REST APIs'] },
  { group: 'Data & infra', items: ['PostgreSQL', 'Redis', 'Vector databases', 'Docker', 'Git', 'CI/CD', 'Linux', 'Azure', 'AWS'] },
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
  'Customer Demo Recognition',
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

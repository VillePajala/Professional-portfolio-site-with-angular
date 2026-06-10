import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';

interface TimelineEntry {
  period: string;
  org: string;
  title: string;
  tag: string;
  icon: string;
  highlights: string[];
  tech: string[];
  open: boolean;
}

interface SkillItem {
  skill: string;
  years: number;
  level: number; // 1–4
  note?: string;
}

interface SkillCategory {
  category: string;
  items: SkillItem[];
}

interface Cert {
  name: string;
  issuer: string;
  date: string;
}

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css'],
})
export class CvComponent implements OnInit, AfterViewInit, OnDestroy {
  readonly levelLabels: { [level: number]: string } = {
    1: 'Beginner',
    2: 'Experienced',
    3: 'Advanced',
    4: 'Expert',
  };

  timeline: TimelineEntry[] = [
    {
      period: '05/2026 – present',
      org: 'CGI · Enterprise client',
      title: 'AI & Automation Consultant — Agentic Reporting on Azure',
      tag: 'AI Engineering',
      icon: 'fas fa-brain',
      highlights: [
        'Developer on a Microsoft Azure Accelerate proof-of-value building an agentic management reporting solution on Azure',
        'Implementing automated report generation orchestrated with Azure Durable Functions',
        'Working with a senior architect on solution design while owning hands-on build and delivery',
      ],
      tech: ['Azure Durable Functions', 'Azure OpenAI', 'Azure AI Search', 'IaC'],
      open: true,
    },
    {
      period: '09/2024 – 03/2026',
      org: 'CGI · Telecommunications client',
      title: 'AI & Automation Consultant — RPA and Agentic Automation',
      tag: 'Agentic Automation',
      icon: 'fas fa-robot',
      highlights: [
        'Designed and developed end-to-end agentic processes with UiPath Maestro, integrating RPA, AI agents, and human decision points into unified workflows',
        'Worked directly with the UiPath product team on Maestro implementation and provided feedback on the platform',
        'Developed and optimized the client’s internal automation processes using UiPath Studio and Orchestrator',
        'Achieved client satisfaction score of 9.6/10',
      ],
      tech: ['UiPath Studio', 'UiPath Orchestrator', 'UiPath Maestro', 'UiPath Agent Builder', 'AI Agents'],
      open: false,
    },
    {
      period: '09/2024 – present',
      org: 'CGI Internal',
      title: 'ChatGPT Ambassador (SME) & Ongoing AI Development',
      tag: 'AI Enablement',
      icon: 'fas fa-comments',
      highlights: [
        'Go-to person within CGI for questions about ChatGPT usage and best practices',
        'Completed the Azure AI Engineer learning path',
        'Peer-mentoring program: building with open-source agentic systems',
        'Part of the Google Antigravity agentic-coding early-access investigation group',
      ],
      tech: ['ChatGPT', 'Azure AI Services', 'OpenClaw.ai', 'Vercel V0'],
      open: false,
    },
    {
      period: 'Live on Google Play',
      org: 'Independent product',
      title: 'MatchOps — Soccer & Futsal Coaching App',
      tag: 'Indie Product',
      icon: 'fas fa-rocket',
      highlights: [
        '4,500+ automated tests (Jest + React Testing Library)',
        'Dual-mode architecture: offline-first IndexedDB with optional Supabase cloud sync and custom conflict resolution',
        'Complete PWA: custom service worker, install prompts, full offline support',
        'Built end to end with AI-assisted development (Cursor IDE, Claude Code)',
        'Internationalization (English/Finnish), Sentry error monitoring, Excel export',
      ],
      tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'PostgreSQL', 'IndexedDB', 'Jest', 'Vercel'],
      open: false,
    },
    {
      period: '09/2019 – 09/2024',
      org: 'Efima Oy · Helsinki',
      title: 'IA & RPA Developer',
      tag: 'Automation',
      icon: 'fas fa-cogs',
      highlights: [
        'Designed and deployed automation solutions for clients in food & beverage, education, and finance over 5 years',
        'Sole responsible developer for a major education-sector client for 2+ years, contributing to consistent NPS scores of 9–10',
        'Pioneered AI integration in RPA: designed and built the team’s first solutions using the OpenAI API inside UiPath processes',
        'Built reusable UiPath libraries adopted team-wide as development patterns',
        'Drove adoption of ChatGPT within the development team: documentation, a workshop, and practical usage examples',
      ],
      tech: ['UiPath Studio', 'UiPath Orchestrator', 'OpenAI API', 'Azure', 'VB.NET', 'Python', 'REST APIs'],
      open: false,
    },
    {
      period: '2017 – 2021',
      org: 'Xamk — South-Eastern Finland University of Applied Sciences',
      title: 'BBA, Computer & Information Sciences',
      tag: 'Education',
      icon: 'fas fa-graduation-cap',
      highlights: [
        'Full-stack development: Node.js, Express.js, Angular, Ionic, MySQL',
        'Full Stack Open 2019 (University of Helsinki): React, Redux, Node.js, MongoDB, GraphQL, TypeScript',
        'Game development (Unity 3D, C#), 3D modelling, service design',
      ],
      tech: ['Node.js', 'Angular', 'React', 'Unity3D'],
      open: false,
    },
    {
      period: '2009 – 2012',
      org: 'Taoist Neijing School Finland',
      title: 'Therapist, Traditional Chinese Medicine',
      tag: 'The Healing Years',
      icon: 'fas fa-spa',
      highlights: [
        'Trained as a TCM therapist — acupuncture and Chinese medicine',
        'Systems thinking of a different kind: reading the whole pattern, treating the root cause',
      ],
      tech: [],
      open: false,
    },
    {
      period: '2000 – 2011',
      org: 'Saimaa University of Applied Sciences',
      title: 'Master of Fine Art · BA in Printmaking',
      tag: 'The Art Years',
      icon: 'fas fa-pen-nib',
      highlights: [
        'Master of Fine Art (2009 – 2011); BA in Printmaking (2000 – 2004) with specialization studies in printmaking',
        'Produced an art exhibition in Berlin: funding, budget, marketing, transport, and build',
        'Fifteen years of ink work as “Johannes Kamikaze” — the foundation for everything since',
      ],
      tech: [],
      open: false,
    },
  ];

  skillCategories: SkillCategory[] = [
    {
      category: 'AI & Generative AI',
      items: [
        { skill: 'Prompt engineering', years: 3, level: 4 },
        { skill: 'AI-assisted & agentic development (Cursor, Claude Code, Codex, Gemini CLI)', years: 1, level: 4 },
        { skill: 'Agentic orchestration — UiPath Maestro', years: 1, level: 3 },
        { skill: 'Agentic orchestration — Azure AI Agent Service', years: 1, level: 2 },
        { skill: 'Agentic orchestration — CrewAI', years: 1, level: 2 },
        { skill: 'LLM integration (OpenAI API, Azure OpenAI)', years: 2, level: 2 },
        { skill: 'Azure AI Services (Language, Vision, Content Safety, Speech, Agents)', years: 1, level: 2 },
        { skill: 'Deep learning fundamentals (PyTorch)', years: 2, level: 1, note: 'Theoretical understanding from coursework' },
      ],
    },
    {
      category: 'Technical Skills',
      items: [
        { skill: 'UiPath (Studio, Orchestrator, Maestro, Agent Builder)', years: 6, level: 4 },
        { skill: 'AI-Assisted Development (Cursor, Claude Code, Codex, Gemini CLI)', years: 1, level: 4 },
        { skill: 'Programming: VB.NET, TypeScript, Python, C#, JavaScript', years: 6, level: 3 },
        { skill: 'Full-Stack Web (Next.js, React, TypeScript)', years: 1, level: 2, note: 'BBA + Full Stack Open foundation; powers effective AI-assisted development' },
      ],
    },
    {
      category: 'Applications',
      items: [
        { skill: 'UiPath Studio & Orchestrator', years: 6, level: 4 },
        { skill: 'UiPath Maestro (agentic orchestration)', years: 1, level: 3 },
        { skill: 'Supabase / PostgreSQL', years: 1, level: 2 },
        { skill: 'Next.js / React / Tailwind CSS', years: 1, level: 2 },
        { skill: 'Azure Cloud & Azure AI Services', years: 1, level: 2 },
        { skill: 'Azure Durable Functions', years: 1, level: 1 },
        { skill: 'Azure AI Search', years: 1, level: 1 },
      ],
    },
  ];
  activeCategory = 0;

  certs: Cert[] = [
    { name: 'AI-102: Azure AI Engineer Associate', issuer: 'Microsoft', date: '2026' },
    { name: 'CGI Azure AI Engineer Learning Path', issuer: 'CGI (Internal)', date: '2026' },
    { name: 'UiPath Certified Agentic Automation Associate', issuer: 'UiPath', date: '2026' },
    { name: 'Azure AI Fundamentals (AI-900)', issuer: 'Microsoft', date: '2025' },
    { name: 'Deep Learning Specialization', issuer: 'DeepLearning.AI', date: '2024' },
    { name: 'Generative AI with Large Language Models', issuer: 'DeepLearning.AI', date: '2023' },
    { name: 'ChatGPT Advanced Data Analysis', issuer: 'Coursera', date: '2023' },
    { name: 'Prompt Engineering for ChatGPT', issuer: 'Coursera', date: '2023' },
    { name: 'Elements of AI: Building AI', issuer: 'University of Helsinki', date: '2023' },
    { name: 'UiPath Certified Advanced RPA Developer', issuer: 'UiPath', date: '2021' },
    { name: 'UiPath Certified RPA Associate', issuer: 'UiPath', date: '2020' },
    { name: 'Full Stack Open 2019', issuer: 'University of Helsinki', date: '2019' },
    { name: 'Machine Learning (Andrew Ng)', issuer: 'Coursera / Stanford', date: '2018' },
    { name: 'Elements of AI: Introduction to AI', issuer: 'University of Helsinki', date: '2018' },
  ];
  showAllCerts = false;

  private observer?: IntersectionObserver;

  get visibleCerts(): Cert[] {
    return this.showAllCerts ? this.certs : this.certs.slice(0, 6);
  }

  private get reducedMotion(): boolean {
    return (
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }

  ngOnInit() {}

  ngAfterViewInit() {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>('.cv-reveal')
    );
    if (!els.length) return;
    if (this.reducedMotion || !('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    this.observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => this.observer!.observe(el));
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }

  toggle(entry: TimelineEntry) {
    entry.open = !entry.open;
  }

  selectCategory(i: number) {
    this.activeCategory = i;
  }

  barWidth(level: number): number {
    return (level / 4) * 100;
  }
}

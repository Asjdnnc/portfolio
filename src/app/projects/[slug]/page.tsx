import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Cpu,
  ExternalLink,
  Github,
  Layers,
  Sparkles,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  getAllProjectSlugs,
  getProjectBySlug,
  projectDetails,
} from "@/data/projectsData";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found | Aditya Kumar",
    };
  }

  return {
    title: `${project.title} | Aditya Kumar`,
    description: project.summary,
    openGraph: {
      title: `${project.title} — Case Study | Aditya Kumar`,
      description: project.summary,
      images: [
        {
          url: project.image,
          width: 1200,
          height: 630,
          alt: `${project.title} preview screenshot`,
        },
      ],
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const slugs = Object.keys(projectDetails);
  const currentIndex = slugs.indexOf(slug);
  const prevSlug = currentIndex > 0 ? slugs[currentIndex - 1] : slugs[slugs.length - 1];
  const nextSlug = currentIndex < slugs.length - 1 ? slugs[currentIndex + 1] : slugs[0];
  const prevProject = projectDetails[prevSlug];
  const nextProject = projectDetails[nextSlug];

  return (
    <main className="project-detail-page">
      {/* Sticky Header */}
      <header className="site-header project-detail-header">
        <Link href="/#work" className="project-back-button" aria-label="Back to selected work">
          <ArrowLeft size={16} aria-hidden="true" />
          <span>Back to Work</span>
        </Link>
        <Link href="/" className="brand" aria-label="Go to homepage">
          AK
        </Link>
        <div className="header-right-actions">
          <ThemeToggle />
        </div>
      </header>

      {/* Hero Section */}
      <article className="project-detail-container">
        <header className="project-hero-header">
          <div className="project-hero-meta">
            <span className="eyebrow">{project.category}</span>
            <span className="project-hero-separator">•</span>
            <span className="project-hero-role">{project.role}</span>
            <span className="project-hero-separator">•</span>
            <span className="project-hero-timeline">{project.timeline}</span>
          </div>

          <h1 className="project-hero-title">{project.title}</h1>
          <p className="project-hero-subtitle">{project.subtitle}</p>

          {/* Primary Action Buttons Bar */}
          <div className="project-hero-actions">
            {project.live ? (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="button button-primary"
                id="hero-live-button"
              >
                <ExternalLink size={18} aria-hidden="true" />
                <span>Visit Live Application</span>
              </a>
            ) : null}

            {project.source ? (
              <a
                href={project.source}
                target="_blank"
                rel="noreferrer"
                className="button button-secondary"
                id="hero-source-button"
              >
                <Github size={18} aria-hidden="true" />
                <span>View GitHub Source</span>
              </a>
            ) : null}

            <a href="#all-links" className="button button-ghost" id="hero-all-links-button">
              <span>View All Links</span>
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
        </header>

        {/* Hero Visual Preview */}
        <div className="project-showcase-frame">
          <div className="project-showcase-bar">
            <div className="project-showcase-dots">
              <span />
              <span />
              <span />
            </div>
            <span className="project-showcase-url">
              {project.live ? new URL(project.live).hostname : `${project.slug}.adityakumar.dev`}
            </span>
          </div>
          <div className="project-showcase-image">
            <Image
              src={project.image}
              alt={`${project.title} full preview interface`}
              fill
              priority
              sizes="(min-width: 1200px) 1100px, 92vw"
            />
          </div>
        </div>

        {/* Key Metrics / Highlights Band */}
        <section className="project-stats-grid" aria-label="Key project metrics">
          {project.stats.map((stat) => (
            <div className="project-stat-card" key={stat.label}>
              <strong className="project-stat-value">{stat.value}</strong>
              <span className="project-stat-label">{stat.label}</span>
            </div>
          ))}
        </section>

        {/* Project Overview Narrative */}
        <section className="project-section">
          <div className="project-section-kicker">
            <Sparkles size={16} className="text-accent" aria-hidden="true" />
            <h2>Overview & Architecture Summary</h2>
          </div>
          <div className="project-overview-content">
            {project.overview.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </section>

        {/* Architecture & Engineering Deep-Dive (If available) */}
        {project.architecture ? (
          <section className="project-section">
            <div className="project-section-kicker">
              <Cpu size={16} className="text-accent" aria-hidden="true" />
              <h2>{project.architecture.title}</h2>
            </div>
            <div className="project-architecture-box">
              <p className="project-architecture-desc">{project.architecture.description}</p>
              <ul className="project-architecture-list">
                {project.architecture.points.map((point, idx) => {
                  const [title, ...rest] = point.split(":");
                  return (
                    <li key={idx}>
                      <span className="point-badge">{idx + 1}</span>
                      <div>
                        {rest.length > 0 ? (
                          <>
                            <strong>{title}:</strong> {rest.join(":")}
                          </>
                        ) : (
                          <span>{point}</span>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        ) : null}

        {/* Key Features from Repository */}
        <section className="project-section">
          <div className="project-section-kicker">
            <Layers size={16} className="text-accent" aria-hidden="true" />
            <h2>Key Capabilities & Technical Features</h2>
          </div>
          <div className="project-features-grid">
            {project.keyFeatures.map((feature, idx) => (
              <div className="project-feature-card" key={idx}>
                <div className="project-feature-header">
                  <CheckCircle2 size={18} className="text-accent" aria-hidden="true" />
                  <h3>{feature.title}</h3>
                </div>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Full Tech Stack Breakdown */}
        <section className="project-section">
          <div className="project-section-kicker">
            <Cpu size={16} className="text-accent" aria-hidden="true" />
            <h2>Technologies & Engineering Tooling</h2>
          </div>
          <div className="project-tech-grid">
            {project.techStack.map((category) => (
              <div className="project-tech-card" key={category.category}>
                <h4>{category.category}</h4>
                <div className="tag-row">
                  {category.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* All Links & Resources Navigation Section */}
        <section className="project-section" id="all-links">
          <div className="project-section-kicker">
            <ExternalLink size={16} className="text-accent" aria-hidden="true" />
            <h2>Project Links & Navigation</h2>
          </div>
          <p className="project-section-sub">
            Direct access to all deployments, repositories, and related project links.
          </p>
          <div className="project-links-cards">
            {project.links.map((link) => (
              <a
                href={link.url}
                target="_blank"
                rel="noreferrer"
                key={link.url}
                className="project-link-card"
                aria-label={`Open ${link.label} in a new tab`}
              >
                <div className="project-link-icon-wrap">
                  {link.type === "github" ? (
                    <Github size={24} aria-hidden="true" />
                  ) : (
                    <ExternalLink size={24} aria-hidden="true" />
                  )}
                </div>
                <div className="project-link-info">
                  <div className="project-link-title-row">
                    <h3>{link.label}</h3>
                    <ArrowUpRight size={18} aria-hidden="true" className="project-link-arrow" />
                  </div>
                  {link.description ? <p>{link.description}</p> : null}
                  <span className="project-link-url">{link.url}</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Bottom Adjacent Projects Navigation */}
        <nav className="project-adjacent-nav" aria-label="Adjacent projects">
          <Link href={`/projects/${prevProject.slug}`} className="adjacent-card prev-card">
            <div className="adjacent-meta">
              <ArrowLeft size={16} aria-hidden="true" />
              <span>Previous Project</span>
            </div>
            <strong>{prevProject.title}</strong>
          </Link>

          <Link href="/#work" className="adjacent-home-button">
            All Projects
          </Link>

          <Link href={`/projects/${nextProject.slug}`} className="adjacent-card next-card">
            <div className="adjacent-meta">
              <span>Next Project</span>
              <ArrowRight size={16} aria-hidden="true" />
            </div>
            <strong>{nextProject.title}</strong>
          </Link>
        </nav>
      </article>
    </main>
  );
}

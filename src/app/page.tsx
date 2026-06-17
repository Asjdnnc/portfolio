import { ArrowDown, Download, ExternalLink } from "lucide-react";
import Image from "next/image";
import { ContactLinks } from "@/components/ContactLinks";
import { CodeChefStats } from "@/components/CodeChefStats";
import { LeetCodeStats } from "@/components/LeetCodeStats";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionHeader } from "@/components/SectionHeader";
import { SkillGroup } from "@/components/SkillGroup";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Timeline } from "@/components/Timeline";
import {
  education,
  experience,
  highlights,
  navItems,
  projects,
  skillGroups,
  socials,
  strengths,
} from "@/data/portfolio";

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Back to top">
          AK
        </a>
        <nav aria-label="Primary navigation">
          {navItems.map((item) => (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <ThemeToggle />
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Portfolio / Full Stack Developer</p>
          <h1>
            Aditya
            <br />
            Kumar<span>.</span>
          </h1>
          <p className="hero-intro">
            I am a Computer Science student at IIIT Sonepat building full-stack
            web applications with the MERN stack, JavaScript, Java, Python, and
            a growing interest in AI/ML.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#work">
              <ArrowDown size={17} aria-hidden="true" />
              View work
            </a>
            <a className="button button-secondary" href="/resume.pdf" target="_blank" rel="noreferrer">
              <Download size={17} aria-hidden="true" />
              Resume
            </a>
          </div>
        </div>
        <div className="hero-visual" aria-label="Aditya Kumar portrait and portfolio preview">
          <div className="portrait-frame">
            <Image src="/images/profile.jpg" alt="Aditya Kumar" fill priority sizes="(max-width: 700px) 14vw, 50vw" />
          </div>
          {/* <div className="signal-card">
            <span>Current focus</span>
            <strong>MERN apps, DSA, and practical AI/ML experiments.</strong>
          </div> */}
        </div>
      </section>

      <section className="social-strip" aria-label="Profile links">
        {socials.map((social) => {
          const Icon = social.icon;
          return (
            <a href={social.href} target="_blank" rel="noreferrer" key={social.label}>
              <Icon size={18} aria-hidden="true" />
              {social.label}
            </a>
          );
        })}
      </section>

      <section className="section about-section" id="about">
        <SectionHeader
          eyebrow="About"
          title="Building solutions through code"
        />
        <div className="about-grid">
          <p>
            I&apos;m Aditya Kumar, a Computer Science & Engineering student at Indian Institute of Information Technology Sonepat with a strong interest in software development and technology innovation. I work across frontend and backend development, building real-world applications using React, Next.js, Node.js, Express, MongoDB, Java, Python.
          </p>
          <p>
            My experience includes developing production-grade platforms, including the official college website and large-scale e-commerce solutions. Alongside full-stack development, I actively practice DSA, having solved 750+ problems. I am also exploring AI/ML and continuously learning new technologies to build impactful and scalable software.
          </p>
        </div>
      </section>

      <section className="section strengths-section">
        <SectionHeader eyebrow="What I Do" title="Practical engineering with a builder's bias." />
        <div className="strength-grid">
          {strengths.map((strength) => (
            <article className="strength-card" key={strength.title}>
              <h3>{strength.title}</h3>
              <p>{strength.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="stats-band" aria-label="Portfolio highlights">
        {highlights.map((item) => (
          <div className="stat" key={item.label}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </section>

      <section className="section work-section" id="work">
        <SectionHeader
          eyebrow="Selected Work"
          title="Projects that turn practice into proof."
        />
        <div className="project-grid">
          {projects.map((project, index) => (
            <ProjectCard project={project} index={index} key={project.title} />
          ))}
        </div>
      </section>

      <section className="section leetcode-section" id="leetcode">
        <div className="leetcode-head">
          <SectionHeader
            eyebrow="Problem Solving"
            title="Problem Solving & DSA Profile"
            intro="I keep a consistent algorithmic practice across LeetCode and coding-profile platforms."
          />
        </div>

        <div className="leetcode-stats-grid">
          <div>
            <strong>800+</strong>
            <span>Problems solved</span>
          </div>
          <div>
            <strong>1905</strong>
            <span>Contest rating</span>
          </div>
          <div>
            <strong>Top 4.34%</strong>
            <span>LeetCode percentile</span>
          </div>
        </div>

        <div className="leetcode-platforms">
          <span>Platforms</span>
          <a href="https://leetcode.com/u/aditya05yt/" target="_blank" rel="noreferrer">
            LeetCode
          </a>
          <a href="https://www.codechef.com/users/adityakumar5" target="_blank" rel="noreferrer">
            CodeChef
          </a>
          <a className="leetcode-view-link" href="https://www.codechef.com/users/adityakumar5" target="_blank" rel="noreferrer">
            View CodeChef
          </a>
        </div>

        <div className="leetcode-live">
          <LeetCodeStats />
          <CodeChefStats />
        </div>
      </section>

      <section className="section inverted-section" id="skills">
        <SectionHeader
          eyebrow="Skills"
          title="A toolkit for full-stack product work."
          intro="Grouped around the technologies and practices from my portfolio rather than inflated proficiency bars."
          inverted
        />
        <div className="skills-grid">
          {skillGroups.map((group) => (
            <SkillGroup group={group} key={group.title} />
          ))}
        </div>
      </section>

      <section className="section split-section" id="education">
        <div>
          <SectionHeader eyebrow="Education" title="Computer science foundations." />
          <Timeline items={education} />
        </div>
        <div id="experience">
          <SectionHeader eyebrow="Experience" title="Hands-on development and leadership." />
          <Timeline items={experience} />
        </div>
      </section>

      <section className="section contact-section" id="contact">
        <div>
          <p className="eyebrow">Contact</p>
          <h2>Let&apos;s build something useful.</h2>
          <p>
            Reach out to me for internships, collaborations, full-stack projects, or
            conversations around software, DSA, and AI/ML experiments.
          </p>
          <a className="button button-primary" href="mailto:aditya05yt@gmail.com">
            <ExternalLink size={17} aria-hidden="true" />
            Send email
          </a>
        </div>
        <ContactLinks />
      </section>
    </main>
  );
}

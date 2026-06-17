import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import type { Project } from "@/data/portfolio";

type ProjectCardProps = {
  project: Project;
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <article className="project-card">
      <div className="project-media">
        <Image src={project.image} alt={`${project.title} project screenshot`} fill sizes="(min-width: 900px) 46vw, 100vw" />
      </div>
      <div className="project-body">
        <div className="project-kicker">
          <span>{String(index + 1).padStart(2, "0")}</span>
          <span>{project.category}</span>
        </div>
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
        <div className="tag-row" aria-label={`${project.title} technologies`}>
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <div className="project-actions">
          {project.live ? (
            <a href={project.live} target="_blank" rel="noreferrer">
              <ExternalLink size={16} aria-hidden="true" />
              Live
            </a>
          ) : null}
          {project.source ? (
            <a href={project.source} target="_blank" rel="noreferrer">
              <Github size={16} aria-hidden="true" />
              Code
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}

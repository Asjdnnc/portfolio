"use client";

import { ArrowUpRight, ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Project } from "@/data/portfolio";

type ProjectCardProps = {
  project: Project;
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/projects/${project.slug}`);
  };

  return (
    <article
      className="project-card project-card-interactive"
      onClick={handleCardClick}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          router.push(`/projects/${project.slug}`);
        }
      }}
      aria-label={`View full details for ${project.title}`}
    >
      <div className="project-media">
        <Image
          src={project.image}
          alt={`${project.title} project screenshot`}
          fill
          sizes="(min-width: 900px) 46vw, 100vw"
        />
      </div>
      <div className="project-body">
        <div className="project-kicker">
          <span>{String(index + 1).padStart(2, "0")}</span>
          <span>{project.category}</span>
        </div>
        <h3 className="project-title">
          <Link
            href={`/projects/${project.slug}`}
            onClick={(e) => e.stopPropagation()}
            className="project-title-link"
          >
            {project.title}
          </Link>
        </h3>
        <p>{project.summary}</p>
        <div className="tag-row" aria-label={`${project.title} technologies`}>
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <div className="project-actions">
          <Link
            href={`/projects/${project.slug}`}
            onClick={(e) => e.stopPropagation()}
            className="button-card-details"
          >
            Case Study
            <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
          {project.live ? (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              aria-label={`Visit live site for ${project.title}`}
            >
              <ExternalLink size={16} aria-hidden="true" />
              Live
            </a>
          ) : null}
          {project.source ? (
            <a
              href={project.source}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              aria-label={`View source code on GitHub for ${project.title}`}
            >
              <Github size={16} aria-hidden="true" />
              Code
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}


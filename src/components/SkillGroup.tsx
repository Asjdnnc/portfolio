import type { SkillGroup as SkillGroupType } from "@/data/portfolio";

type SkillGroupProps = {
  group: SkillGroupType;
};

export function SkillGroup({ group }: SkillGroupProps) {
  return (
    <article className="skill-group">
      <h3>{group.title}</h3>
      <div className="skill-list">
        {group.items.map((skill) => (
          <span key={skill}>{skill}</span>
        ))}
      </div>
    </article>
  );
}

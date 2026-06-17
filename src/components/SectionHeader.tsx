type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  intro?: string;
  inverted?: boolean;
};

export function SectionHeader({ eyebrow, title, intro, inverted = false }: SectionHeaderProps) {
  return (
    <div className="section-header">
      <p className={inverted ? "eyebrow eyebrow-inverted" : "eyebrow"}>{eyebrow}</p>
      <h2>{title}</h2>
      {intro ? <p className={inverted ? "section-intro section-intro-inverted" : "section-intro"}>{intro}</p> : null}
    </div>
  );
}

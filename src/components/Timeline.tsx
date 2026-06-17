import type { TimelineItem } from "@/data/portfolio";

type TimelineProps = {
  items: TimelineItem[];
};

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="timeline">
      {items.map((item) => (
        <article className="timeline-item" key={`${item.title}-${item.meta}`}>
          <span className="timeline-dot" aria-hidden="true" />
          <div>
            <p>{item.meta}</p>
            <h3>{item.title}</h3>
            <span>{item.description}</span>
          </div>
        </article>
      ))}
    </div>
  );
}

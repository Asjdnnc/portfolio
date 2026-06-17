import { contactCards } from "@/data/portfolio";

export function ContactLinks() {
  return (
    <div className="contact-grid">
      {contactCards.map((card) => {
        const Icon = card.icon;
        return (
          <a className="contact-card" href={card.href} key={card.label} target={card.href.startsWith("http") ? "_blank" : undefined} rel={card.href.startsWith("http") ? "noreferrer" : undefined}>
            <Icon size={20} aria-hidden="true" />
            <span>{card.label}</span>
            <strong>{card.value}</strong>
          </a>
        );
      })}
    </div>
  );
}

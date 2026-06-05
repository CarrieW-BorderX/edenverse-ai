import type { SiteContent } from "@/data/site-content";

type ContactPageProps = {
  content: SiteContent;
};

export function ContactPage({ content }: ContactPageProps) {
  return (
    <div className="page-shell">
      <section className="page-hero-section">
        <div className="section-container section-stack">
          <span className="section-kicker"></span>
          <h1 className="section-title">{content.contact.pageHero.title}</h1>
          {/* <p className="section-copy">{content.contact.pageHero.description}</p> */}
        </div>
      </section>

      <section className="section-container contact-layout section-spacing">
        <article className="contact-info-panel">
          <span className="section-kicker">{content.contact.info.kicker}</span>
          <h2 className="feature-panel-title pt-12">{content.contact.info.title}</h2>
          {/* <p className="section-copy">{content.contact.info.description}</p> */}
          <div className="contact-detail-list">
            <p>{content.contact.info.address}</p>
            <a href={`tel:${content.contact.info.phoneRaw}`}>
              {content.contact.info.phoneLabel}
            </a>
            <a href={`mailto:${content.contact.info.email}`}>
              {content.contact.info.email}
            </a>
          </div>
        </article>

        <article className="contact-form-panel">
          <span className="section-kicker">{content.contact.form.kicker}</span>
          <h2 className="feature-panel-title">{content.contact.form.title}</h2>
          <form className="contact-form-layout">
            <label className="contact-field">
              <span>{content.contact.form.nameLabel}</span>
              <input type="text" name="name" placeholder={content.contact.form.namePlaceholder} />
            </label>
            <label className="contact-field">
              <span>{content.contact.form.emailLabel}</span>
              <input type="email" name="email" placeholder={content.contact.form.emailPlaceholder} />
            </label>
            <label className="contact-field contact-field-full">
              <span>{content.contact.form.messageLabel}</span>
              <textarea
                name="message"
                rows={6}
                placeholder={content.contact.form.messagePlaceholder}
              />
            </label>
            <button className="primary-button" type="submit">
              {content.contact.form.submitLabel}
            </button>
          </form>
        </article>
      </section>
    </div>
  );
}

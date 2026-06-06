import Image from "next/image";
import Link from "next/link";
import type { FooterContent } from "@/data/site-content";
import { localePrefix, type Locale } from "@/lib/i18n";

type SiteFooterProps = {
  locale: Locale;
  footer: FooterContent;
};

export function SiteFooter({ locale, footer }: SiteFooterProps) {
  return (
    <footer className="site-footer">
      <div className="section-container site-footer-grid">
        <div className="site-footer-brand">
          <Image
            src="https://cdn.shopify.com/s/files/1/0764/3063/9301/files/logo-transparent.png?v=1777920552"
            alt="Edenverse AI"
            width={320}
            height={96}
            className="site-footer-logo-image"
          />
          <span className="section-kicker">{footer.tagline}</span>
          <h2 className="site-footer-title">{footer.title}</h2>
          <p className="site-footer-copy">{footer.description}</p>
        </div>

        <div className="site-footer-column">
          <h3 className="site-footer-heading">{footer.navigationHeading}</h3>
          {footer.links.map((link) => (
            <Link key={link.href} className="site-footer-link" href={`${localePrefix(locale)}${link.href}`}>
              {link.label}
            </Link>
          ))}
        </div>

        <div className="site-footer-column">
          <h3 className="site-footer-heading">{footer.contactHeading}</h3>
          <p className="site-footer-copy">{footer.address}</p>
          <a className="site-footer-link" href={`tel:${footer.phoneRaw}`}>
            {footer.phoneLabel}
          </a>
          <a className="site-footer-link" href={`mailto:${footer.email}`}>
            {footer.email}
          </a>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";

export default function LocaleNotFound() {
  return (
    <section className="page-shell">
      <div className="section-container section-stack">
        <span className="section-kicker">404</span>
        <h1 className="section-title">Signal lost.</h1>
        <p className="section-copy">
          The page you requested is not available in this route.
        </p>
        <div className="button-row">
          <Link className="primary-button" href="/en">
            Return to Home
          </Link>
        </div>
      </div>
    </section>
  );
}

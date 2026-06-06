"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import type { NavigationContent } from "@/data/site-content";
import { localeNames, localePrefix, type Locale } from "@/lib/i18n";

type SiteHeaderProps = {
  locale: Locale;
  navigation: NavigationContent;
};

export function SiteHeader({ locale, navigation }: SiteHeaderProps) {
  const [isOverlayActive, setIsOverlayActive] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdownHref, setOpenDropdownHref] = useState<string | null>(null);
  const headerReference = useRef<HTMLElement | null>(null);
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const pathname = usePathname();

  useEffect(() => {
    let animationFrameId = 0;

    const updateHeaderState = () => {
      const mediaBackgroundSections = document.querySelectorAll<HTMLElement>(
        ".media-background-section",
      );
      const headerHeight = headerReference.current?.offsetHeight ?? 0;

      const isHeaderOverMediaBackground = Array.from(
        mediaBackgroundSections,
      ).some((section) => {
        const sectionBounds = section.getBoundingClientRect();

        return sectionBounds.top < headerHeight && sectionBounds.bottom > 0;
      });

      setIsOverlayActive(isHeaderOverMediaBackground && !isMenuOpen);
    };

    animationFrameId = window.requestAnimationFrame(() => {
      updateHeaderState();
    });
    window.addEventListener("scroll", updateHeaderState, { passive: true });
    window.addEventListener("resize", updateHeaderState);
    window.addEventListener("load", updateHeaderState);

    return () => {
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }

      window.removeEventListener("scroll", updateHeaderState);
      window.removeEventListener("resize", updateHeaderState);
      window.removeEventListener("load", updateHeaderState);
    };
  }, [isMenuOpen, pathname]);

  const [trackedPathname, setTrackedPathname] = useState(pathname);
  if (trackedPathname !== pathname) {
    setTrackedPathname(pathname);
    if (openDropdownHref !== null) {
      setOpenDropdownHref(null);
    }
  }

  const closeMenu = () => {
    setIsMenuOpen(false);
    setOpenDropdownHref(null);
  };

  const toggleDropdown = (href: string) => {
    setOpenDropdownHref((current) => (current === href ? null : href));
  };

  const handleDropdownKeyDown = (
    event: KeyboardEvent<HTMLDivElement>,
    href: string,
  ) => {
    if (event.key === "Escape") {
      event.stopPropagation();
      setOpenDropdownHref(null);
      triggerRefs.current[href]?.focus();
    }
  };

  return (
    <header
      ref={headerReference}
      className={`site-header ${isOverlayActive ? "site-header-overlay" : "site-header-solid"}`}
      data-header-surface={isOverlayActive ? "overlay" : "solid"}
    >
      <div className="site-header-inner">
        <Link
          className="site-logo"
          href={localePrefix(locale) || "/"}
          aria-label="Edenverse AI home"
          onClick={closeMenu}
        >
          <Image
            src="https://cdn.shopify.com/s/files/1/0764/3063/9301/files/logo-transparent.png?v=1777920552"
            alt="Edenverse AI"
            width={320}
            height={96}
            className="site-logo-image"
            priority
          />
        </Link>
        <div className="site-menu-group">
          <button
            className="site-menu-toggle"
            type="button"
            onClick={() =>
              setIsMenuOpen((currentState) => {
                if (currentState) {
                  setOpenDropdownHref(null);
                }
                return !currentState;
              })
            }
            aria-expanded={isMenuOpen}
            aria-controls="site-navigation-panel"
          >
            <span className="site-menu-toggle-line" />
            <span className="site-menu-toggle-line" />
            <span className="site-menu-toggle-line" />
          </button>

          <div
            id="site-navigation-panel"
            className={`site-navigation-panel ${isMenuOpen ? "site-navigation-panel-open" : ""}`}
          >
            <nav className="site-navigation" aria-label="Primary navigation">
              {navigation.items.map((item) => {
                if (!item.children) {
                  return (
                    <div key={item.label} className="site-navigation-item">
                      <Link
                        className="site-navigation-link"
                        href={`${localePrefix(locale)}${item.href ?? ""}`}
                        onClick={closeMenu}
                      >
                        {item.label}
                      </Link>
                    </div>
                  );
                }

                const dropdownKey = item.href ?? item.label;
                const isOpen = openDropdownHref === dropdownKey;
                const panelId = `site-navigation-dropdown-${dropdownKey.replace(/[^a-z0-9]+/gi, "-")}`;
                const chevron = (
                  <svg
                    className="site-navigation-dropdown-chevron"
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path
                      d="M1 1l4 4 4-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                );

                return (
                  <div
                    key={dropdownKey}
                    className="site-navigation-item site-navigation-dropdown"
                    onKeyDown={(event) => handleDropdownKeyDown(event, dropdownKey)}
                  >
                    {item.href ? (
                      <Link
                        className="site-navigation-link"
                        href={`${localePrefix(locale)}${item.href}`}
                        onClick={closeMenu}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <button
                        className="site-navigation-link site-navigation-dropdown-label"
                        type="button"
                        onClick={() => toggleDropdown(dropdownKey)}
                      >
                        {item.label}
                      </button>
                    )}
                    <button
                      ref={(node) => {
                        triggerRefs.current[dropdownKey] = node;
                      }}
                      className="site-navigation-dropdown-trigger"
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      aria-haspopup="menu"
                      aria-label={`${item.label} ${navigation.submenuLabel}`}
                      onClick={() => toggleDropdown(dropdownKey)}
                    >
                      {chevron}
                    </button>
                    <div
                      id={panelId}
                      role="menu"
                      className={`site-navigation-dropdown-panel ${isOpen ? "site-navigation-dropdown-panel-open" : ""}`}
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.href ?? child.label}
                          className="site-navigation-dropdown-link"
                          href={`${localePrefix(locale)}${child.href ?? ""}`}
                          role="menuitem"
                          onClick={closeMenu}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </nav>
          </div>
          {/* <div className="language-switcher" aria-label="Language selector">
            {navigation.languages.map((language) => {
              const isActive = language.locale === locale;

              return (
                <Link
                  key={language.locale}
                  className={`language-switcher-link ${isActive ? "language-switcher-link-active" : ""}`}
                  href={pathname.replace(`/${locale}`, `/${language.locale}`)}
                  hrefLang={language.locale}
                  onClick={closeMenu}
                >
                  {localeNames[language.locale]}
                </Link>
              );
            })}
          </div> */}
        </div>
      </div>
    </header>
  );
}

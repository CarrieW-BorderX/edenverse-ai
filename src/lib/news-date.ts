import type { Locale } from "@/lib/i18n";

const EN_DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

export function formatNewsDate(dateIso: string, locale: Locale): string {
  // Parse as YYYY-MM-DD in UTC to avoid timezone drift.
  const [yearString, monthString, dayString] = dateIso.split("-");
  const year = Number(yearString);
  const month = Number(monthString);
  const day = Number(dayString);

  if (Number.isNaN(year) || Number.isNaN(month) || Number.isNaN(day)) {
    return dateIso;
  }

  if (locale === "zh") {
    return `${year}年${month}月${day}日`;
  }

  const date = new Date(Date.UTC(year, month - 1, day));
  return EN_DATE_FORMATTER.format(date);
}

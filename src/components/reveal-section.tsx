type RevealSectionProps = Readonly<{
  children: React.ReactNode;
  className?: string;
}>;

export function RevealSection({
  children,
  className = "",
}: RevealSectionProps) {
  return <div className={`reveal-section reveal-section-visible ${className}`.trim()}>{children}</div>;
}

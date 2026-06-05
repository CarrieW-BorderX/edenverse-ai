export function MediaLoadingPulse({ className }: { className?: string }) {
  return (
    <div className={`media-loading-pulse ${className ?? ""}`} aria-hidden="true">
      <div className="media-loading-pulse-mark" />
    </div>
  );
}

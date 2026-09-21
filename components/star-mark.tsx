/**
 * The Star Signs mark: a four-point glint. Reads as a star and as the
 * specular highlight on a lit tube, which is the whole idea.
 */
export function StarMark({
  className = "",
  strokeOnly = false,
}: {
  className?: string;
  strokeOnly?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill={strokeOnly ? "none" : "currentColor"}
      stroke={strokeOnly ? "currentColor" : "none"}
      strokeWidth={strokeOnly ? 1.5 : 0}
    >
      <path d="M12 0.6c1.05 7.3 4.1 10.35 11.4 11.4-7.3 1.05-10.35 4.1-11.4 11.4-1.05-7.3-4.1-10.35-11.4-11.4C7.9 10.95 10.95 7.9 12 .6Z" />
    </svg>
  );
}

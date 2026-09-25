export function TapeIcon(props) {
  return (
    <svg viewBox="0 0 48 48" fill="none" {...props}>
      <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="2" />
      <circle cx="24" cy="24" r="4" fill="currentColor" />
      <path
        d="M24 6v6M24 36v6M6 24h6M36 24h6M11.5 11.5l4.2 4.2M32.3 32.3l4.2 4.2M11.5 36.5l4.2-4.2M32.3 15.7l4.2-4.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function NeedleThreadIcon(props) {
  return (
    <svg viewBox="0 0 64 64" fill="none" {...props}>
      <path
        d="M6 52c8-2 12-8 12-14s-4-9-8-9-6 3-6 6 3 5 6 5c9 0 15-8 15-16 0-6-4-11-4-11"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeDasharray="1 5"
      />
      <path
        d="M50 6L18 38"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <ellipse
        cx="53"
        cy="9"
        rx="4.5"
        ry="2.6"
        transform="rotate(45 53 9)"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}

export function ScissorsIcon(props) {
  return (
    <svg viewBox="0 0 48 48" fill="none" {...props}>
      <circle cx="10" cy="12" r="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="10" cy="36" r="5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M14 15l28 25M14 33L42 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function ButtonIcon(props) {
  return (
    <svg viewBox="0 0 32 32" fill="none" {...props}>
      <circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="1.6" fill="currentColor" />
      <circle cx="20" cy="12" r="1.6" fill="currentColor" />
      <circle cx="12" cy="20" r="1.6" fill="currentColor" />
      <circle cx="20" cy="20" r="1.6" fill="currentColor" />
    </svg>
  );
}
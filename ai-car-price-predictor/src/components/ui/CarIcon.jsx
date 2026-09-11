export function CarIcon({ className = 'w-6 h-6', ...props }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1024 1024"
      fill="none"
      stroke="currentColor"
      strokeWidth="70"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      role="img"
      {...props}
    >
      <path d="M170 532 C202 507 274 457 375 457 C476 457 583 514 659 532 C735 551 818 526 854 501 C890 476 915 425 915 425 C915 425 879 576 772 614 C665 652 411 652 274 614 C137 576 170 532 170 532 Z" />
      <path d="M312 457 L388 305 C400 280 430 261 460 261 L597 261 C627 261 657 280 669 305 L745 457" />
      <circle cx="337" cy="639" r="95" />
      <circle cx="337" cy="639" r="40" />
      <circle cx="721" cy="639" r="95" />
      <circle cx="721" cy="639" r="40" />
      <path d="M460 350 L564 350" />
    </svg>
  );
}
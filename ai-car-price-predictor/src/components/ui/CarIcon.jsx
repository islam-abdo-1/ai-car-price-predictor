export function CarIcon({ className = 'w-8 h-8', ...props }) {
  return (
    <img
      src="/car-icon.png"
      alt=""
      className={`${className} object-contain`}
      aria-hidden="true"
      draggable={false}
      {...props}
    />
  );
}
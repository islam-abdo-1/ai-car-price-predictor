export function CarIcon({ className = 'w-8 h-8', ...props }) {
  return (
    <img
      src="https://res.cloudinary.com/cxu8cimi/image/upload/f_auto,q_auto,w_auto/v1/ai-car-price-predictor/car-icon.png"
      alt=""
      className={`${className} object-contain`}
      aria-hidden="true"
      draggable={false}
      {...props}
    />
  );
}
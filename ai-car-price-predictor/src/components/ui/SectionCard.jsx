import { cn } from '../../utils/cn';

export function SectionCard({ 
  title, 
  description, 
  children, 
  className = '',
  titleClassName = '',
  ...props 
}) {
  return (
    <div className={cn('section-card', className)} {...props}>
      {(title || description) && (
        <div className="mb-6 pb-4 border-b border-border-primary">
          {title && (
            <h2 className={cn('section-title', titleClassName)}>{title}</h2>
          )}
          {description && (
            <p className="section-description">{description}</p>
          )}
        </div>
      )}
      <div>{children}</div>
    </div>
  );
}
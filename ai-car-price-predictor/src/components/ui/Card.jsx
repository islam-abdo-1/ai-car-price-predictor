import { cn } from '../../utils/cn';

export function Card({ children, className = '', ...props }) {
  return (
    <div className={cn('card-base', className)} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '', ...props }) {
  return (
    <div className={cn('px-6 py-4 border-b border-border-primary', className)} {...props}>
      {children}
    </div>
  );
}

export function CardContent({ children, className = '', ...props }) {
  return (
    <div className={cn('p-6', className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className = '', ...props }) {
  return (
    <div className={cn('px-6 py-4 border-t border-border-primary bg-bg-input/50', className)} {...props}>
      {children}
    </div>
  );
}
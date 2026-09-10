import { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/cn';

const Button = forwardRef(
  ({ 
    children, 
    variant = 'primary', 
    size = 'default', 
    loading = false, 
    disabled = false,
    className = '',
    type = 'button',
    ...props 
  }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-bg-primary disabled:opacity-50 disabled:cursor-not-allowed';
    
    const variants = {
      primary: 'bg-btn-primary text-white hover:bg-btn-primary-hover hover:shadow-lg hover:shadow-btn-primary/30 px-8 py-3.5',
      secondary: 'bg-transparent border-2 border-border-primary text-text-primary hover:border-accent hover:text-accent hover:bg-accent/5 px-8 py-3.5',
      ghost: 'text-text-secondary hover:text-text-primary hover:bg-bg-input px-4 py-2',
    };
    
    const sizes = {
      sm: 'text-body-sm px-4 py-2',
      default: 'text-body px-8 py-3.5',
      lg: 'text-body-lg px-10 py-4',
    };

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        className={cn(baseClasses, variants[variant], sizes[size], className)}
        {...props}
      >
        {loading && (
          <Loader2 className="w-5 h-5 animate-spin mr-2" aria-hidden="true" />
        )}
        <span>{children}</span>
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
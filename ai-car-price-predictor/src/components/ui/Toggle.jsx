import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

const Toggle = forwardRef(
  ({ 
    label, 
    checked, 
    onChange, 
    disabled = false,
    className = '',
    id,
    ...props 
  }, ref) => {
    const toggleId = id || label?.toLowerCase().replace(/\s+/g, '-');
    
    return (
      <div className="flex items-center gap-3">
        <button
          ref={ref}
          type="button"
          role="switch"
          aria-checked={checked}
          aria-disabled={disabled}
          aria-label={label}
          id={toggleId}
          onClick={() => !disabled && onChange(!checked)}
          onKeyDown={(e) => {
            if (e.key === ' ' || e.key === 'Enter') {
              e.preventDefault();
              !disabled && onChange(!checked);
            }
          }}
          className={cn(
            'toggle-base',
            checked ? 'toggle-on' : 'toggle-off',
            disabled && 'opacity-50 cursor-not-allowed',
            className
          )}
          {...props}
        >
          <span className="toggle-thumb" aria-hidden="true" />
        </button>
        {label && (
          <span className="text-body text-text-primary cursor-pointer select-none" onClick={() => !disabled && onChange(!checked)}>
            {label}
          </span>
        )}
      </div>
    );
  }
);

Toggle.displayName = 'Toggle';

export { Toggle };
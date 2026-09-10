import { useState, useRef } from 'react';
import { Combobox } from '@headlessui/react';
import { ChevronDown, X } from 'lucide-react';
import { cn } from '../../utils/cn';

function SearchableSelect({
  label,
  error,
  helperText,
  options = [],
  placeholder = 'Search...',
  value,
  onChange,
  disabled = false,
  required = false,
  className = '',
  id,
  filterBy = 'label',
  emptyMessage = 'No options found',
}) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const selectedOption = options.find(opt => (opt.value || opt.id || opt.name) === value);

  const filteredOptions = options.filter(option => {
    const searchText = option[filterBy] || option.name || option.label || '';
    return searchText.toLowerCase().includes(query.toLowerCase());
  });

  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
  const errorId = `${inputId}-error`;
  const helperId = `${inputId}-helper`;

  const describedBy = [
    error && errorId,
    helperText && helperId,
  ].filter(Boolean).join(' ') || undefined;

  const handleSelect = (val) => {
    onChange(val);
    setQuery('');
    inputRef.current?.focus();
  };

  const handleClear = (e) => {
    e.stopPropagation();
    onChange('');
    setQuery('');
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      inputRef.current?.blur();
    }
  };

  const displayValue = selectedOption
    ? (selectedOption.label || selectedOption.name || selectedOption[filterBy])
    : '';

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="label">
          {label}
          {required && <span className="text-red-400 ml-1" aria-hidden="true">*</span>}
        </label>
      )}

      <Combobox value={value || ''} onChange={handleSelect}>
        <div className="relative">
          <Combobox.Input
            ref={inputRef}
            id={inputId}
            type="text"
            autoComplete="off"
            disabled={disabled}
            required={required}
            displayValue={() => query || displayValue}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setQuery('')}
            placeholder={placeholder}
            className={cn(
              'input-base w-full pr-12',
              disabled && 'opacity-50 cursor-not-allowed',
              error && 'input-error',
              className
            )}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={describedBy}
            aria-autocomplete="list"
            aria-controls={`${inputId}-listbox`}
            role="combobox"
            aria-haspopup="listbox"
          />

          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 pointer-events-none">
            {value && !disabled && (
              <button
                type="button"
                onClick={handleClear}
                className="text-text-secondary hover:text-text-primary transition-colors p-0.5 rounded pointer-events-auto"
                aria-label="Clear selection"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            )}
            <ChevronDown className="w-5 h-5 text-text-secondary" aria-hidden="true" />
          </div>

          <Combobox.Options
            id={`${inputId}-listbox`}
            className={cn(
              'absolute z-50 w-full mt-1.5 bg-bg-card border border-border-primary rounded-xl shadow-card overflow-hidden',
              'scrollbar-thin max-h-60'
            )}
            role="listbox"
            aria-label={label}
          >
            {filteredOptions.length === 0 ? (
              <div className="px-4 py-6 text-center text-text-secondary text-body-sm">
                {query ? emptyMessage : 'No options available'}
              </div>
            ) : (
              filteredOptions.map((option) => (
                <Combobox.Option
                  key={option.value || option.id || option.name}
                  value={option.value || option.id || option.name}
                  className={({ focus }) => cn(
                    'relative px-4 py-3 cursor-pointer select-none transition-colors',
                    focus ? 'bg-accent/10 text-accent' : 'text-text-primary hover:bg-bg-input-hover',
                    value === (option.value || option.id || option.name) && 'font-semibold'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex-1 text-body">{option.label || option.name || option[filterBy]}</span>
                    {value === (option.value || option.id || option.name) && (
                      <svg className="w-5 h-5 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </div>
      </Combobox>

      {error && (
        <p id={errorId} className="error-message" role="alert">
          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          {error}
        </p>
      )}
      {helperText && !error && (
        <p id={helperId} className="helper-text">
          {helperText}
        </p>
      )}
    </div>
  );
}

export { SearchableSelect };
import { InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  error?: string
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const checkboxId = id || label?.toLowerCase().replace(/\s+/g, '-')
    
    return (
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            type="checkbox"
            id={checkboxId}
            className={cn(
              'h-4 w-4 rounded border-gray-300 text-primary',
              'focus:ring-2 focus:ring-primary focus:ring-offset-2',
              'disabled:cursor-not-allowed disabled:opacity-50',
              error && 'border-red-500',
              className
            )}
            ref={ref}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${checkboxId}-error` : undefined}
            {...props}
          />
        </div>
        {label && (
          <div className="ml-3">
            <label
              htmlFor={checkboxId}
              className="text-sm font-medium text-gray-700 cursor-pointer"
            >
              {label}
            </label>
            {error && (
              <p id={`${checkboxId}-error`} className="text-sm text-red-600 mt-1">
                {error}
              </p>
            )}
          </div>
        )}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'

export default Checkbox
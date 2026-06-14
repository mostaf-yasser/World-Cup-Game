import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', label, error, ...props }, ref) => (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-dark-200 mb-1.5">{label}</label>}
      <input
        ref={ref}
        className={`w-full px-4 py-2.5 bg-dark-800 border rounded-xl text-white placeholder:text-dark-400 focus:outline-none focus:ring-2 transition-all duration-200 ${
          error ? 'border-red-500 focus:ring-red-500/20' : 'border-dark-600 focus:border-primary-500 focus:ring-primary-500/20'
        } ${className}`}
        {...props}
      />
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  )
);
Input.displayName = 'Input';

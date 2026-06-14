import { ButtonHTMLAttributes, forwardRef } from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', loading, icon, children, disabled, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
    const variants = {
      primary: 'bg-primary-500 hover:bg-primary-600 text-white shadow-lg hover:shadow-glow',
      secondary: 'bg-dark-700 hover:bg-dark-600 text-white border border-dark-600',
      danger: 'bg-red-500 hover:bg-red-600 text-white',
      ghost: 'bg-transparent hover:bg-dark-700/50 text-dark-300 hover:text-white',
      outline: 'bg-transparent border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white',
    };
    const sizes = { sm: 'px-3 py-1.5 text-sm gap-1.5', md: 'px-4 py-2.5 text-sm gap-2', lg: 'px-6 py-3 text-base gap-2.5' };

    return (
      <button ref={ref} className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} disabled={disabled || loading} {...props}>
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : icon}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';

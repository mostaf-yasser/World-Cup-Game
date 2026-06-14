import { ReactNode } from 'react';

interface CardProps { children: ReactNode; className?: string; }
interface CardSectionProps { children: ReactNode; className?: string; }

export function Card({ children, className = '' }: CardProps) {
  return <div className={`bg-gradient-to-br from-dark-800/90 to-dark-900/95 backdrop-blur-xl rounded-2xl border border-dark-700/50 shadow-card ${className}`}>{children}</div>;
}

export function CardHeader({ children, className = '' }: CardSectionProps) {
  return <div className={`px-6 py-4 border-b border-dark-700/50 ${className}`}>{children}</div>;
}

export function CardBody({ children, className = '' }: CardSectionProps) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}

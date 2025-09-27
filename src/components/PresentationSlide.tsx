import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PresentationSlideProps {
  children: ReactNode;
  className?: string;
  glowEffect?: boolean;
}

export const PresentationSlide = ({ children, className, glowEffect = false }: PresentationSlideProps) => {
  return (
    <div className={cn(
      "min-h-screen flex items-center justify-center p-8 relative",
      "backdrop-blur-xl bg-[rgba(var(--glass-bg))]",
      "border border-[rgba(var(--glass-border))]",
      "shadow-[var(--glass-shadow)]",
      glowEffect && "animate-glass-glow",
      className
    )}>
      <div className="max-w-4xl w-full">
        {children}
      </div>
    </div>
  );
};
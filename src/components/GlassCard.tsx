import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export const GlassCard = ({ children, className, hover = true }: GlassCardProps) => {
  return (
    <div className={cn(
      "backdrop-blur-md bg-[rgba(var(--glass-bg))]",
      "border border-[rgba(var(--glass-border))]",
      "rounded-2xl p-6",
      "shadow-[var(--glass-shadow)]",
      hover && "transition-all duration-300 hover:bg-[rgba(255,255,255,0.12)] hover:scale-105",
      "animate-fade-in-scale",
      className
    )}>
      {children}
    </div>
  );
};
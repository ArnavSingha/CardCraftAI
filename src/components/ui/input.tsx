import * as React from 'react';
import { Sparkles } from 'lucide-react';

import { cn } from '@/lib/utils';

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, ...props }, ref) => {
    return (
      <div className="relative group">
        {/* Animated gradient border on focus */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg opacity-0 group-focus-within:opacity-100 blur transition-all duration-500 group-hover:opacity-50 animate-gradient-x" />
        
        {/* Floating sparkles inside input on focus */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
          <Sparkles className="h-3 w-3 text-blue-400 animate-sparkle" style={{ animationDelay: '0s' }} />
          <Sparkles className="h-2 w-2 text-purple-400 animate-sparkle" style={{ animationDelay: '0.3s' }} />
          <Sparkles className="h-3 w-3 text-pink-400 animate-sparkle" style={{ animationDelay: '0.6s' }} />
        </div>
        
        <input
          type={type}
          className={cn(
            'relative flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pr-14 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground placeholder:transition-all placeholder:duration-300 focus:placeholder:translate-x-1 focus:placeholder:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm transition-all duration-300 hover:border-primary/50 focus:border-transparent',
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };

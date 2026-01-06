import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { WandSparkles, RefreshCw, Loader2 } from 'lucide-react';

interface ProductCardProps {
  title: string;
  description: string;
  tags: string[];
  onRegenerate?: () => void;
  isRegenerating?: boolean;
}

export function ProductCard({ title, description, tags, onRegenerate, isRegenerating }: ProductCardProps) {
  return (
    <Card className="animate-in fade-in zoom-in-95 duration-500 w-full bg-card border border-border shadow-lg dark:shadow-2xl dark:shadow-primary/10 card-hover-lift animate-card-glow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="font-headline text-xl font-semibold animate-title-reveal">
            <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient-x">
              {title}
            </span>
          </CardTitle>
          <Badge
            variant="secondary"
            className="bg-gradient-to-r from-primary/20 to-purple-500/20 text-primary border-primary/30 animate-badge-pop backdrop-blur-sm"
            style={{ animationDelay: '0.2s' }}
          >
            <WandSparkles className="mr-1 h-3 w-3 animate-sparkle" />
            AI Generated
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm leading-relaxed animate-text-reveal">{description}</p>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-2 w-full">
          {tags.map((tag, index) => (
            <Badge 
              key={index} 
              variant="secondary" 
              className="group/tag relative font-normal bg-gradient-to-r from-secondary to-secondary hover:from-primary/20 hover:to-purple-500/20 text-secondary-foreground border border-border hover:border-primary/30 hover:text-primary hover:scale-110 hover:-rotate-2 transition-all duration-300 animate-keyword-pop opacity-0 cursor-default shadow-sm hover:shadow-lg hover:shadow-primary/30 overflow-hidden"
              style={{ animationDelay: `${0.3 + index * 0.08}s`, animationFillMode: 'forwards' }}
            >
              {/* Shimmer effect on hover */}
              <span className="absolute inset-0 -translate-x-full group-hover/tag:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              
              {/* Glow pulse effect */}
              <span className="absolute inset-0 rounded-full bg-primary/0 group-hover/tag:bg-primary/10 group-hover/tag:animate-ping-slow opacity-0 group-hover/tag:opacity-100" />
              
              <span className="relative z-10 flex items-center gap-1">
                {/* Animated dot before tag */}
                <span className="w-1.5 h-1.5 rounded-full bg-current opacity-0 scale-0 group-hover/tag:opacity-100 group-hover/tag:scale-100 transition-all duration-300" />
                {tag}
              </span>
            </Badge>
          ))}
        </div>
        {onRegenerate && (
          <Button 
            variant="outline" 
            className="w-full group transition-all duration-300 hover:border-primary hover:shadow-md animate-slide-up opacity-0" 
            style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}
            onClick={onRegenerate}
            disabled={isRegenerating}
          >
            {isRegenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Regenerating...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4 group-hover:rotate-180 transition-transform duration-500" />
                Regenerate
              </>
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

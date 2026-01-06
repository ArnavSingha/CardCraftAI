import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, WandSparkles, Sun, Moon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useTheme } from '@/hooks/use-theme';
import { generateMarketingCard } from '@/api/client';
import type { GenerateMarketingCardOutput } from '@/types/schemas';

import { ProductCard } from '@/components/product-card';
import { CardSkeleton } from '@/components/card-skeleton';

const formSchema = z.object({
  productName: z
    .string()
    .min(2, { message: 'Product name must be at least 2 characters.' }),
  category: z.string().nonempty({ message: 'Please select a category.' }),
});

const categories = [
  'Art & Crafts',
  'Automotive',
  'Baby & Kids',
  'Beauty & Personal Care',
  'Books',
  'Clothing & Fashion',
  'Food & Beverages',
  'Furniture',
  'Garden & Outdoor',
  'Health & Wellness',
  'Home Appliances',
  'Jewelry & Accessories',
  'Kitchenware',
  'Music & Instruments',
  'Office Supplies',
  'Pet Supplies',
  'Sports & Outdoors',
  'Toys & Games',
  'Travel & Luggage',
  'Wearable Electronics',
  'Others',
];

function Logo() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="32" height="32" rx="8" fill="url(#paint0_linear_1_2)" />
      <path
        d="M13.2449 13.918L12.375 11.25L9.75 10.375V21.625C9.75 22.2887 10.3125 22.875 11 22.875H21.5C22.1625 22.875 22.75 22.2887 22.75 21.625V10.375L20.125 11.25L19.2551 13.918C19.0816 14.4375 18.5204 14.75 17.9388 14.75H14.5612C13.9796 14.75 13.4184 14.4375 13.2449 13.918Z"
        fill="#E8E8E8"
      />
      <path
        d="M16.25 9.125L17.125 11.75H15.375L16.25 9.125Z"
        fill="#E8E8E8"
      />
      <defs>
        <linearGradient
          id="paint0_linear_1_2"
          x1="0"
          y1="0"
          x2="32"
          y2="32"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4D8DFF" />
          <stop offset="1" stopColor="#A74DFF" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function CardCraftClient() {
  const [isLoading, setIsLoading] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [cardData, setCardData] = useState<GenerateMarketingCardOutput | null>(null);
  const { toast } = useToast();
  const { theme, toggleTheme } = useTheme();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: '',
      category: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setCardData(null);
    try {
      const cardResult = await generateMarketingCard(values);
      setCardData(cardResult);
    } catch (error) {
      console.error('Failed to generate marketing card:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description:
          'There was a problem with the AI generation. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleRegenerate() {
    const values = form.getValues();
    if (!values.productName || !values.category) return;
    
    setIsRegenerating(true);
    try {
      const cardResult = await generateMarketingCard(values);
      setCardData(cardResult);
    } catch (error) {
      console.error('Failed to regenerate marketing card:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description:
          'There was a problem with the AI regeneration. Please try again.',
      });
    } finally {
      setIsRegenerating(false);
    }
  }

  return (
    <div className="relative w-full max-w-6xl mx-auto px-4 py-8 overflow-hidden">
      {/* Floating background animations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Large floating blurred circles */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-400/30 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute top-1/2 -right-20 w-80 h-80 bg-purple-400/30 rounded-full blur-3xl animate-float-medium" />
        <div className="absolute -bottom-20 left-1/4 w-64 h-64 bg-indigo-400/25 rounded-full blur-3xl animate-float-fast" />
        <div className="absolute top-1/4 right-1/4 w-48 h-48 bg-pink-400/30 rounded-full blur-3xl animate-float-slow-reverse" />
        <div className="absolute bottom-1/3 left-1/3 w-56 h-56 bg-cyan-400/25 rounded-full blur-3xl animate-float-medium-reverse" />
        <div className="absolute top-[5%] left-1/2 w-96 h-96 bg-violet-400/25 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-[10%] -left-10 w-72 h-72 bg-rose-400/25 rounded-full blur-3xl animate-float-medium" />
        <div className="absolute top-[35%] -left-16 w-60 h-60 bg-amber-400/20 rounded-full blur-3xl animate-float-fast" />
        <div className="absolute -bottom-10 right-1/3 w-80 h-80 bg-teal-400/25 rounded-full blur-3xl animate-float-slow-reverse" />
        <div className="absolute top-[15%] right-[5%] w-52 h-52 bg-fuchsia-400/25 rounded-full blur-3xl animate-float-medium-reverse" />
        <div className="absolute bottom-1/2 right-[8%] w-44 h-44 bg-emerald-400/20 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute top-[70%] left-[10%] w-68 h-68 bg-sky-400/25 rounded-full blur-3xl animate-float-medium" />
        
        {/* Small pulsing dots */}
        <div className="absolute top-[10%] left-[20%] w-4 h-4 bg-blue-500/70 rounded-full animate-ping-slow shadow-lg shadow-blue-500/50" />
        <div className="absolute top-[40%] left-[5%] w-3 h-3 bg-purple-500/70 rounded-full animate-ping-slow delay-1000 shadow-lg shadow-purple-500/50" />
        <div className="absolute top-[60%] right-[15%] w-5 h-5 bg-indigo-500/60 rounded-full animate-ping-slow delay-2000 shadow-lg shadow-indigo-500/50" />
        <div className="absolute bottom-[20%] right-[25%] w-3 h-3 bg-pink-500/70 rounded-full animate-ping-slow delay-500 shadow-lg shadow-pink-500/50" />
        <div className="absolute top-[20%] right-[10%] w-4 h-4 bg-cyan-500/60 rounded-full animate-ping-slow delay-1500 shadow-lg shadow-cyan-500/50" />
        <div className="absolute top-[5%] left-[40%] w-3 h-3 bg-violet-500/70 rounded-full animate-ping-slow delay-300 shadow-lg shadow-violet-500/50" />
        <div className="absolute top-[30%] left-[60%] w-4 h-4 bg-rose-500/60 rounded-full animate-ping-slow delay-800 shadow-lg shadow-rose-500/50" />
        <div className="absolute bottom-[35%] left-[15%] w-5 h-5 bg-amber-500/60 rounded-full animate-ping-slow delay-1200 shadow-lg shadow-amber-500/50" />
        <div className="absolute top-[75%] left-[45%] w-3 h-3 bg-teal-500/70 rounded-full animate-ping-slow delay-600 shadow-lg shadow-teal-500/50" />
        <div className="absolute top-[50%] right-[5%] w-4 h-4 bg-fuchsia-500/60 rounded-full animate-ping-slow delay-1800 shadow-lg shadow-fuchsia-500/50" />
        <div className="absolute bottom-[10%] left-[30%] w-3 h-3 bg-emerald-500/70 rounded-full animate-ping-slow delay-400 shadow-lg shadow-emerald-500/50" />
        <div className="absolute top-[85%] right-[35%] w-5 h-5 bg-sky-500/60 rounded-full animate-ping-slow delay-900 shadow-lg shadow-sky-500/50" />
        <div className="absolute top-[15%] left-[75%] w-4 h-4 bg-orange-500/60 rounded-full animate-ping-slow delay-1100 shadow-lg shadow-orange-500/50" />
        <div className="absolute bottom-[45%] right-[40%] w-3 h-3 bg-lime-500/70 rounded-full animate-ping-slow delay-1400 shadow-lg shadow-lime-500/50" />
        <div className="absolute top-[55%] left-[25%] w-4 h-4 bg-red-500/60 rounded-full animate-ping-slow delay-700 shadow-lg shadow-red-500/50" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3 animate-slide-in-left">
            <Logo />
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              CardCraft <span className="text-muted-foreground">AI</span>
            </h1>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2 text-shimmer">
        Generate Product Details with AI
      </h2>
      <p className="text-muted-foreground mb-8 animate-slide-up opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
        Enter the product name and select the category to generate details.
      </p>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="relative rounded-xl border border-border bg-card p-6 shadow-lg dark:shadow-2xl dark:shadow-primary/10 animate-fade-in-scale card-hover-lift opacity-0 overflow-hidden group" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
          {/* Animated gradient background on form */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl animate-float-slow" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl animate-float-medium" />
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 relative z-10">
              <FormField
                control={form.control}
                name="productName"
                render={({ field }) => (
                  <FormItem className="animate-slide-up opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
                    <FormLabel className="text-foreground font-medium flex items-center gap-2 group cursor-default">
                      <span className="inline-block w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 animate-ping-slow shadow-lg shadow-blue-500/50" />
                      <span className="relative">
                        <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-x font-semibold">
                          Product Name
                        </span>
                        <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:w-full transition-all duration-300" />
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Smart Fitness Watch"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="animate-slide-up opacity-0" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
                    <FormLabel className="text-foreground font-medium flex items-center gap-2 group cursor-default">
                      <span className="inline-block w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-ping-slow shadow-lg shadow-purple-500/50" style={{ animationDelay: '0.5s' }} />
                      <span className="relative">
                        <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-x font-semibold" style={{ animationDelay: '0.5s' }}>
                          Category
                        </span>
                        <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300" />
                      </span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="transition-all duration-300 focus:scale-[1.02] focus:shadow-lg focus:shadow-primary/10">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="animate-in fade-in-0 zoom-in-95">
                        {categories.map((category) => (
                          <SelectItem key={category} value={category} className="transition-colors duration-200 cursor-pointer">
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="animate-slide-up opacity-0" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
                <div className="relative group">
                  {/* Animated gradient border glow */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg opacity-75 group-hover:opacity-100 blur transition-all duration-500 animate-gradient-x" />
                  
                  <Button type="submit" className="relative w-full bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        Generate Details
                        <WandSparkles className="ml-2 h-4 w-4 animate-bounce-subtle" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </div>

        <div className="min-h-[300px] w-full relative">
          {/* Animated border gradient for output area */}
          <div className="absolute -inset-[1px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500 animate-gradient-rotate" />
          
          {isLoading ? (
            <div className="animate-pulse-glow">
              <CardSkeleton />
            </div>
          ) : cardData ? (
            <div className="animate-in slide-in-from-right-5 fade-in duration-500">
              <ProductCard 
                {...cardData} 
                onRegenerate={handleRegenerate}
                isRegenerating={isRegenerating}
              />
            </div>
          ) : (
            <div className="relative flex flex-col items-center justify-center h-full rounded-xl border-2 border-dashed bg-card/50 p-6 text-muted-foreground animate-fade-in-scale card-hover-lift opacity-0 overflow-hidden group" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
              {/* Floating orbs in empty state */}
              <div className="absolute top-4 left-4 w-16 h-16 bg-blue-500/20 rounded-full blur-2xl animate-float-slow" />
              <div className="absolute bottom-4 right-4 w-20 h-20 bg-purple-500/20 rounded-full blur-2xl animate-float-medium" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-pink-500/10 rounded-full blur-2xl animate-float-fast" />
              
              {/* Animated icon */}
              <div className="relative mb-4">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-ping-slow" />
                <WandSparkles className="relative h-12 w-12 text-muted-foreground/50 animate-bounce-subtle" />
              </div>
              
              <span className="relative z-10 text-center">
                Your generated card will appear here.
              </span>
              
              {/* Animated arrow hint */}
              <div className="mt-4 flex items-center gap-1 text-xs text-muted-foreground/50">
                <span>Fill the form and click Generate</span>
                <svg className="w-4 h-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}

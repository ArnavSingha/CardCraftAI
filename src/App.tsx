import { Toaster } from '@/components/ui/toaster';
import CardCraftClient from '@/components/card-craft-client';

function App() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-6 md:p-8 animated-gradient">
        <CardCraftClient />
      </main>
      <Toaster />
    </>
  );
}

export default App;

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen p-4 sm:p-6 md:p-8 bg-background text-foreground">
      <header className="py-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-primary">
          AI Goal Assistant
        </h1>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-2xl p-6 bg-card text-card-foreground rounded-lg shadow-md">
          <p className="text-lg text-center">
            Chat and dynamic UI will go here...
          </p>
          {/* Placeholder for future chat interface or dynamic content */}
        </div>
      </main>

      <footer className="py-4 sticky bottom-0 bg-background">
        <div className="flex w-full max-w-2xl mx-auto items-center space-x-2 p-2 bg-card rounded-lg shadow-md">
          <Input type="text" placeholder="Describe your goal..." className="flex-grow" />
          <Button type="submit">Send</Button>
        </div>
      </footer>
    </div>
  );
}

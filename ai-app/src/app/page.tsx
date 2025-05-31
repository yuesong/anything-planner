'use client';

import { useChat, type Message } from 'ai/react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area"; // Import ScrollArea

export default function HomePage() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/chat'
  });

  return (
    <div className="flex flex-col h-screen max-h-screen p-4 sm:p-6 md:p-8 bg-background text-foreground">
      <header className="py-4 shrink-0">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-primary">
          AI Goal Assistant
        </h1>
      </header>

      {/* Updated main content area for chat messages */}
      <ScrollArea className="flex-grow rounded-lg border bg-card shadow-inner my-4">
        <div className="p-4 space-y-4"> {/* Added space-y-4 for message spacing */}
          {messages.length > 0 ? messages.map((m: Message) => (
            <div
              key={m.id}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`} // Align messages
            >
              <div
                className={`whitespace-pre-wrap p-3 rounded-lg shadow max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl ${ // Added max-width for messages
                  m.role === 'user'
                    ? 'bg-blue-500 text-white self-end rounded-br-none' // User message style
                    : 'bg-muted text-foreground self-start rounded-bl-none' // AI message style
                }`}
              >
                <strong className="font-semibold block pb-1"> {/* Made role bold and block */}
                  {m.role === 'user' ? 'You' : 'AI Assistant'}
                </strong>
                {m.content}
              </div>
            </div>
          )) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-lg text-muted-foreground">
                No messages yet. Start by typing your goal below.
              </p>
            </div>
          )}
        </div>
      </ScrollArea>

      <footer className="py-4 shrink-0 sticky bottom-0 bg-background">
        <form onSubmit={handleSubmit} className="flex w-full max-w-2xl mx-auto items-center space-x-2"> {/* Removed card bg from form container */}
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Describe your goal or ask a question..."
            className="flex-grow bg-card rounded-lg shadow-sm" // Added card bg to input
          />
          <Button type="submit" className="shadow-sm">Send</Button>
        </form>
      </footer>
    </div>
  );
}

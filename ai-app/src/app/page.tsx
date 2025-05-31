'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChat, type Message } from '@ai-sdk/react';
import { stat } from "fs";
import { useEffect, useRef } from 'react';

export default function HomePage() {
  const { messages, input, handleInputChange, handleSubmit, error } = useChat({
    api: '/api/chat',
    // Optional: Clear input on successful submission is usually default, but can be explicit
    // onFinish: () => { /* Potentially clear input or other actions */ },
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen max-h-screen p-4 sm:p-6 md:p-8 bg-background text-foreground">
      <header className="py-4 shrink-0">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-primary">
          Anything Planner
        </h1>
      </header>

      {error && (
        <div className="mb-4 p-3 rounded-md bg-destructive text-destructive-foreground text-center">
          <p>Error: {error.message}</p>
        </div>
      )}

      {/* Updated main content area for chat messages */}
      <ScrollArea className="flex-grow rounded-lg border bg-card shadow-inner my-4">
        <div className="p-4 space-y-4">
          {messages.length > 0 ? (
            messages.map((m: Message) => (
              <div
                key={m.id}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`whitespace-pre-wrap p-3 rounded-lg shadow max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl ${
                    m.role === 'user'
                      ? 'bg-primary text-primary-foreground self-end rounded-br-none' // User message style (using primary color)
                      : 'bg-muted text-foreground self-start rounded-bl-none' // AI message style
                  }`}
                >
                  <strong className="font-semibold block pb-1">
                    {m.role === 'user' ? 'You' : 'AI Assistant'}
                  </strong>
                  {m.content}
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-lg text-muted-foreground">
                No messages yet. Start by typing your goal below.
              </p>
            </div>
          )}
          <div ref={messagesEndRef} /> {/* Element to scroll to */}
        </div>
      </ScrollArea>

      <footer className="py-4 shrink-0 sticky bottom-0 bg-background">
        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-2xl mx-auto items-center space-x-2"
        >
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

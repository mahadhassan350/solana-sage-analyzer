import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/components/ui/use-toast';

const ChatAnalysis = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([]);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      // This would be replaced with actual ChatGPT API integration
      const response = { role: 'assistant', content: 'Analysis response would appear here.' };
      setMessages(prev => [...prev, response]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get analysis. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-4">
      <ScrollArea className="h-[300px] rounded-md border p-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 p-3 rounded-lg ${
              msg.role === 'user' ? 'bg-accent ml-auto' : 'bg-muted'
            } max-w-[80%]`}
          >
            {msg.content}
          </div>
        ))}
      </ScrollArea>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about market trends, transactions, or specific addresses..."
          className="flex-1"
        />
        <Button type="submit">Analyze</Button>
      </form>
    </div>
  );
};

export default ChatAnalysis;
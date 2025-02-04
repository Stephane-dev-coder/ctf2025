import React, { useState } from 'react';
import { Terminal } from './Terminal';

interface ChatGPTProps {
  onClose: () => void;
}

export function ChatGPT({ onClose }: ChatGPTProps) {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([
    { role: 'assistant', content: 'Bonjour ! Je suis là pour vous aider avec le challenge. Que puis-je faire pour vous ?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, { role: 'user', content: userMessage }]
        }),
      });

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
    } catch (error) {
      console.error('Erreur lors de la communication avec ChatGPT:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Désolé, une erreur est survenue.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <Terminal className="w-full max-w-2xl h-[600px] flex flex-col">
        <div className="flex justify-between items-center mb-4 p-2 border-b border-green-500/30">
          <h3 className="text-green-500 font-mono">Assistant ChatGPT (-100 points)</h3>
          <button
            onClick={onClose}
            className="text-green-500 hover:text-green-400"
          >
            [X] Fermer
          </button>
        </div>

        <div className="flex-1 overflow-y-auto mb-4 p-2 space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`${
                msg.role === 'assistant' ? 'text-green-500' : 'text-white'
              } font-mono`}
            >
              {msg.role === 'assistant' ? '🤖 ' : '👤 '}
              {msg.content}
            </div>
          ))}
          {loading && (
            <div className="text-green-500 font-mono animate-pulse">
              🤖 En train de réfléchir...
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="p-2 border-t border-green-500/30">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-black border border-green-500/30 p-2 text-green-500 font-mono focus:outline-none focus:border-green-500"
              placeholder="Posez votre question..."
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="bg-green-500/20 border border-green-500 px-4 py-2 text-green-500 font-mono hover:bg-green-500/30 disabled:opacity-50"
            >
              Envoyer
            </button>
          </div>
        </form>
      </Terminal>
    </div>
  );
} 
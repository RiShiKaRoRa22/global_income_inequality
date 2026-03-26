'use client';
import { useState } from 'react';
import { Send, Bot, X } from 'lucide-react';

const mockResponses: Record<string, string> = {
  'gini': 'The Gini Index measures income inequality. 0 = perfect equality, 100 = perfect inequality.',
  'highest': 'South Africa currently has the highest Gini Index (~63).',
  'usa': 'The United States has a Gini Index of ~41.5 — higher than most developed nations.',
  'default': 'I can answer questions about Gini Index, countries, trends, or data insights. Try asking "What is the Gini index?"'
};

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; content: string }[]>([
    { role: 'bot', content: 'Hi! I am your AI assistant for global income inequality data. Ask me anything!' }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { role: 'user', content: input }]);

    const lower = input.toLowerCase();
    let reply = mockResponses['default'];
    if (lower.includes('gini')) reply = mockResponses['gini'];
    else if (lower.includes('highest') || lower.includes('highest inequality')) reply = mockResponses['highest'];
    else if (lower.includes('usa') || lower.includes('america')) reply = mockResponses['usa'];

    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'bot', content: reply }]);
    }, 600);

    setInput('');
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-3xl flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-50"
      >
        <Bot size={28} />
      </button>

      {isOpen && (
        <div className="fixed bottom-28 right-8 w-96 bg-zinc-900 border border-zinc-700 rounded-3xl shadow-2xl overflow-hidden z-50">
          <div className="px-5 py-4 bg-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot />
              <span className="font-semibold">AI Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)}><X /></button>
          </div>

          <div className="h-96 p-5 overflow-y-auto flex flex-col gap-4 bg-zinc-950">
            {messages.map((msg, i) => (
              <div key={i} className={`max-w-[80%] ${msg.role === 'user' ? 'ml-auto bg-cyan-600' : 'mr-auto bg-zinc-800'} rounded-3xl px-5 py-3 text-sm`}>
                {msg.content}
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-zinc-700 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Ask about inequality..."
              className="flex-1 bg-zinc-800 rounded-3xl px-5 py-3 text-sm focus:outline-none"
            />
            <button onClick={sendMessage} className="w-10 h-10 bg-cyan-500 rounded-3xl flex items-center justify-center">
              <Send size={20} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
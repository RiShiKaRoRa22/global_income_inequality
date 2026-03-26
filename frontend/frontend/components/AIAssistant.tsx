'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, X, Minimize2, Maximize2, Loader2, AlertCircle } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// Current working Groq models (as of 2024)
const GROQ_MODELS = {
  FAST: 'llama-3.1-8b-instant',        // Fastest, good for quick responses
  BALANCED: 'llama-3.3-70b-versatile',  // Better quality, slightly slower
  LARGE: 'mixtral-8x7b-32768',          // Deprecated - don't use
};

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hi! I\'m your AI inequality analyst. Ask me about Gini coefficients, country comparisons, or global inequality trends!',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiStatus, setApiStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  // Check API status
  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GROQ_API_KEY;
    if (apiKey && apiKey.startsWith('gsk_') && apiKey.length > 20) {
      setApiStatus('online');
      console.log('Groq API key found, using model: llama-3.1-8b-instant');
    } else {
      setApiStatus('offline');
      console.log('No valid Groq API key found. Add NEXT_PUBLIC_GROQ_API_KEY to .env.local');
    }
  }, []);

  const callGroqAPI = async (userMessage: string, conversationHistory: any[]) => {
    const apiKey = process.env.NEXT_PUBLIC_GROQ_API_KEY;
    
    if (!apiKey) {
      console.error('No Groq API key found');
      return null;
    }

    try {
      console.log('Calling Groq API with model: llama-3.1-8b-instant');
      
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant', // Updated to working model
          messages: [
            {
              role: 'system',
              content: `You are a knowledgeable economics and inequality analyst specializing in global income inequality data. 
              Provide concise, accurate, and helpful responses about:
              - Gini coefficients and inequality metrics
              - Country comparisons (South Africa, Brazil, USA, India, China, European nations)
              - Economic trends, causes of inequality, and policy solutions
              - World Bank, OECD, and UN development data
              
              Keep responses under 200 words. Be friendly and professional. Use data when available.`,
            },
            ...conversationHistory,
          ],
          temperature: 0.7,
          max_tokens: 500,
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Groq API error:', response.status, errorData);
        
        // Try fallback model if the first one fails
        if (response.status === 400 && errorData.includes('model')) {
          console.log('Trying fallback model: llama-3.3-70b-versatile');
          const fallbackResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
              model: 'llama-3.3-70b-versatile',
              messages: [
                {
                  role: 'system',
                  content: `You are a knowledgeable economics and inequality analyst. Provide concise, accurate responses about global income inequality.`,
                },
                ...conversationHistory,
              ],
              temperature: 0.7,
              max_tokens: 500,
            }),
          });
          
          if (fallbackResponse.ok) {
            const fallbackData = await fallbackResponse.json();
            return fallbackData.choices[0]?.message?.content || null;
          }
        }
        
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      console.log('Groq API response received successfully');
      return data.choices[0]?.message?.content || null;
      
    } catch (err) {
      console.error('Groq API call failed:', err);
      return null;
    }
  };

  const getFallbackResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('gini') || lowerQuery.includes('gini coefficient')) {
      return "📊 **Gini Coefficient**: The Gini coefficient measures income inequality on a scale from 0 (perfect equality) to 100 (perfect inequality). According to World Bank data (2024):\n\n• South Africa: 63.0 (highest)\n• Brazil: 53.4\n• USA: 41.5\n• India: 35.7\n• Germany: 31.7\n• Finland: 27.2 (lowest among developed nations)";
    }
    if (lowerQuery.includes('highest') || lowerQuery.includes('most unequal')) {
      return "🌍 **Countries with Highest Inequality** (highest Gini coefficients):\n\n1. South Africa: 63.0\n2. Namibia: 59.1\n3. Suriname: 57.9\n4. Zambia: 57.1\n5. Brazil: 53.4\n6. Mexico: 45.4\n\nThese countries face significant wealth concentration, often due to historical factors, structural issues, and limited social mobility.";
    }
    if (lowerQuery.includes('lowest') || lowerQuery.includes('most equal')) {
      return "🌟 **Countries with Lowest Inequality** (lowest Gini coefficients):\n\n1. Slovakia: 23.2\n2. Slovenia: 24.0\n3. Belarus: 24.4\n4. Czech Republic: 25.0\n5. Finland: 27.2\n6. Denmark: 28.3\n\nNordic countries achieve low inequality through progressive taxation, strong social safety nets, and universal healthcare.";
    }
    if (lowerQuery.includes('usa') || lowerQuery.includes('united states') || lowerQuery.includes('america')) {
      return "🇺🇸 **United States Inequality**:\n\n• Gini coefficient: 41.5\n• Top 10% earn ~50% of national income\n• Wealthiest 1% own ~32% of wealth\n• Factors: tax policies, wage stagnation, healthcare costs, education inequality\n• Higher inequality than any other developed nation";
    }
    if (lowerQuery.includes('india')) {
      return "🇮🇳 **India Inequality**:\n\n• Gini coefficient: 35.7\n• Top 10% hold ~55% of wealth\n• Poverty has decreased significantly\n• Urban-rural divide remains significant\n• Recent economic growth has benefited urban areas disproportionately";
    }
    if (lowerQuery.includes('trend') || lowerQuery.includes('trends') || lowerQuery.includes('changing')) {
      return "📈 **Global Inequality Trends**:\n\n• Between-country inequality: DECREASING (China, India growth)\n• Within-country inequality: INCREASING in developed nations\n• Global top 1% wealth share: RISING since 1980s\n• COVID-19 impact: Worsened inequality in many countries\n• Climate change: Expected to increase inequality further";
    }
    
    return "💡 I can help you with questions about:\n\n• Gini coefficients and inequality metrics\n• Country comparisons (USA, India, Brazil, South Africa)\n• Global inequality trends\n• Causes of economic inequality\n• Policy solutions and their effectiveness\n\nWhat would you like to know about global income inequality?";
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setError(null);
    
    setMessages(prev => [...prev, {
      role: 'user',
      content: userMessage,
      timestamp: new Date(),
    }]);
    
    setIsLoading(true);

    try {
      const conversationHistory = messages.map(msg => ({
        role: msg.role,
        content: msg.content,
      }));
      conversationHistory.push({ role: 'user', content: userMessage });

      let assistantReply = null;
      
      if (apiStatus === 'online') {
        assistantReply = await callGroqAPI(userMessage, conversationHistory);
      }
      
      if (!assistantReply) {
        console.log('Using fallback response');
        assistantReply = getFallbackResponse(userMessage);
        if (apiStatus === 'online') {
          setError('API temporarily unavailable. Using offline knowledge base.');
          setTimeout(() => setError(null), 3000);
        }
      }

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: assistantReply,
        timestamp: new Date(),
      }]);
      
    } catch (err) {
      console.error('Error in sendMessage:', err);
      const fallbackReply = getFallbackResponse(userMessage);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: fallbackReply,
        timestamp: new Date(),
      }]);
      setError('Unable to reach AI service. Using offline knowledge base.');
      setTimeout(() => setError(null), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([{
      role: 'assistant',
      content: 'Chat cleared! How can I help you with inequality analysis today?',
      timestamp: new Date(),
    }]);
    setError(null);
  };

  const closeChat = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 group"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-blue-600 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity animate-pulse"></div>
          <div className="relative w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200">
            <Bot size={28} className="text-white" />
          </div>
        </div>
      </button>
    );
  }

  if (isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-2xl border border-gray-200 overflow-hidden w-[320px]">
          <div className="px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Bot size={18} className="text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm">Inequality Analyst AI</h3>
                {apiStatus === 'online' && <p className="text-blue-100 text-xs">Groq AI • Online</p>}
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsMinimized(false)}
                className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                title="Expand"
              >
                <Maximize2 size={16} className="text-white" />
              </button>
              <button
                onClick={closeChat}
                className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                title="Close chat"
              >
                <X size={16} className="text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden w-[380px]">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Bot size={18} className="text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm">Inequality Analyst AI</h3>
              <p className="text-blue-100 text-xs">
                {apiStatus === 'online' ? 'Powered by Groq AI (Llama 3.1)' : 'Offline Knowledge Base'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsMinimized(true)}
              className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
              title="Minimize"
            >
              <Minimize2 size={16} className="text-white" />
            </button>
            <button
              onClick={closeChat}
              className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
              title="Close chat"
            >
              <X size={16} className="text-white" />
            </button>
          </div>
        </div>

        <div className="h-[450px] overflow-y-auto p-4 bg-gray-50">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-3 flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-3 py-2 ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border border-gray-200 text-gray-800 shadow-sm'
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                <p className={`text-xs mt-1 ${
                  message.role === 'user' ? 'text-blue-100' : 'text-gray-400'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start mb-3">
              <div className="bg-white border border-gray-200 rounded-2xl px-4 py-2 shadow-sm">
                <div className="flex items-center gap-2">
                  <Loader2 size={14} className="animate-spin text-blue-600" />
                  <span className="text-xs text-gray-500">Analyzing with Groq AI...</span>
                </div>
              </div>
            </div>
          )}
          
          {error && (
            <div className="flex justify-center mb-3">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-1.5 flex items-center gap-2">
                <AlertCircle size={12} className="text-yellow-600" />
                <p className="text-xs text-yellow-700">{error}</p>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        <div className="border-t border-gray-200 p-3 bg-white">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about inequality trends..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              disabled={isLoading}
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              className="px-3 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send size={16} />
            </button>
          </div>
          <div className="flex justify-between mt-2">
            <button
              onClick={clearChat}
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
            >
              Clear chat
            </button>
            <p className="text-xs text-gray-400">
              {apiStatus === 'online' ? 'Groq AI • Llama 3.1' : 'Add GROQ_API_KEY to .env.local'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
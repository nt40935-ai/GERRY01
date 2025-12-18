import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, Loader2, User, Coffee } from 'lucide-react';
import { sendMessageToGemini } from '../../services/geminiService';
import { ChatMessage, Language, BrandSettings } from '../../types';

interface AssistantProps {
  language: Language;
  brandSettings: BrandSettings;
}

const Assistant: React.FC<AssistantProps> = ({ language: _language, brandSettings }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: `Hi there! I'm ${brandSettings.brandName || 'Gerry'}, your virtual barista. Looking for something specific, or do you need a recommendation based on your mood?`
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await sendMessageToGemini(input);
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 p-4 bg-coffee-900 text-white rounded-full shadow-2xl hover:scale-110 hover:bg-amber-600 transition-all duration-300 group ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
      >
        <Sparkles className="w-6 h-6 animate-pulse" />
        <span className="absolute -top-10 right-0 bg-white text-coffee-900 text-xs py-1 px-3 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-bold pointer-events-none">
          Ask {brandSettings.brandName || 'Gerry'}!
        </span>
      </button>

      {/* Chat Window */}
      <div 
        className={`fixed bottom-6 right-6 z-50 w-[90vw] md:w-[400px] h-[500px] bg-white rounded-2xl shadow-2xl border border-coffee-100 flex flex-col transition-all duration-300 origin-bottom-right ${
          isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="p-4 bg-coffee-900 rounded-t-2xl flex justify-between items-center text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center overflow-hidden">
               {brandSettings.assistantAvatar ? (
                 <img src={brandSettings.assistantAvatar} alt="Assistant" className="w-full h-full object-cover" />
               ) : (
                 <Coffee className="w-6 h-6 text-white" />
               )}
            </div>
            <div>
              <h3 className="font-bold font-serif">{brandSettings.brandName} AI</h3>
              <p className="text-xs text-coffee-200 flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                Online Barista
              </p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-coffee-50/50">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden ${
                  msg.role === 'user' ? 'bg-coffee-200' : 'bg-amber-100'
                }`}
              >
                {msg.role === 'user' ? (
                   <User className="w-5 h-5 text-coffee-700" />
                ) : (
                   brandSettings.assistantAvatar ? (
                     <img src={brandSettings.assistantAvatar} alt="AI" className="w-full h-full object-cover" />
                   ) : (
                     <Sparkles className="w-5 h-5 text-amber-600" />
                   )
                )}
              </div>
              <div 
                className={`max-w-[75%] p-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-coffee-900 text-white rounded-tr-none' 
                    : 'bg-white border border-gray-100 shadow-sm text-coffee-800 rounded-tl-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center overflow-hidden">
                {brandSettings.assistantAvatar ? (
                     <img src={brandSettings.assistantAvatar} alt="AI" className="w-full h-full object-cover" />
                   ) : (
                     <Sparkles className="w-5 h-5 text-amber-600" />
                   )
                }
              </div>
              <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-coffee-500" />
                <span className="text-xs text-coffee-500 italic">Brewing answer...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 border-t border-gray-100 bg-white rounded-b-2xl">
          <div className="relative">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask for a recommendation..."
              className="w-full pl-4 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 text-sm"
              disabled={isLoading}
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-coffee-900 text-white rounded-lg hover:bg-amber-600 disabled:opacity-50 disabled:hover:bg-coffee-900 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Assistant;


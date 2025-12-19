import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Phone, Mail, Loader2 } from 'lucide-react';
import { BrandSettings, Language } from '../../types';

interface SupportChatProps {
  language: Language;
  brandSettings: BrandSettings;
}

const SupportChat: React.FC<SupportChatProps> = ({ language, brandSettings }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ id: string; role: 'user' | 'agent'; text: string }[]>([
    {
      id: 'welcome',
      role: 'agent',
      text:
        language === 'vi'
          ? `Xin chào! Hãy cho chúng tôi biết bạn cần hỗ trợ gì. Bạn cũng có thể gọi ${brandSettings.contactPhone} hoặc email ${brandSettings.contactEmail}.`
          : `Hello! Tell us how we can help. You can also call ${brandSettings.contactPhone} or email ${brandSettings.contactEmail}.`,
    },
  ]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSend = () => {
    if (!input.trim()) return;
    const text = input.trim();
    setMessages((prev) => [...prev, { id: `u-${Date.now()}`, role: 'user', text }]);
    setInput('');
    setIsBotTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: 'agent',
          text:
            language === 'vi'
              ? 'Cảm ơn bạn! Đội ngũ sẽ liên hệ sớm nhất. Bạn có thể nhấn gọi hoặc gửi email ngay bên dưới.'
              : 'Thanks! Our team will reach out shortly. You can also tap call or email below.',
        },
      ]);
      setIsBotTyping(false);
    }, 700);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-24 right-6 z-40 p-3 rounded-full bg-amber-500 text-coffee-900 shadow-2xl hover:scale-110 transition-all ${
          isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
        }`}
        aria-label="Open support chat"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      <div
        className={`fixed bottom-6 right-6 z-50 w-[90vw] md:w-[360px] bg-white rounded-2xl shadow-2xl border border-amber-100 flex flex-col transition-all duration-300 ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <div className="p-4 bg-amber-500 text-coffee-900 rounded-t-2xl flex justify-between items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest">
              {language === 'vi' ? 'Hỗ trợ khách hàng' : 'Customer Support'}
            </p>
            <p className="text-sm font-bold">{brandSettings.brandName}</p>
          </div>
          <button onClick={() => setIsOpen(false)} className="p-1 rounded-full hover:bg-white/30" aria-label="Close chat">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-3 max-h-[360px] overflow-y-auto bg-amber-50/40">
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`px-3 py-2 rounded-2xl max-w-[80%] text-sm ${
                  m.role === 'user' ? 'bg-coffee-900 text-white' : 'bg-white border border-amber-100 text-coffee-900'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
          {isBotTyping && (
            <div className="flex justify-start">
              <div className="px-3 py-2 rounded-2xl bg-white border border-amber-100 text-sm text-coffee-700 flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                {language === 'vi' ? 'Đang trả lời...' : 'Typing...'}
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        <div className="px-4 pb-4 space-y-3">
          <div className="flex gap-2">
            <button
              onClick={() => window.open(`tel:${brandSettings.contactPhone}`, '_self')}
              className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-coffee-900 text-white hover:bg-coffee-800 transition-colors text-sm"
            >
              <Phone className="w-4 h-4" />
              {language === 'vi' ? 'Gọi hotline' : 'Call'}
            </button>
            <button
              onClick={() => window.open(`mailto:${brandSettings.contactEmail}`)}
              className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl border border-amber-200 text-coffee-900 hover:bg-amber-50 transition-colors text-sm"
            >
              <Mail className="w-4 h-4" />
              Email
            </button>
          </div>
          <div className="flex items-center gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={language === 'vi' ? 'Nhập tin nhắn...' : 'Type a message...'}
              className="flex-1 px-3 py-2 border border-amber-100 rounded-xl bg-white focus:ring-2 focus:ring-amber-500/50 outline-none text-sm"
            />
            <button
              onClick={handleSend}
              className="p-3 rounded-xl bg-amber-500 text-coffee-900 hover:bg-amber-400 transition-colors disabled:opacity-50"
              disabled={!input.trim()}
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SupportChat;








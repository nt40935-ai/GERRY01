import React, { useState } from 'react';
import { LineChart, ShieldCheck, Store, Handshake, Globe, Target, MessageCircle, Send } from 'lucide-react';
import { Language, PartnershipContent } from '../../types';

interface PartnershipProps {
  language: Language;
  content: PartnershipContent;
}

const ICON_MAP: Record<string, any> = {
  LineChart,
  ShieldCheck,
  Store,
  Handshake,
  Globe,
  Target,
};

const Partnership: React.FC<PartnershipProps> = ({ language, content }) => {
  const copy = content[language];
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<{ id: string; role: 'user' | 'bot'; text: string }[]>([
    { id: 'm1', role: 'bot', text: language === 'vi' ? 'Chào bạn! Hỏi mình về mô hình nhượng quyền, ROI hoặc timeline mở cửa hàng nhé.' : 'Hi there! Ask me about franchise model, ROI or launch timeline.' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = { id: `u-${Date.now()}`, role: 'user' as const, text: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: `b-${Date.now()}`,
          role: 'bot',
          text:
            language === 'vi'
              ? 'Cảm ơn bạn! Team sẽ phản hồi chi tiết. Nếu cần nhanh, hãy bấm CTA hoặc mở chat trực tuyến.'
              : 'Thanks! Our team will follow up shortly. For faster support, use the CTA or live chat.',
        },
      ]);
    }, 600);
  };

  const renderIcon = (iconKey: string) => {
    const Cmp = ICON_MAP[iconKey] || Handshake;
    return <Cmp className="w-6 h-6" />;
  };

  return (
    <section id="partnership" className="py-24 bg-gradient-to-b from-amber-50/60 via-white to-white">
      <div className="container mx-auto px-6">
        {/* Hero visual + intro copy */}
        <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
          <div className="space-y-4">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-widest bg-amber-100 text-amber-700">
              {copy.badge}
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-coffee-900">
              {copy.title}
            </h2>
            <p className="text-lg text-coffee-700 leading-relaxed">
              {copy.subtitle}
            </p>
            <div className="flex flex-wrap gap-3 text-sm text-coffee-700">
              {copy.tags.map((tag, i) => (
                <span key={i} className="px-3 py-2 rounded-full bg-white shadow-sm border border-amber-100">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="relative h-[320px] md:h-[380px] rounded-2xl overflow-hidden shadow-xl">
            <img
              src={copy.imageUrl}
              alt="Modern coffee partnership"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-coffee-900/70 via-coffee-900/30 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
              <p className="text-sm uppercase tracking-[0.2em] text-amber-200 font-semibold">Gerry Coffee</p>
              <p className="text-xl font-serif font-semibold">Modern franchise & investment ready with audited SOPs.</p>
              <div className="flex gap-4 text-sm text-amber-100">
                <span>ROI forecast</span>
                <span>Design & build kit</span>
                <span>Launch playbook</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {copy.pillars.map((item, idx) => (
            <div
              key={item.title}
              className="relative overflow-hidden rounded-2xl border border-amber-100 bg-white shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-transparent to-white"></div>
              <div className="relative p-6 flex gap-4 items-start">
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0">
                  {renderIcon(item.icon)}
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-bold text-coffee-900 mb-2">{item.title}</h3>
                  <p className="text-coffee-700 leading-relaxed">{item.desc}</p>
                </div>
              </div>
              <div className="absolute top-0 right-0 px-4 py-2 text-[11px] font-semibold text-amber-700">
                {String(idx + 1).padStart(2, '0')}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6 bg-coffee-900 text-white rounded-2xl px-8 py-10 shadow-xl">
          <div className="space-y-3 text-center md:text-left">
            <h3 className="text-2xl font-serif font-bold">{copy.title}</h3>
            <p className="text-coffee-200">{copy.contactNote}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <a
              href={copy.ctaPrimaryLink}
              className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-amber-500 text-coffee-900 font-semibold hover:bg-amber-400 transition-colors"
            >
              {copy.ctaPrimaryText}
            </a>
            <a
              href={copy.ctaSecondaryLink}
              className="inline-flex items-center justify-center px-5 py-3 rounded-xl border border-white/30 text-white font-semibold hover:border-white transition-colors"
            >
              {copy.ctaSecondaryText}
            </a>
            {copy.chatLink && (
              <a
                href={copy.chatLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center px-5 py-3 rounded-xl border border-amber-300 text-amber-200 font-semibold hover:bg-amber-500/10 transition-colors"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                {language === 'vi' ? 'Chat trực tuyến' : 'Live chat'}
              </a>
            )}
          </div>
        </div>

        {/* Inline lightweight chat */}
        <div className="mt-8 bg-white border border-amber-100 rounded-2xl shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-widest text-amber-600 font-semibold">
                {language === 'vi' ? 'Chat đối tác' : 'Partnership chat'}
              </p>
              <p className="text-lg font-bold text-coffee-900">
                {language === 'vi' ? 'Trao đổi nhanh với đội dự án' : 'Quick chat with our team'}
              </p>
            </div>
            <button
              onClick={() => setChatOpen(!chatOpen)}
              className="px-4 py-2 rounded-xl bg-amber-100 text-amber-800 font-semibold hover:bg-amber-200 transition-colors"
            >
              {chatOpen ? (language === 'vi' ? 'Thu gọn' : 'Hide') : language === 'vi' ? 'Mở chat' : 'Open chat'}
            </button>
          </div>

          {chatOpen && (
            <div className="space-y-3">
              <div className="border border-gray-200 rounded-xl p-4 h-56 overflow-y-auto bg-gray-50">
                {messages.map(msg => (
                  <div
                    key={msg.id}
                    className={`mb-3 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] px-3 py-2 rounded-xl text-sm ${
                        msg.role === 'user'
                          ? 'bg-amber-500 text-coffee-900'
                          : 'bg-white text-coffee-900 border border-gray-200'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
                  placeholder={language === 'vi' ? 'Hỏi về ROI, timeline, hỗ trợ...' : 'Ask about ROI, timeline, support...'}
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500/50 outline-none text-sm"
                />
                <button
                  onClick={handleSend}
                  className="px-4 py-2 rounded-lg bg-coffee-900 text-white hover:bg-coffee-800 transition-colors flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  {language === 'vi' ? 'Gửi' : 'Send'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Partnership;


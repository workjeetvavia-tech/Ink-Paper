import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, X, Bot, User as UserIcon } from 'lucide-react';
import { getStationeryAdvice } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Hi there! I'm Penelope, your personal stationery assistant. Looking for the perfect pen or a gift for an artist? Ask away!",
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      // Prepare history for API
      const history = messages.map(m => ({ role: m.role, text: m.text }));
      const responseText = await getStationeryAdvice(history, userMessage.text);

      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center ${
          isOpen ? 'bg-slate-200 text-slate-500 rotate-90 scale-0 opacity-0' : 'bg-primary-600 text-white hover:bg-primary-700'
        }`}
        aria-label="Open AI Assistant"
      >
        <Sparkles size={24} fill="currentColor" />
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-6 right-6 z-50 w-full max-w-[360px] bg-white rounded-2xl shadow-2xl border border-slate-100 flex flex-col transition-all duration-500 origin-bottom-right ${
          isOpen
            ? 'opacity-100 scale-100 translate-y-0 h-[500px]'
            : 'opacity-0 scale-75 translate-y-10 pointer-events-none h-0'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-gradient-to-r from-primary-500 to-primary-600 rounded-t-2xl text-white">
          <div className="flex items-center space-x-2">
            <div className="bg-white/20 p-1.5 rounded-full backdrop-blur-sm">
                <Sparkles size={16} className="text-white" fill="currentColor" />
            </div>
            <div>
              <h3 className="font-bold text-sm">Penelope</h3>
              <p className="text-xs text-primary-100">AI Stationery Expert</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-white/20 rounded-full transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-primary-600 text-white rounded-br-none'
                    : 'bg-white text-slate-700 border border-slate-100 shadow-sm rounded-bl-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-slate-100 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                  <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 bg-white border-t border-slate-100 rounded-b-2xl">
          <div className="flex items-center space-x-2 bg-slate-100 rounded-full px-4 py-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about pens, paper..."
              className="flex-1 bg-transparent text-sm focus:outline-none text-slate-800 placeholder:text-slate-400"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="p-1.5 bg-primary-600 rounded-full text-white hover:bg-primary-700 disabled:opacity-50 disabled:hover:bg-primary-600 transition-colors"
            >
              <Send size={14} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AIAssistant;

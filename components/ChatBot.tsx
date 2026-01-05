
import React, { useState, useRef, useEffect } from 'react';
import { getGeminiResponse, checkAistudioKey, openAistudioSelector } from '../services/geminiService';
import { ChatMessage } from '../types';
import Logo from './Logo';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [needsKey, setNeedsKey] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Bienvenido a Nova Systems. ¿En qué puedo ayudarle hoy con su diagnóstico empresarial?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleAuth = async () => {
    await openAistudioSelector();
    setNeedsKey(false);
    setMessages(prev => [...prev, { role: 'model', text: 'Conexión establecida. Ya puede consultarme sobre los módulos y planes de Nova.' }]);
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    const response = await getGeminiResponse(messages, userMessage);
    
    if (response === "AUTH_REQUIRED") {
      setNeedsKey(true);
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: 'Para continuar con la asistencia de Nova IA, es necesario vincular su cuenta de Google AI Studio debido a las políticas de seguridad de la conexión.' 
      }]);
    } else {
      setMessages(prev => [...prev, { role: 'model', text: response || 'Error de sincronización.' }]);
    }
    
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="bg-slate-950 rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.8)] w-[350px] sm:w-[400px] flex flex-col h-[550px] border border-slate-800 overflow-hidden">
          <div className="bg-slate-900 p-6 border-b border-slate-800 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Logo size={28} />
              <div className="flex flex-col">
                <span className="font-bold text-xs tracking-widest text-white uppercase">Nova IA</span>
                <span className="text-[8px] font-bold text-orange-500 uppercase tracking-[0.2em]">Soporte Córdoba</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-slate-950/50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-5 py-4 rounded-3xl text-sm ${
                  msg.role === 'user' ? 'bg-orange-500 text-slate-950 font-semibold' : 'bg-slate-900 text-slate-300 border border-slate-800'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {needsKey && (
              <div className="flex flex-col items-center space-y-4 p-4 bg-orange-500/10 rounded-3xl border border-orange-500/20">
                <p className="text-[10px] text-orange-500 font-bold uppercase text-center">Acceso denegado por Google AI Studio</p>
                <button 
                  onClick={handleAuth}
                  className="bg-orange-500 text-slate-950 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white transition-all shadow-lg"
                >
                  Vincular Nova IA
                </button>
                <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="text-[8px] text-slate-500 underline uppercase">Documentación de Facturación</a>
              </div>
            )}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-900 px-5 py-3 rounded-full border border-slate-800 flex space-x-1">
                  <div className="w-1 h-1 bg-orange-500 rounded-full animate-bounce"></div>
                  <div className="w-1 h-1 bg-orange-500 rounded-full animate-bounce delay-75"></div>
                  <div className="w-1 h-1 bg-orange-500 rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            )}
          </div>

          <div className="p-6 bg-slate-950 border-t border-slate-900">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Escriba su consulta..."
                className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl px-5 py-3 text-xs focus:ring-1 focus:ring-orange-500 outline-none text-white font-medium"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || needsKey}
                className="bg-orange-500 text-slate-950 p-3 rounded-xl hover:bg-white transition-all disabled:opacity-20"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 12h14M12 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-orange-500 text-slate-950 p-4 rounded-full shadow-2xl hover:scale-110 transition-all flex items-center justify-center border-4 border-slate-950 group"
        >
          <Logo size={24} />
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-3 transition-all duration-500 font-black text-[10px] uppercase tracking-widest">Chat Nova</span>
        </button>
      )}
    </div>
  );
};

export default ChatBot;

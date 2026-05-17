import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Building2, HelpCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ChatMessage } from '../data';

export function ChatSidebar() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'agent',
      text: 'Hi Sarah. I\'m ready to help you analyze this price recommendation. You can ask me how specific factors influence the price, or direct me to adjust comp weightings.',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputValue,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    
    // Simulate thinking/response
    setTimeout(() => {
      let responseText = "I've logged that context. It slightly negatively impacts the desirability compared to the immediate comps.";
      if (userMsg.text.toLowerCase().includes('construction') || userMsg.text.toLowerCase().includes('noise')) {
        responseText = "Got it. Ongoing construction significantly impacts tenant experience. I'm adding a -$100 monthly penalty to the valuation model for this property due to the noise risk.";
      } else if (userMsg.text.toLowerCase().includes('tram') || userMsg.text.toLowerCase().includes('transit')) {
         responseText = "Looking into transit data... The new tram line increases accessibility score by 15%. I suggest a small premium of $50/mo compared to historical prices.";
      } else if (userMsg.text.toLowerCase().includes('why')) {
         responseText = "The current comps were selected because they match exactly on bedroom count and fall within a 1/2 mile radius. They were also leased in the last 60 days.";
      }
      
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        sender: 'agent',
        text: responseText,
        timestamp: new Date()
      }]);
    }, 1200);
  };

  const suggestions = [
    "How does local construction affect this price?",
    "Why not include unit 4B as a comp?",
    "What if I discount for traffic noise?"
  ];

  return (
    <div className="w-80 border-l border-slate-200 bg-white shadow-xl lg:shadow-none lg:relative absolute right-0 top-0 bottom-0 z-30 flex flex-col transform transition-transform duration-300 translate-x-0">
      <div className="p-4 border-b border-slate-100 flex items-center gap-2">
        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
        <h2 className="text-sm font-bold text-slate-700">Copilot Assistant</h2>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4">
        {messages.map(msg => (
          <div key={msg.id} className={`${msg.sender === 'user' ? 'self-end bg-blue-600 rounded-tr-none ml-8' : 'self-start bg-slate-100 rounded-tl-none mr-8'} p-3 rounded-lg`}>
            <p className={`text-xs ${msg.sender === 'user' ? 'text-white' : 'text-slate-800'}`}>
              {msg.text}
            </p>
          </div>
        ))}
        <div ref={endOfMessagesRef} />
      </div>

      <div className="p-4 border-t border-slate-100">
        {messages.length < 3 && (
          <div className="mb-3 space-y-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Suggestions</span>
            {suggestions.map((s, i) => (
              <button 
                key={i}
                onClick={() => setInputValue(s)}
                className="block text-left text-xs bg-slate-50 text-slate-600 hover:bg-slate-100 p-2 rounded-lg border border-slate-100 w-full hover:text-blue-700 hover:border-blue-100 transition-colors"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {s}
              </button>
            ))}
          </div>
        )}
        <form 
          className="relative flex items-center" 
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
        >
          <input 
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about the factors..." 
            className="w-full bg-slate-50 border border-slate-200 rounded-full px-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
          />
          <button 
            type="submit" 
            className="absolute right-2 top-1.5 text-blue-600"
            disabled={!inputValue.trim()}
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}


import React, { useState, useEffect } from 'react';
import { APP_QUOTES } from '../constants';

const ProcessingView: React.FC = () => {
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex(prev => (prev + 1) % APP_QUOTES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8 text-center px-4">
      <div className="relative">
        {/* Animated background rings */}
        <div className="absolute inset-0 scale-150 animate-ping opacity-20 rounded-full bg-orange-400"></div>
        <div className="absolute inset-0 scale-125 animate-pulse opacity-20 rounded-full bg-green-400 delay-75"></div>
        
        <div className="w-32 h-32 rounded-full border-4 border-slate-100 bg-white shadow-2xl flex items-center justify-center relative z-10 overflow-hidden">
           <div className="absolute inset-0 border-t-4 border-orange-500 animate-spin rounded-full"></div>
           <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-orange-500 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A10.003 10.003 0 0012 3m0 0a10.003 10.003 0 015.432 1.62c.036.02.071.042.106.065m-7.051 15.826A10.014 10.014 0 0112 21c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-6.103m4.62 10.233a8.047 8.047 0 011.878-1.913m8.332-1.564a9.992 9.992 0 001.847-3.656m-1.129-3.948a9.992 9.992 0 00-3.846-3.581m-1.007-.044a9.991 9.991 0 00-5.946 1.833" />
           </svg>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold text-slate-800">Rewriting History...</h3>
        <p className="text-slate-500 animate-pulse">Your Freedom Avatar is being crafted</p>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 min-h-[140px] flex items-center">
        <p className="italic text-slate-600 leading-relaxed transition-all duration-700">
          {APP_QUOTES[quoteIndex]}
        </p>
      </div>
    </div>
  );
};

export default ProcessingView;

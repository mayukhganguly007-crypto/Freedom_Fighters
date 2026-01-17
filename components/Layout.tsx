
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <h1 className="text-xl font-bold font-cinzel tracking-tight text-slate-800">
              BharatVeer
            </h1>
          </div>
          <div className="flex space-x-1">
             <div className="w-2 h-2 rounded-full bg-orange-500"></div>
             <div className="w-2 h-2 rounded-full bg-white border border-slate-300"></div>
             <div className="w-2 h-2 rounded-full bg-green-600"></div>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-md mx-auto px-4 py-6">
        {children}
      </main>

      <footer className="py-4 text-center text-xs text-slate-400 font-medium">
        Celebrating the spirit of Indian Independence
      </footer>
    </div>
  );
};

export default Layout;

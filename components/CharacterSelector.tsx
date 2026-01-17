
import React, { useState } from 'react';
import { FREEDOM_FIGHTERS } from '../constants';
import { FreedomFighter } from '../types';

interface CharacterSelectorProps {
  onSelect: (fighter: FreedomFighter) => void;
  onBack: () => void;
}

const CharacterSelector: React.FC<CharacterSelectorProps> = ({ onSelect, onBack }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedFighter = FREEDOM_FIGHTERS.find(f => f.id === selectedId);

  return (
    <div className="space-y-6">
      <div className="flex items-center mb-2">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-400 hover:text-slate-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex-1 text-center pr-8">
           <h2 className="text-xl font-bold text-slate-800">Choose Your Legend</h2>
           <p className="text-sm text-slate-500">Pick a freedom fighter avatar</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {FREEDOM_FIGHTERS.map((fighter) => (
          <button
            key={fighter.id}
            onClick={() => setSelectedId(fighter.id)}
            className={`relative flex flex-col items-center p-3 rounded-2xl border-2 transition-all duration-300 ${
              selectedId === fighter.id 
                ? 'border-orange-500 bg-orange-50 ring-4 ring-orange-100' 
                : 'border-white bg-white shadow-sm hover:shadow-md'
            }`}
          >
            <div className="w-full aspect-square rounded-xl overflow-hidden mb-3 bg-slate-100">
              <img 
                src={fighter.imageUrl} 
                alt={fighter.name} 
                className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all"
              />
            </div>
            <h3 className="text-xs font-bold text-slate-800 line-clamp-1">{fighter.name}</h3>
            {selectedId === fighter.id && (
              <div className="absolute top-2 right-2 bg-orange-500 text-white rounded-full p-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>

      {selectedFighter && (
        <div className="bg-white p-5 rounded-3xl shadow-lg border border-orange-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h4 className="text-lg font-bold text-orange-600 font-cinzel">{selectedFighter.title}</h4>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">{selectedFighter.description}</p>
          <button 
            onClick={() => onSelect(selectedFighter)}
            className="w-full mt-6 py-4 bg-orange-500 text-white rounded-2xl font-bold shadow-lg shadow-orange-200 hover:bg-orange-600 active:scale-95 transition-all"
          >
            Transform Me as {selectedFighter.name.split(' ').pop()}
          </button>
        </div>
      )}
    </div>
  );
};

export default CharacterSelector;


import React from 'react';
import { TransformationResult } from '../types';

interface ResultViewProps {
  result: TransformationResult;
  onReset: () => void;
}

const ResultView: React.FC<ResultViewProps> = ({ result, onReset }) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = result.imageUrl;
    link.download = `BharatVeer_${result.character.id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Freedom Avatar',
          text: `I transformed myself into ${result.character.name} on BharatVeer!`,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      alert('Sharing not supported on this browser. Try downloading the image.');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in zoom-in duration-700">
      <div className="text-center">
        <h2 className="text-2xl font-bold font-cinzel text-slate-800">The Hero Within</h2>
        <p className="text-slate-500 mt-1">You as {result.character.name}</p>
      </div>

      <div className="relative aspect-[3/4] w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
        <img src={result.imageUrl} className="w-full h-full object-cover" alt="Freedom Avatar" />
        
        <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
           <p className="text-white/80 text-xs font-bold uppercase tracking-widest mb-1">Legacy Lives On</p>
           <h3 className="text-white text-xl font-bold font-cinzel">{result.character.name}</h3>
        </div>

        {/* Brand overlay */}
        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-[10px] font-bold text-white uppercase tracking-tighter border border-white/20">
          BharatVeer AI
        </div>
      </div>

      <div className="bg-orange-50 p-5 rounded-3xl border border-orange-100">
        <h4 className="font-bold text-orange-800 text-sm mb-1 uppercase tracking-wide">Historical Fact</h4>
        <p className="text-slate-700 text-sm italic">{result.character.description}</p>
      </div>

      <div className="flex flex-col space-y-3">
        <div className="flex space-x-3">
          <button 
            onClick={handleDownload}
            className="flex-1 py-4 bg-white text-slate-700 border border-slate-200 rounded-2xl font-bold shadow-sm hover:bg-slate-50 transition-colors flex items-center justify-center space-x-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Save</span>
          </button>
          <button 
            onClick={handleShare}
            className="flex-1 py-4 bg-orange-500 text-white rounded-2xl font-bold shadow-lg shadow-orange-200 hover:bg-orange-600 transition-colors flex items-center justify-center space-x-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            <span>Share</span>
          </button>
        </div>
        <button 
          onClick={onReset}
          className="w-full py-4 text-slate-500 font-semibold hover:text-slate-800 transition-colors"
        >
          Create Another Avatar
        </button>
      </div>
    </div>
  );
};

export default ResultView;

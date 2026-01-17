
import React, { useState } from 'react';
import { AppState, FreedomFighter, TransformationResult } from './types';
import Layout from './components/Layout';
import CameraView from './components/CameraView';
import CharacterSelector from './components/CharacterSelector';
import ProcessingView from './components/ProcessingView';
import ResultView from './components/ResultView';
import { transformImage } from './services/geminiService';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(AppState.IDLE);
  const [selfie, setSelfie] = useState<string | null>(null);
  const [selectedCharacter, setSelectedCharacter] = useState<FreedomFighter | null>(null);
  const [result, setResult] = useState<TransformationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCapture = (image: string) => {
    setSelfie(image);
    setState(AppState.SELECTING);
  };

  const handleSelectCharacter = async (fighter: FreedomFighter) => {
    if (!selfie) return;
    
    setSelectedCharacter(fighter);
    setState(AppState.PROCESSING);
    setError(null);

    try {
      const resultImageUrl = await transformImage(selfie, fighter.prompt);
      setResult({
        imageUrl: resultImageUrl,
        character: fighter,
        timestamp: Date.now()
      });
      setState(AppState.RESULT);
    } catch (err) {
      console.error(err);
      setError("Transformation failed. Please try a clearer selfie.");
      setState(AppState.SELECTING);
    }
  };

  const handleReset = () => {
    setSelfie(null);
    setSelectedCharacter(null);
    setResult(null);
    setState(AppState.CAPTURING);
    setError(null);
  };

  const renderContent = () => {
    if (error) {
      return (
        <div className="p-6 bg-red-50 border border-red-200 rounded-3xl text-center">
          <p className="text-red-600 font-bold mb-4">{error}</p>
          <button onClick={() => setError(null)} className="px-6 py-2 bg-red-600 text-white rounded-xl">Try Again</button>
        </div>
      );
    }

    switch (state) {
      case AppState.IDLE:
        return (
          <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-8 animate-in fade-in duration-1000">
            <div className="relative">
              <div className="absolute inset-0 bg-india-gradient blur-3xl opacity-20 animate-pulse"></div>
              <img 
                src="https://picsum.photos/seed/statue/600/600" 
                className="w-48 h-48 rounded-full shadow-2xl object-cover relative z-10 border-8 border-white"
                alt="Statue of Unity"
              />
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-black font-cinzel text-slate-800 leading-tight">
                Legacy of <span className="text-orange-500">Valor</span>
              </h1>
              <p className="text-lg text-slate-500 max-w-xs mx-auto leading-relaxed">
                Step back in time. See yourself as the heroes who shaped our nation.
              </p>
            </div>
            <button 
              onClick={() => setState(AppState.CAPTURING)}
              className="w-full py-5 bg-orange-500 text-white rounded-2xl font-bold text-lg shadow-xl shadow-orange-200 active:scale-95 transition-all flex items-center justify-center space-x-2"
            >
              <span>Begin Transformation</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        );
      case AppState.CAPTURING:
        return <CameraView onCapture={handleCapture} />;
      case AppState.SELECTING:
        return <CharacterSelector onSelect={handleSelectCharacter} onBack={() => setState(AppState.CAPTURING)} />;
      case AppState.PROCESSING:
        return <ProcessingView />;
      case AppState.RESULT:
        return result ? <ResultView result={result} onReset={handleReset} /> : null;
      default:
        return null;
    }
  };

  return (
    <Layout>
      {renderContent()}
    </Layout>
  );
};

export default App;

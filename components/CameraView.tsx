
import React, { useRef, useState } from 'react';

interface CameraViewProps {
  onCapture: (base64Image: string) => void;
}

const CameraView: React.FC<CameraViewProps> = ({ onCapture }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfirm = () => {
    if (preview) {
      onCapture(preview);
    }
  };

  const handleReset = () => {
    setPreview(null);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-800">Start Your Journey</h2>
        <p className="text-slate-500 mt-1">Take a clear selfie to begin the transformation</p>
      </div>

      <div className="relative aspect-[3/4] w-full bg-slate-200 rounded-3xl overflow-hidden border-4 border-white shadow-xl flex items-center justify-center group">
        {preview ? (
          <img src={preview} className="w-full h-full object-cover" alt="Selfie preview" />
        ) : (
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="flex flex-col items-center cursor-pointer p-8 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p className="font-semibold">Tap to Capture or Upload</p>
            <p className="text-sm mt-1 text-slate-400">Make sure your face is clearly visible</p>
          </div>
        )}
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/*" 
          capture="user"
          onChange={handleFileChange} 
        />
      </div>

      {preview ? (
        <div className="flex space-x-4">
          <button 
            onClick={handleReset}
            className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-colors"
          >
            Retake
          </button>
          <button 
            onClick={handleConfirm}
            className="flex-1 py-4 bg-orange-500 text-white rounded-2xl font-bold shadow-lg shadow-orange-200 hover:bg-orange-600 transition-colors"
          >
            Confirm
          </button>
        </div>
      ) : (
        <button 
          onClick={() => fileInputRef.current?.click()}
          className="w-full py-4 bg-orange-500 text-white rounded-2xl font-bold shadow-lg shadow-orange-200 hover:bg-orange-600 transition-colors"
        >
          Capture Selfie
        </button>
      )}
    </div>
  );
};

export default CameraView;

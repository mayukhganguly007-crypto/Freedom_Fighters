
export interface FreedomFighter {
  id: string;
  name: string;
  title: string;
  description: string;
  prompt: string;
  imageUrl: string;
}

export enum AppState {
  IDLE = 'IDLE',
  CAPTURING = 'CAPTURING',
  SELECTING = 'SELECTING',
  PROCESSING = 'PROCESSING',
  RESULT = 'RESULT'
}

export interface TransformationResult {
  imageUrl: string;
  character: FreedomFighter;
  timestamp: number;
}

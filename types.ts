export interface Message {
  role: 'user' | 'model';
  text: string;
  error?: boolean;
}

export interface RunConfig {
  model: string;
  temperature: number;
  topK: number;
  topP: number;
  maxOutputTokens: number;
  systemInstruction: string;
}

export interface SavedPrompt {
  id: string;
  name: string;
  updatedAt: string;
  preview: string;
}

export interface ApiKey {
  id: string;
  name: string;
  keyMasked: string;
  createdAt: string;
  plan: 'Free' | 'Paid';
}
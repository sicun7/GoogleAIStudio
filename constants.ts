import { ApiKey, SavedPrompt } from "./types";

export const MODELS = [
  { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash', description: 'Fast and versatile' },
  { id: 'gemini-3-pro-preview', name: 'Gemini 3.0 Pro', description: 'Complex reasoning' },
  { id: 'gemini-2.5-flash-thinking', name: 'Gemini 2.5 Flash Thinking', description: 'Reasoning capable' },
];

export const MOCK_LIBRARY: SavedPrompt[] = [
  { id: '1', name: 'Creative Story Generator', updatedAt: 'Oct 24, 2024', preview: 'Write a story about a robot...' },
  { id: '2', name: 'Python Code Helper', updatedAt: 'Oct 22, 2024', preview: 'Act as a senior python engineer...' },
  { id: '3', name: 'Email Drafter', updatedAt: 'Sep 15, 2024', preview: 'Draft a professional email to...' },
];

export const MOCK_API_KEYS: ApiKey[] = [
  { id: 'key-1', name: 'My First Key', keyMasked: 'AIzaSy...4d8a', createdAt: 'Aug 10, 2024', plan: 'Free' },
  { id: 'key-2', name: 'Production App', keyMasked: 'AIzaSy...9kL2', createdAt: 'Sep 01, 2024', plan: 'Paid' },
];

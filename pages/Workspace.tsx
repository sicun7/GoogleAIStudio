import React, { useState, useRef, useEffect } from 'react';
import { Play, Save, RotateCcw, Copy, Check, MessageSquare } from 'lucide-react';
import RunSettings from '../components/RunSettings';
import { Message, RunConfig } from '../types';
import { generateContentStream } from '../services/gemini';
import ReactMarkdown from 'react-markdown';

const Workspace: React.FC = () => {
  const [config, setConfig] = useState<RunConfig>({
    model: 'gemini-2.5-flash',
    temperature: 1,
    topK: 40,
    topP: 0.95,
    maxOutputTokens: 8192,
    systemInstruction: ''
  });

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [hasCopied, setHasCopied] = useState<number | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [inputText]);

  const handleRun = async () => {
    if (!inputText.trim() && messages.length === 0) return;
    if (isRunning) return;

    const userMsg = inputText.trim();
    if (userMsg) {
      setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
      setInputText('');
    }

    setIsRunning(true);
    
    // Prepare history for API (exclude the message we just added effectively, as we send it as 'prompt' to API usually, 
    // but the service handles history construction. 
    // To match Gemini chat pattern: we send history + new message.
    
    // Optimistic empty model message
    setMessages(prev => [...prev, { role: 'model', text: '' }]);

    try {
      let fullResponse = "";
      
      // Calculate history excluding the optimistic empty message
      const historyForApi = messages.map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
      }));

      await generateContentStream(
        userMsg, 
        historyForApi, 
        config, 
        (chunk) => {
          fullResponse += chunk;
          setMessages(prev => {
            const newArr = [...prev];
            newArr[newArr.length - 1] = { role: 'model', text: fullResponse };
            return newArr;
          });
        }
      );
    } catch (error) {
      setMessages(prev => {
        const newArr = [...prev];
        newArr[newArr.length - 1] = { role: 'model', text: 'Error generating response. Please check your API key.', error: true };
        return newArr;
      });
    } finally {
      setIsRunning(false);
    }
  };

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setHasCopied(idx);
    setTimeout(() => setHasCopied(null), 2000);
  };

  const handleClear = () => {
    setMessages([]);
    setInputText('');
  };

  return (
    <div className="flex flex-1 h-full overflow-hidden bg-google-surface">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Bar inside Workspace */}
        <div className="h-14 border-b border-google-border flex items-center justify-between px-6 bg-google-bg">
          <div className="flex items-center gap-3">
            <input 
              type="text" 
              defaultValue="Untitled Prompt" 
              className="bg-transparent text-lg font-medium text-google-text focus:outline-none focus:border-b-2 focus:border-google-blue w-64 transition-all"
            />
          </div>
          <div className="flex items-center gap-3">
             <button className="p-2 text-google-textSecondary hover:text-google-text hover:bg-google-surface2 rounded-full transition-colors" title="Reset Chat" onClick={handleClear}>
              <RotateCcw size={18} />
            </button>
            <button className="flex items-center gap-2 px-4 py-1.5 bg-google-surface2 hover:bg-google-border text-google-text text-sm font-medium rounded-full transition-colors">
              <Save size={16} />
              Save
            </button>
          </div>
        </div>

        {/* Chat / Content Area */}
        <div className="flex-1 flex flex-col relative overflow-hidden">
          {messages.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-google-textSecondary opacity-60">
               <div className="w-16 h-16 bg-google-surface2 rounded-2xl flex items-center justify-center mb-4">
                  <MessageSquare size={32} />
               </div>
               <p className="text-lg">Type a prompt to get started</p>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex gap-4 max-w-4xl mx-auto ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold ${
                    msg.role === 'user' ? 'bg-google-surface2 text-google-text' : 'bg-gradient-to-br from-blue-500 to-purple-600 text-white'
                  }`}>
                    {msg.role === 'user' ? 'U' : 'M'}
                  </div>
                  <div className={`group relative max-w-[80%] rounded-2xl px-5 py-3.5 leading-relaxed text-sm whitespace-pre-wrap ${
                    msg.role === 'user' 
                      ? 'bg-google-surface2 text-google-text rounded-tr-none' 
                      : 'bg-transparent text-google-text border border-google-border rounded-tl-none'
                  }`}>
                    {msg.error ? (
                        <span className="text-red-400">{msg.text}</span>
                    ) : (
                        <ReactMarkdown 
                          components={{
                            code({node, inline, className, children, ...props}: any) {
                                const match = /language-(\w+)/.exec(className || '')
                                return !inline && match ? (
                                <div className="rounded-md bg-[#1e1e1e] my-2 overflow-hidden border border-google-border">
                                    <div className="bg-[#2d2d2d] px-3 py-1 text-xs text-gray-400 font-mono border-b border-google-border">{match[1]}</div>
                                    <pre className="p-3 overflow-x-auto text-sm">
                                        <code className={className} {...props}>
                                            {children}
                                        </code>
                                    </pre>
                                </div>
                                ) : (
                                <code className="bg-google-surface2 px-1 py-0.5 rounded text-google-blue font-mono text-xs" {...props}>
                                    {children}
                                </code>
                                )
                            }
                          }}
                        >
                            {msg.text}
                        </ReactMarkdown>
                    )}
                    
                    {/* Copy Button */}
                    <button 
                      onClick={() => handleCopy(msg.text, idx)}
                      className="absolute top-2 right-2 p-1.5 bg-google-bg/80 backdrop-blur-sm rounded opacity-0 group-hover:opacity-100 transition-opacity text-google-textSecondary hover:text-white"
                    >
                      {hasCopied === idx ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}

          {/* System Instructions Panel (Collapsible mock or fixed top? Let's make it input overlay if needed, but sidebar is cleaner for config. 
              Actually Studio puts System Instructions in the left top separate box in "Freeform" or top of chat in "Chat". 
              Let's put it in the settings panel for simplicity in this layout, or a dedicated dropdown.) */}
          
        </div>

        {/* Input Area */}
        <div className="p-6 bg-google-bg border-t border-google-border">
          <div className="max-w-4xl mx-auto relative bg-google-surface2 rounded-3xl border border-transparent focus-within:border-google-border focus-within:bg-google-bg transition-all shadow-lg">
            <textarea
              ref={textareaRef}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleRun();
                }
              }}
              placeholder="Type something..."
              className="w-full bg-transparent text-google-text placeholder-google-textSecondary px-6 py-4 pr-32 focus:outline-none resize-none max-h-[200px] overflow-y-auto rounded-3xl"
              rows={1}
            />
            
            <div className="absolute bottom-2 right-2 flex items-center gap-2">
              <div className="text-xs text-google-textSecondary px-2">
                {inputText.length} chars
              </div>
              <button
                onClick={handleRun}
                disabled={isRunning || (!inputText.trim() && messages.length === 0)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm transition-all ${
                  isRunning 
                    ? 'bg-google-surface border border-google-border text-google-textSecondary cursor-wait' 
                    : 'bg-google-accent hover:bg-blue-600 text-white shadow-md hover:shadow-lg'
                }`}
              >
                {isRunning ? (
                   <>
                     <div className="w-4 h-4 border-2 border-google-textSecondary border-t-transparent rounded-full animate-spin"></div>
                     Stop
                   </>
                ) : (
                   <>
                     Run <Play size={16} fill="currentColor" />
                   </>
                )}
              </button>
            </div>
          </div>
          <div className="max-w-4xl mx-auto mt-2 text-center text-xs text-google-textSecondary">
            Gemini may display inaccurate info, including about people, so double-check its responses.
          </div>
        </div>
      </div>

      {/* Right Sidebar - Run Settings */}
      <RunSettings config={config} setConfig={setConfig} isRunning={isRunning} />
    </div>
  );
};

export default Workspace;
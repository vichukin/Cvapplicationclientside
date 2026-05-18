import { useState, useRef, useEffect, useCallback } from 'react';
import { ProfileSection } from './components/ProfileSection';
import { TabNavigation } from './components/TabNavigation';
import { VerticalTimeline } from './components/VerticalTimeline';
import { ExperienceCarousel } from './components/ExperienceCarousel';
import { CarouselPagination } from './components/CarouselPagination';
import { AboutContent } from './components/AboutContent';
import { SkillsContent } from './components/SkillsContent';
import { EducationContent } from './components/EducationContent';
import { SkillsCarousel } from './components/SkillsCarousel';
import { EducationCarousel } from './components/EducationCarousel';
import { ChatInterface } from './components/ChatInterface';
import type { Message } from './components/ChatInterface';
import { MobileProfileHeader } from './components/MobileProfileHeader';
import { MobileTabNavigation } from './components/MobileTabNavigation';
import { FloatingActionButton } from './components/FloatingActionButton';
import { MobileChatBottomSheet } from './components/MobileChatBottomSheet';
import './styles/carousel.css';

const STORAGE_KEY = 'chat_history';

const defaultMessages: Message[] = [
  {
    id: 1,
    role: 'user',
    text: 'What is his experience with Azure and CI/CD?'
  },
  {
    id: 2,
    role: 'assistant',
    text: 'Dmytro has extensive experience managing cloud infrastructure via Azure (App Service, Blob, Key Vault) and setting up CI/CD pipelines using GitHub Actions.'
  }
];

function loadMessages(): Message[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored) as Message[];
  } catch {
    // ignore corrupt storage
  }
  return defaultMessages;
}

export default function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('about');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [messages, setMessages] = useState<Message[]>(loadMessages);
  const [inputValue, setInputValue] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);

  const desktopScrollRef = useRef<HTMLDivElement>(null);
  const mobileScrollRef = useRef<HTMLDivElement>(null);

  // Persist chat history to localStorage on every change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  // Scroll to top and reset carousel slide when tab changes
  useEffect(() => {
    if (desktopScrollRef.current) desktopScrollRef.current.scrollTop = 0;
    if (mobileScrollRef.current) mobileScrollRef.current.scrollTop = 0;
    setCurrentSlide(0);
  }, [activeTab]);

  const handleSendMessage = useCallback(async () => {
    const text = inputValue.trim();
    if (!text || isStreaming) return;

    const userMessage: Message = { id: Date.now(), role: 'user', text };

    // Build the history that will be sent (existing messages + the new user message)
    const historyToSend = [...messages, userMessage].map(({ role, text: t }) => ({ role, text: t }));

    // Add user message and an empty assistant placeholder in one update
    const assistantId = Date.now() + 1;
    setMessages(prev => [
      ...prev,
      userMessage,
      { id: assistantId, role: 'assistant', text: '' }
    ]);
    setInputValue('');
    setIsStreaming(true);

    try {
      const response = await fetch('https://localhost:7000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: historyToSend })
      });

      if (!response.ok || !response.body) {
        throw new Error(`HTTP ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        // SSE frames are separated by double newlines
        const frames = buffer.split('\n\n');
        // Keep the last (potentially incomplete) frame in the buffer
        buffer = frames.pop() ?? '';

        for (const frame of frames) {
          if (!frame.startsWith('data: ')) continue;
          // Strip the "data: " prefix and unescape literal \n sequences
          const chunk = frame.slice(6).replace(/\\n/g, '\n');
          setMessages(prev => {
            const updated = [...prev];
            const lastIndex = updated.length - 1;
            if (updated[lastIndex]?.role === 'assistant') {
              updated[lastIndex] = {
                ...updated[lastIndex],
                text: updated[lastIndex].text + chunk
              };
            }
            return updated;
          });
        }
      }
    } catch (err) {
      // On error, replace the empty placeholder with a friendly message
      setMessages(prev => {
        const updated = [...prev];
        const lastIndex = updated.length - 1;
        if (updated[lastIndex]?.role === 'assistant' && updated[lastIndex].text === '') {
          updated[lastIndex] = {
            ...updated[lastIndex],
            text: "Sorry, I couldn't reach the server. Please try again later."
          };
        }
        return updated;
      });
    } finally {
      setIsStreaming(false);
    }
  }, [inputValue, isStreaming, messages]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage]);

  const handlePromptClick = useCallback((prompt: string) => {
    setInputValue(prompt);
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'about':
        return <AboutContent />;
      case 'experience':
        return <VerticalTimeline />;
      case 'skills':
        return <SkillsContent />;
      case 'education':
        return <EducationContent />;
      default:
        return <VerticalTimeline />;
    }
  };

  const renderMobileTabContent = () => {
    switch (activeTab) {
      case 'about':
        return <AboutContent />;
      case 'experience':
        return (
          <ExperienceCarousel
            onSlideChange={setCurrentSlide}
            currentSlide={currentSlide}
          />
        );
      case 'skills':
        return (
          <SkillsCarousel
            onSlideChange={setCurrentSlide}
            currentSlide={currentSlide}
          />
        );
      case 'education':
        return (
          <EducationCarousel
            onSlideChange={setCurrentSlide}
            currentSlide={currentSlide}
          />
        );
      default:
        return (
          <ExperienceCarousel
            onSlideChange={setCurrentSlide}
            currentSlide={currentSlide}
          />
        );
    }
  };

  const carouselTabSlides: Record<string, number> = { experience: 4, skills: 3, education: 2 };

  return (
    <div className="size-full bg-slate-900">
      {/* Desktop Layout - Two Panel View */}
      <div className="hidden md:flex size-full">
        {/* Left Panel - Interactive Resume Board */}
        <div className="w-[40%] bg-slate-800 flex flex-col">
          <ProfileSection />
          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
          <div ref={desktopScrollRef} className="flex-1 overflow-y-auto p-6">
            {renderTabContent()}
          </div>
        </div>

        {/* Right Panel - AI Chat Interface */}
        <div className="w-[60%] bg-slate-900 flex flex-col">
          <div className="border-b border-slate-700 px-6 py-4 flex items-center justify-between">
            <h2 className="text-white text-lg">Chat with Dmytro's AI Assistant</h2>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-slate-400 text-sm">Online</span>
            </div>
          </div>
          <ChatInterface
            messages={messages}
            inputValue={inputValue}
            isStreaming={isStreaming}
            onInputChange={setInputValue}
            onSendMessage={handleSendMessage}
            onKeyPress={handleKeyPress}
            onPromptClick={handlePromptClick}
          />
        </div>
      </div>

      {/* Mobile Layout - Single Column with FAB */}
      <div className="md:hidden flex flex-col size-full bg-slate-800">
        <MobileProfileHeader />
        <MobileTabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        {carouselTabSlides[activeTab] && (
          <CarouselPagination
            currentSlide={currentSlide}
            totalSlides={carouselTabSlides[activeTab]}
            onDotClick={(index) => setCurrentSlide(index)}
          />
        )}

        <div ref={mobileScrollRef} className="flex-1 overflow-y-auto p-4 pb-32">
          {renderMobileTabContent()}
        </div>

        <FloatingActionButton onClick={() => setIsChatOpen(true)} />
      </div>

      {/* Mobile Chat Bottom Sheet */}
      <MobileChatBottomSheet
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        messages={messages}
        inputValue={inputValue}
        isStreaming={isStreaming}
        onInputChange={setInputValue}
        onSendMessage={handleSendMessage}
        onKeyPress={handleKeyPress}
        onPromptClick={handlePromptClick}
      />
    </div>
  );
}

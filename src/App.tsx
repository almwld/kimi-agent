import { useState, useRef, useEffect, useCallback } from 'react';
import { ReelCard } from '@/components/reels/ReelCard';
import { AdReelCard } from '@/components/ads/AdReelCard';
import { TopBar } from '@/components/TopBar';
import { BottomNav } from '@/components/BottomNav';
import { LocalVideosScreen } from '@/screens/LocalVideosScreen';
import { MerchantScreen } from '@/screens/MerchantScreen';
import { SearchScreen } from '@/screens/SearchScreen';
import { ProfileScreen } from '@/screens/ProfileScreen';
import { mockReels, mockAds, mockLocalVideos } from '@/data/mockData';
import type { FeedItem } from '@/types';
import { FeedType } from '@/types';
import './App.css';

// بناء Feed ذكي يدمج المحتوى
function buildSmartFeed(): FeedItem[] {
  const feedItems: FeedItem[] = [];
  const reels = mockReels;
  const ads = mockAds;
  const localVideos = mockLocalVideos;

  let reelIndex = 0;
  let adIndex = 0;
  let localIndex = 0;

  for (let i = 0; i < 50; i++) {
    if (i % 6 === 0 && adIndex < ads.length) {
      // إعلان كل 6 فيديوهات
      feedItems.push({ type: FeedType.AD, ad: ads[adIndex++] });
    } else if (i % 11 === 0 && localIndex < localVideos.length) {
      // فيديو محلي كل 11 فيديو
      feedItems.push({ type: FeedType.LOCAL, localVideo: localVideos[localIndex++] });
    } else if (reelIndex < reels.length) {
      // ريلز عادي
      feedItems.push({ type: FeedType.REEL, reel: reels[reelIndex++] });
    }
  }

  return feedItems;
}

// مكون الفيديو المحلي المبسط
function LocalVideoCard({ video }: { video: any }) {
  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <div 
        className="w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${video.thumbnail})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70 pointer-events-none" />

      {/* Local Badge */}
      <div className="absolute top-20 left-4">
        <div className="flex items-center gap-2 bg-black/60 px-3 py-1.5 rounded-full">
          <svg className="w-4 h-4 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          <span className="text-white/90 text-sm">من هاتفك</span>
        </div>
      </div>

      {/* Video Info */}
      <div className="absolute bottom-24 left-4 right-4">
        <h3 className="text-white text-lg font-medium mb-2 truncate">{video.name}</h3>
        <div className="flex items-center gap-4 text-white/60 text-sm">
          <span>{(video.duration / 60).toFixed(0)}:{(video.duration % 60).toString().padStart(2, '0')}</span>
          <span>{(video.size / (1024 * 1024)).toFixed(1)} MB</span>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedItems] = useState<FeedItem[]>(buildSmartFeed());
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0);

  // التعامل مع التمرير
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    const scrollTop = containerRef.current.scrollTop;
    const windowHeight = window.innerHeight;
    const newIndex = Math.round(scrollTop / windowHeight);
    
    if (newIndex !== currentIndex && newIndex >= 0 && newIndex < feedItems.length) {
      setCurrentIndex(newIndex);
    }
  }, [currentIndex, feedItems.length]);

  // Touch events للتمرير السلس
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY.current - touchEndY;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentIndex < feedItems.length - 1) {
        // التمرير للأسفل
        scrollToIndex(currentIndex + 1);
      } else if (diff < 0 && currentIndex > 0) {
        // التمرير للأعلى
        scrollToIndex(currentIndex - 1);
      }
    }
  };

  const scrollToIndex = (index: number) => {
    if (!containerRef.current) return;
    containerRef.current.scrollTo({
      top: index * window.innerHeight,
      behavior: 'smooth'
    });
    setCurrentIndex(index);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentScreen !== 'home') return;
      
      if (e.key === 'ArrowDown' && currentIndex < feedItems.length - 1) {
        scrollToIndex(currentIndex + 1);
      } else if (e.key === 'ArrowUp' && currentIndex > 0) {
        scrollToIndex(currentIndex - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, feedItems.length, currentScreen]);

  // Render الشاشة المناسبة
  const renderScreen = () => {
    switch (currentScreen) {
      case 'local':
        return <LocalVideosScreen onBack={() => setCurrentScreen('home')} />;
      case 'merchant':
        return <MerchantScreen onBack={() => setCurrentScreen('home')} />;
      case 'search':
        return <SearchScreen onBack={() => setCurrentScreen('home')} />;
      case 'profile':
        return <ProfileScreen onBack={() => setCurrentScreen('home')} />;
      case 'home':
      default:
        return (
          <>
            {/* Top Bar */}
            <TopBar 
              onNavigate={setCurrentScreen}
              currentScreen={currentScreen}
            />

            {/* Feed Container */}
            <div 
              ref={containerRef}
              onScroll={handleScroll}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="h-screen overflow-y-auto snap-y snap-mandatory"
              style={{ scrollSnapType: 'y mandatory' }}
            >
              {feedItems.map((item, index) => (
                <div 
                  key={`${item.type}-${index}`}
                  className="h-screen snap-start"
                >
                  {item.type === FeedType.REEL && item.reel && (
                    <ReelCard 
                      reel={item.reel} 
                      isActive={index === currentIndex}
                    />
                  )}
                  {item.type === FeedType.AD && item.ad && (
                    <AdReelCard 
                      ad={item.ad} 
                      isActive={index === currentIndex}
                    />
                  )}
                  {item.type === FeedType.LOCAL && item.localVideo && (
                    <LocalVideoCard 
                      video={item.localVideo}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Bottom Navigation */}
            <BottomNav 
              currentScreen={currentScreen}
              onNavigate={setCurrentScreen}
            />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-black text-white" dir="rtl">
      {renderScreen()}
    </div>
  );
}

export default App;

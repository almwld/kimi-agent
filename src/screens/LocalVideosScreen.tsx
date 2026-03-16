import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, RefreshCw, Smartphone, Video, FolderOpen } from 'lucide-react';
import type { LocalVideo } from '@/types';
import { mockLocalVideos } from '@/data/mockData';
import { Button } from '@/components/ui/button';

interface LocalVideosScreenProps {
  onBack: () => void;
}

function LocalVideoCard({ video, isActive }: { video: LocalVideo; isActive: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    if (isActive) {
      videoEl.play().catch(() => {});
    } else {
      videoEl.pause();
    }
  }, [isActive]);

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatSize = (bytes: number): string => {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="relative w-full h-screen bg-black">
      {video.thumbnail ? (
        <video
          ref={videoRef}
          src={video.path}
          poster={video.thumbnail}
          className="w-full h-full object-cover"
          loop
          playsInline
          muted
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-[#1E1E1E]">
          <Video className="w-24 h-24 text-[#333]" />
        </div>
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70 pointer-events-none" />

      {/* Video Info */}
      <div className="absolute bottom-24 left-4 right-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-2 bg-black/60 px-3 py-1.5 rounded-full">
            <Smartphone className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-white/90 text-sm">من هاتفك</span>
          </div>
        </div>
        
        <h3 className="text-white text-lg font-medium mb-2 truncate">{video.name}</h3>
        
        <div className="flex items-center gap-4 text-white/60 text-sm">
          <span>{formatDuration(video.duration)}</span>
          <span>{formatSize(video.size)}</span>
        </div>
      </div>
    </div>
  );
}

export function LocalVideosScreen({ onBack }: LocalVideosScreenProps) {
  const [videos] = useState<LocalVideo[]>(mockLocalVideos);
  const [isScanning, setIsScanning] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
    }, 2000);
  };

  const handleScroll = () => {
    if (!containerRef.current) return;
    const scrollTop = containerRef.current.scrollTop;
    const windowHeight = window.innerHeight;
    const newIndex = Math.round(scrollTop / windowHeight);
    setCurrentIndex(newIndex);
  };

  if (isScanning) {
    return (
      <div className="fixed inset-0 bg-[#1E1E1E] flex flex-col items-center justify-center z-50">
        <div className="w-16 h-16 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin mb-6" />
        <h2 className="text-white text-xl font-semibold mb-2">جاري مسح الهاتف...</h2>
        <p className="text-white/60">نبحث عن فيديوهات في معرض الصور</p>
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="fixed inset-0 bg-[#1E1E1E] flex flex-col items-center justify-center z-50 p-8">
        <div className="w-24 h-24 bg-[#333] rounded-full flex items-center justify-center mb-6">
          <FolderOpen className="w-12 h-12 text-[#666]" />
        </div>
        <h2 className="text-white text-xl font-semibold mb-2">لا توجد فيديوهات</h2>
        <p className="text-white/60 text-center mb-8">
          تأكد من وجود فيديوهات في معرض الصور أو مجلد التحميلات
        </p>
        <Button 
          onClick={handleScan}
          className="bg-[#D4AF37] hover:bg-[#B8962F] text-black font-semibold px-8 py-6 rounded-full"
        >
          <RefreshCw className="w-5 h-5 ml-2" />
          مسح مرة أخرى
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black z-50">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-4 pt-12 bg-gradient-to-b from-black/80 to-transparent">
        <button 
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <h1 className="text-white text-lg font-semibold">فيديوهات هاتفي</h1>
        <button 
          onClick={handleScan}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm"
        >
          <RefreshCw className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Videos List */}
      <div 
        ref={containerRef}
        onScroll={handleScroll}
        className="h-full overflow-y-auto snap-y snap-mandatory"
        style={{ scrollSnapType: 'y mandatory' }}
      >
        {videos.map((video, index) => (
          <div 
            key={video.id}
            className="h-screen snap-start"
          >
            <LocalVideoCard 
              video={video} 
              isActive={index === currentIndex}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
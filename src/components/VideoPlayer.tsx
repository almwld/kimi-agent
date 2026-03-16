import { useEffect, useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface VideoPlayerProps {
  videoUrl: string;
  isActive: boolean;
  poster?: string;
}

export function VideoPlayer({ videoUrl, isActive, poster }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive) {
      video.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Auto-play was prevented
        setIsPlaying(false);
      });
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, [isActive]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = isMuted;
  }, [isMuted]);

  const handleVideoClick = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play();
      setIsPlaying(true);
    }
    setShowControls(true);
    setTimeout(() => setShowControls(false), 2000);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  return (
    <div className="relative w-full h-full bg-black">
      <video
        ref={videoRef}
        src={videoUrl}
        poster={poster}
        className="w-full h-full object-cover"
        loop
        playsInline
        onLoadedData={() => setIsLoaded(true)}
        onClick={handleVideoClick}
      />
      
      {/* Loading Spinner */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="w-12 h-12 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Play/Pause Overlay */}
      {showControls && (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-300"
          onClick={handleVideoClick}
        >
          <div className="w-16 h-16 bg-black/50 rounded-full flex items-center justify-center">
            {isPlaying ? (
              <Pause className="w-8 h-8 text-white" />
            ) : (
              <Play className="w-8 h-8 text-white ml-1" />
            )}
          </div>
        </div>
      )}

      {/* Mute Button */}
      <button
        onClick={toggleMute}
        className="absolute top-4 right-4 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center transition-all hover:bg-black/70"
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5 text-white" />
        ) : (
          <Volume2 className="w-5 h-5 text-white" />
        )}
      </button>
    </div>
  );
}

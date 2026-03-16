import { useState } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, Music } from 'lucide-react';
import { VideoPlayer } from '@/components/VideoPlayer';
import type { Reel } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ReelCardProps {
  reel: Reel;
  isActive: boolean;
}

export function ReelCard({ reel, isActive }: ReelCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(reel.likes);

  const handleLike = () => {
    if (isLiked) {
      setLikeCount(prev => prev - 1);
    } else {
      setLikeCount(prev => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  const formatCount = (count: number): string => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Video Player */}
      <VideoPlayer 
        videoUrl={reel.videoUrl} 
        isActive={isActive}
        poster={reel.thumbnailUrl}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 pointer-events-none" />

      {/* Right Side Actions */}
      <div className="absolute right-4 bottom-24 flex flex-col items-center gap-6">
        {/* Profile Avatar */}
        <div className="relative">
          <Avatar className="w-12 h-12 border-2 border-white">
            <AvatarImage src={reel.author.avatar} alt={reel.author.fullName} />
            <AvatarFallback>{reel.author.fullName[0]}</AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-5 h-5 bg-[#D4AF37] rounded-full flex items-center justify-center">
            <span className="text-black text-xs font-bold">+</span>
          </div>
        </div>

        {/* Like Button */}
        <button 
          onClick={handleLike}
          className="flex flex-col items-center gap-1 group"
        >
          <div className={`w-12 h-12 rounded-full bg-black/30 flex items-center justify-center transition-all group-hover:bg-black/50 ${isLiked ? 'text-red-500' : 'text-white'}`}>
            <Heart className={`w-7 h-7 ${isLiked ? 'fill-current' : ''}`} />
          </div>
          <span className="text-white text-sm font-medium">{formatCount(likeCount)}</span>
        </button>

        {/* Comments Button */}
        <button className="flex flex-col items-center gap-1 group">
          <div className="w-12 h-12 rounded-full bg-black/30 flex items-center justify-center transition-all group-hover:bg-black/50">
            <MessageCircle className="w-7 h-7 text-white" />
          </div>
          <span className="text-white text-sm font-medium">{formatCount(reel.comments)}</span>
        </button>

        {/* Save Button */}
        <button 
          onClick={() => setIsSaved(!isSaved)}
          className="flex flex-col items-center gap-1 group"
        >
          <div className={`w-12 h-12 rounded-full bg-black/30 flex items-center justify-center transition-all group-hover:bg-black/50 ${isSaved ? 'text-[#D4AF37]' : 'text-white'}`}>
            <Bookmark className={`w-7 h-7 ${isSaved ? 'fill-current' : ''}`} />
          </div>
          <span className="text-white text-sm font-medium">حفظ</span>
        </button>

        {/* Share Button */}
        <button className="flex flex-col items-center gap-1 group">
          <div className="w-12 h-12 rounded-full bg-black/30 flex items-center justify-center transition-all group-hover:bg-black/50">
            <Share2 className="w-7 h-7 text-white" />
          </div>
          <span className="text-white text-sm font-medium">{formatCount(reel.shares)}</span>
        </button>

        {/* Music Disc */}
        <div className="w-12 h-12 rounded-full bg-black/30 flex items-center justify-center animate-spin" style={{ animationDuration: '3s' }}>
          <Music className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Bottom Info */}
      <div className="absolute left-4 right-20 bottom-8">
        {/* Author Info */}
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="w-10 h-10 border border-white/50">
            <AvatarImage src={reel.author.avatar} alt={reel.author.fullName} />
            <AvatarFallback>{reel.author.fullName[0]}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-white font-semibold">{reel.author.fullName}</span>
              {reel.author.isVerified && (
                <span className="text-[#D4AF37]">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </span>
              )}
            </div>
            <span className="text-white/70 text-sm">@{reel.author.username}</span>
          </div>
        </div>

        {/* Caption */}
        <p className="text-white text-sm mb-3 line-clamp-3 leading-relaxed">
          {reel.caption}
        </p>

        {/* Music Tag */}
        <div className="flex items-center gap-2">
          <Music className="w-4 h-4 text-white/70" />
          <span className="text-white/70 text-sm truncate">
            الصوت الأصلي - {reel.author.fullName}
          </span>
        </div>
      </div>
    </div>
  );
}

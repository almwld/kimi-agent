import { useState } from 'react';
import { Heart, MessageCircle, Share2, ShoppingCart, ExternalLink, Star, Phone } from 'lucide-react';
import { VideoPlayer } from '@/components/VideoPlayer';
import type { Ad } from '@/types';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface AdReelCardProps {
  ad: Ad;
  isActive: boolean;
}

export function AdReelCard({ ad, isActive }: AdReelCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(ad.likes);

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

  const formatPrice = (price: number): string => {
    return price.toLocaleString('ar-YE');
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Video Player */}
      <VideoPlayer 
        videoUrl={ad.videoUrl} 
        isActive={isActive}
        poster={ad.thumbnailUrl}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70 pointer-events-none" />

      {/* Ad Badge */}
      <div className="absolute top-20 left-4 z-10">
        <div className="flex items-center gap-2 bg-[#D4AF37] px-4 py-2 rounded-full">
          <Star className="w-4 h-4 text-black fill-black" />
          <span className="text-black font-bold text-sm">إعلان ممول</span>
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="absolute right-4 bottom-32 flex flex-col items-center gap-5">
        {/* Like Button */}
        <button 
          onClick={handleLike}
          className="flex flex-col items-center gap-1 group"
        >
          <div className={`w-11 h-11 rounded-full bg-black/40 flex items-center justify-center transition-all group-hover:bg-black/60 ${isLiked ? 'text-red-500' : 'text-white'}`}>
            <Heart className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} />
          </div>
          <span className="text-white text-xs font-medium">{formatCount(likeCount)}</span>
        </button>

        {/* Comments Button */}
        <button className="flex flex-col items-center gap-1 group">
          <div className="w-11 h-11 rounded-full bg-black/40 flex items-center justify-center transition-all group-hover:bg-black/60">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <span className="text-white text-xs font-medium">{formatCount(ad.comments)}</span>
        </button>

        {/* Share Button */}
        <button className="flex flex-col items-center gap-1 group">
          <div className="w-11 h-11 rounded-full bg-black/40 flex items-center justify-center transition-all group-hover:bg-black/60">
            <Share2 className="w-6 h-6 text-white" />
          </div>
          <span className="text-white text-xs font-medium">{formatCount(ad.shares)}</span>
        </button>

        {/* Shopping Cart */}
        <Dialog>
          <DialogTrigger asChild>
            <button className="flex flex-col items-center gap-1 group">
              <div className="w-12 h-12 rounded-full bg-[#D4AF37] flex items-center justify-center transition-all group-hover:scale-110">
                <ShoppingCart className="w-6 h-6 text-black" />
              </div>
              <span className="text-white text-xs font-medium">تسوق</span>
            </button>
          </DialogTrigger>
          <DialogContent className="bg-[#1E1E1E] border-[#333] text-white max-w-sm">
            <DialogHeader>
              <DialogTitle className="text-[#D4AF37] text-xl">{ad.shopName}</DialogTitle>
              <DialogDescription className="text-gray-400">
                {ad.description}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              {ad.hasPrice && (
                <div className="text-center">
                  <span className="text-3xl font-bold text-[#D4AF37]">{formatPrice(ad.price!)}</span>
                  <span className="text-white mr-2">ريال</span>
                </div>
              )}
              <div className="flex gap-2">
                {ad.whatsappNumber && (
                  <Button 
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => window.open(`https://wa.me/${ad.whatsappNumber}`, '_blank')}
                  >
                    <Phone className="w-4 h-4 ml-2" />
                    واتساب
                  </Button>
                )}
                {ad.websiteUrl && (
                  <Button 
                    className="flex-1 bg-[#D4AF37] hover:bg-[#B8962F] text-black"
                    onClick={() => window.open(ad.websiteUrl, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 ml-2" />
                    زيارة المتجر
                  </Button>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Bottom Info */}
      <div className="absolute left-4 right-20 bottom-24">
        {/* Shop Info */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-full bg-[#D4AF37] flex items-center justify-center">
            <ShoppingCart className="w-6 h-6 text-black" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-white font-bold text-lg">{ad.shopName}</span>
              {ad.isVerified && (
                <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                  موثّق
                </span>
              )}
            </div>
            <span className="text-white/70 text-sm">{ad.category}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-white text-sm mb-3 line-clamp-2 leading-relaxed">
          {ad.description}
        </p>

        {/* Price Tag */}
        {ad.hasPrice && (
          <div className="inline-flex items-center gap-2 bg-[#D4AF37]/20 border border-[#D4AF37] rounded-full px-4 py-2 mb-3">
            <span className="text-[#D4AF37] font-bold text-lg">{formatPrice(ad.price!)}</span>
            <span className="text-[#D4AF37] text-sm">ريال</span>
          </div>
        )}
      </div>

      {/* Shop Now Button */}
      <div className="absolute bottom-6 left-4 right-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button 
              className="w-full bg-[#D4AF37] hover:bg-[#B8962F] text-black font-bold py-6 rounded-full text-lg"
            >
              <ShoppingCart className="w-5 h-5 ml-2" />
              تسوق الآن
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#1E1E1E] border-[#333] text-white max-w-sm">
            <DialogHeader>
              <DialogTitle className="text-[#D4AF37] text-xl">{ad.shopName}</DialogTitle>
              <DialogDescription className="text-gray-400">
                {ad.description}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              {ad.hasPrice && (
                <div className="text-center">
                  <span className="text-3xl font-bold text-[#D4AF37]">{formatPrice(ad.price!)}</span>
                  <span className="text-white mr-2">ريال</span>
                </div>
              )}
              <div className="flex gap-2">
                {ad.whatsappNumber && (
                  <Button 
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => window.open(`https://wa.me/${ad.whatsappNumber}`, '_blank')}
                  >
                    <Phone className="w-4 h-4 ml-2" />
                    واتساب
                  </Button>
                )}
                {ad.websiteUrl && (
                  <Button 
                    className="flex-1 bg-[#D4AF37] hover:bg-[#B8962F] text-black"
                    onClick={() => window.open(ad.websiteUrl, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 ml-2" />
                    زيارة المتجر
                  </Button>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

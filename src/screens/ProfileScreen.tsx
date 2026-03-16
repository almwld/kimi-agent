import { useState } from 'react';
import { ArrowLeft, Settings, Grid, Bookmark, Heart, UserPlus, Share2 } from 'lucide-react';
import { mockReels, mockUsers } from '@/data/mockData';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ProfileScreenProps {
  onBack: () => void;
}

export function ProfileScreen({ onBack }: ProfileScreenProps) {
  const [isFollowing, setIsFollowing] = useState(false);
  const user = mockUsers[0];
  const userReels = mockReels.filter(reel => reel.author.id === user.id);
  const savedReels = mockReels.slice(0, 3);

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className="fixed inset-0 bg-[#1E1E1E] z-50 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-[#1E1E1E]/95 backdrop-blur-sm border-b border-[#333] z-10">
        <div className="flex items-center justify-between p-4 pt-12">
          <button 
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-[#333]"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-white text-lg font-semibold">{user.username}</h1>
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#333]">
            <Settings className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      <div className="p-4 pb-24">
        {/* Profile Info */}
        <div className="flex items-start gap-4 mb-6">
          <Avatar className="w-24 h-24 border-2 border-[#D4AF37]">
            <AvatarImage src={user.avatar} alt={user.fullName} />
            <AvatarFallback>{user.fullName[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-white text-xl font-bold">{user.fullName}</h2>
              {user.isVerified && (
                <span className="text-[#D4AF37]">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </span>
              )}
            </div>
            <p className="text-white/60 text-sm mb-3">@{user.username}</p>
            
            {/* Stats */}
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-white font-bold">{formatNumber(user.following)}</p>
                <p className="text-white/60 text-xs">يتابع</p>
              </div>
              <div className="text-center">
                <p className="text-white font-bold">{formatNumber(user.followers)}</p>
                <p className="text-white/60 text-xs">متابع</p>
              </div>
              <div className="text-center">
                <p className="text-white font-bold">{userReels.length}</p>
                <p className="text-white/60 text-xs">منشور</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bio */}
        <p className="text-white/80 text-sm mb-4 leading-relaxed">{user.bio}</p>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-6">
          <Button 
            onClick={() => setIsFollowing(!isFollowing)}
            className={`flex-1 font-semibold py-5 rounded-xl ${
              isFollowing 
                ? 'bg-[#333] text-white hover:bg-[#444]' 
                : 'bg-[#D4AF37] text-black hover:bg-[#B8962F]'
            }`}
          >
            {isFollowing ? 'متابَع' : 'متابعة'}
          </Button>
          <Button 
            variant="outline"
            className="flex-1 border-[#444] text-white hover:bg-[#333] py-5 rounded-xl"
          >
            <UserPlus className="w-4 h-4 ml-2" />
            رسالة
          </Button>
          <Button 
            variant="outline"
            className="border-[#444] text-white hover:bg-[#333] px-4 py-5 rounded-xl"
          >
            <Share2 className="w-4 h-4" />
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="videos" className="w-full">
          <TabsList className="w-full bg-transparent border-b border-[#333] rounded-none p-0 h-auto">
            <TabsTrigger 
              value="videos" 
              className="flex-1 data-[state=active]:bg-transparent data-[state=active]:text-[#D4AF37] data-[state=active]:border-b-2 data-[state=active]:border-[#D4AF37] text-white/60 rounded-none py-3"
            >
              <Grid className="w-5 h-5" />
            </TabsTrigger>
            <TabsTrigger 
              value="saved"
              className="flex-1 data-[state=active]:bg-transparent data-[state=active]:text-[#D4AF37] data-[state=active]:border-b-2 data-[state=active]:border-[#D4AF37] text-white/60 rounded-none py-3"
            >
              <Bookmark className="w-5 h-5" />
            </TabsTrigger>
            <TabsTrigger 
              value="liked"
              className="flex-1 data-[state=active]:bg-transparent data-[state=active]:text-[#D4AF37] data-[state=active]:border-b-2 data-[state=active]:border-[#D4AF37] text-white/60 rounded-none py-3"
            >
              <Heart className="w-5 h-5" />
            </TabsTrigger>
          </TabsList>

          <TabsContent value="videos" className="mt-4">
            {userReels.length > 0 ? (
              <div className="grid grid-cols-3 gap-1">
                {userReels.map((reel) => (
                  <div 
                    key={reel.id}
                    className="aspect-[3/4] bg-[#333] relative overflow-hidden"
                  >
                    <img
                      src={reel.thumbnailUrl}
                      alt={reel.caption}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="flex items-center gap-4 text-white">
                        <div className="flex items-center gap-1">
                          <Heart className="w-4 h-4 fill-current" />
                          <span className="text-sm">{formatNumber(reel.likes)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Grid className="w-16 h-16 text-[#333] mx-auto mb-4" />
                <p className="text-white/60">لا توجد منشورات بعد</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="saved" className="mt-4">
            <div className="grid grid-cols-3 gap-1">
              {savedReels.map((reel) => (
                <div 
                  key={reel.id}
                  className="aspect-[3/4] bg-[#333] relative overflow-hidden"
                >
                  <img
                    src={reel.thumbnailUrl}
                    alt={reel.caption}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Bookmark className="w-4 h-4 text-white fill-white" />
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="liked" className="mt-4">
            <div className="grid grid-cols-3 gap-1">
              {mockReels.slice(3, 6).map((reel) => (
                <div 
                  key={reel.id}
                  className="aspect-[3/4] bg-[#333] relative overflow-hidden"
                >
                  <img
                    src={reel.thumbnailUrl}
                    alt={reel.caption}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

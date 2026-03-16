import { useState } from 'react';
import { ArrowLeft, Search, TrendingUp, Hash, X } from 'lucide-react';
import { mockReels, mockUsers } from '@/data/mockData';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface SearchScreenProps {
  onBack: () => void;
}

const trendingTags = [
  { tag: 'يمن', count: '125K' },
  { tag: 'صنعاء', count: '89K' },
  { tag: 'أزياء', count: '67K' },
  { tag: 'طبخ', count: '54K' },
  { tag: 'تقنية', count: '43K' },
  { tag: 'عدن', count: '38K' },
  { tag: 'جمال', count: '32K' },
  { tag: 'تسوق', count: '28K' },
];

const recentSearches = [
  'هواتف',
  'أزياء رمضان',
  'وصفات يمنية',
];

export function SearchScreen({ onBack }: SearchScreenProps) {
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);

  const filteredUsers = mockUsers.filter(user => 
    user.fullName.includes(query) || user.username.includes(query)
  );

  const filteredReels = mockReels.filter(reel =>
    reel.caption.includes(query) || reel.tags.some(tag => tag.includes(query))
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setShowResults(true);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#1E1E1E] z-50 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-[#1E1E1E]/95 backdrop-blur-sm border-b border-[#333] z-10">
        <div className="flex items-center gap-4 p-4 pt-12">
          <button 
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-[#333]"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <form onSubmit={handleSearch} className="flex-1">
            <div className="relative">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  if (!e.target.value) setShowResults(false);
                }}
                placeholder="بحث..."
                className="w-full bg-[#333] border border-[#444] rounded-full pr-12 pl-10 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[#D4AF37]"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery('');
                    setShowResults(false);
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2"
                >
                  <X className="w-5 h-5 text-white/40" />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      <div className="p-4 pb-24">
        {!showResults ? (
          <>
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-white font-semibold">عمليات البحث الأخيرة</h2>
                  <button className="text-[#D4AF37] text-sm">مسح</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setQuery(search);
                        setShowResults(true);
                      }}
                      className="bg-[#333] text-white px-4 py-2 rounded-full text-sm hover:bg-[#444] transition-all"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Trending Tags */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-[#D4AF37]" />
                <h2 className="text-white font-semibold">الأكثر تداولاً</h2>
              </div>
              <div className="space-y-3">
                {trendingTags.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setQuery(item.tag);
                      setShowResults(true);
                    }}
                    className="w-full flex items-center justify-between p-3 bg-[#252525] rounded-xl hover:bg-[#333] transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#D4AF37]/20 rounded-full flex items-center justify-center">
                        <Hash className="w-5 h-5 text-[#D4AF37]" />
                      </div>
                      <span className="text-white font-medium">{item.tag}</span>
                    </div>
                    <span className="text-white/40 text-sm">{item.count} منشور</span>
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="space-y-6">
            {/* Users Results */}
            {filteredUsers.length > 0 && (
              <div>
                <h2 className="text-white/60 text-sm mb-3">المستخدمون</h2>
                <div className="space-y-3">
                  {filteredUsers.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center gap-4 p-3 bg-[#252525] rounded-xl"
                    >
                      <Avatar className="w-14 h-14">
                        <AvatarImage src={user.avatar} alt={user.fullName} />
                        <AvatarFallback>{user.fullName[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-white font-semibold">{user.fullName}</span>
                          {user.isVerified && (
                            <span className="text-[#D4AF37]">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            </span>
                          )}
                        </div>
                        <span className="text-white/60 text-sm">@{user.username}</span>
                        <p className="text-white/40 text-xs mt-1">{user.followers.toLocaleString('ar-YE')} متابع</p>
                      </div>
                      <button className="bg-[#D4AF37] text-black px-4 py-2 rounded-full text-sm font-semibold">
                        متابعة
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Videos Results */}
            {filteredReels.length > 0 && (
              <div>
                <h2 className="text-white/60 text-sm mb-3">الفيديوهات</h2>
                <div className="grid grid-cols-2 gap-3">
                  {filteredReels.map((reel) => (
                    <div
                      key={reel.id}
                      className="aspect-[3/4] bg-[#333] rounded-xl overflow-hidden relative"
                    >
                      <img
                        src={reel.thumbnailUrl}
                        alt={reel.caption}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <p className="text-white text-sm line-clamp-2">{reel.caption}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Avatar className="w-6 h-6">
                            <AvatarImage src={reel.author.avatar} />
                            <AvatarFallback>{reel.author.fullName[0]}</AvatarFallback>
                          </Avatar>
                          <span className="text-white/70 text-xs">{reel.author.fullName}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {filteredUsers.length === 0 && filteredReels.length === 0 && (
              <div className="text-center py-12">
                <Search className="w-16 h-16 text-[#333] mx-auto mb-4" />
                <p className="text-white/60">لا توجد نتائج لـ "{query}"</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

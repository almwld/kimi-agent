import { useState } from 'react';
import { ArrowLeft, Store, TrendingUp, Package, Users, Star, Phone, Mail, MapPin, ChevronLeft } from 'lucide-react';
import { mockMerchants, mockAds } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface MerchantScreenProps {
  onBack: () => void;
}

export function MerchantScreen({ onBack }: MerchantScreenProps) {
  const [showRegister, setShowRegister] = useState(false);
  const merchants = mockMerchants;
  const ads = mockAds;

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  if (showRegister) {
    return (
      <div className="fixed inset-0 bg-[#1E1E1E] z-50 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-[#1E1E1E]/95 backdrop-blur-sm border-b border-[#333] z-10">
          <div className="flex items-center gap-4 p-4 pt-12">
            <button 
              onClick={() => setShowRegister(false)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-[#333]"
            >
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
            <h1 className="text-white text-xl font-bold">تسجيل كتاجر</h1>
          </div>
        </div>

        {/* Registration Form */}
        <div className="p-6 space-y-6">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-[#D4AF37]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Store className="w-10 h-10 text-[#D4AF37]" />
            </div>
            <h2 className="text-white text-2xl font-bold mb-2">انضم إلى بازار ريلز</h2>
            <p className="text-white/60">وصل منتجاتك لآلاف المشاهدين يومياً</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-white/80 text-sm mb-2 block">اسم المتجر</label>
              <input 
                type="text"
                placeholder="مثال: موبايلي ستور"
                className="w-full bg-[#333] border border-[#444] rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            <div>
              <label className="text-white/80 text-sm mb-2 block">الاسم الكامل</label>
              <input 
                type="text"
                placeholder="الاسم الثلاثي"
                className="w-full bg-[#333] border border-[#444] rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            <div>
              <label className="text-white/80 text-sm mb-2 block">رقم الهاتف</label>
              <input 
                type="tel"
                placeholder="+967xxxxxxxx"
                className="w-full bg-[#333] border border-[#444] rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            <div>
              <label className="text-white/80 text-sm mb-2 block">البريد الإلكتروني</label>
              <input 
                type="email"
                placeholder="example@email.com"
                className="w-full bg-[#333] border border-[#444] rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            <div>
              <label className="text-white/80 text-sm mb-2 block">نوع النشاط التجاري</label>
              <select className="w-full bg-[#333] border border-[#444] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]">
                <option value="">اختر النشاط</option>
                <option value="phones">هواتف وإلكترونيات</option>
                <option value="fashion">أزياء وموضة</option>
                <option value="food">مطاعم ومأكولات</option>
                <option value="supermarket">سوبر ماركت</option>
                <option value="pharmacy">صيدلية</option>
                <option value="other">أخرى</option>
              </select>
            </div>
          </div>

          <Button 
            className="w-full bg-[#D4AF37] hover:bg-[#B8962F] text-black font-bold py-6 rounded-xl text-lg mt-6"
            onClick={() => setShowRegister(false)}
          >
            إرسال الطلب
          </Button>

          <p className="text-white/40 text-sm text-center">
            بالتسجيل، أنت توافق على شروط الاستخدام وسياسة الخصوصية
          </p>
        </div>
      </div>
    );
  }

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
          <h1 className="text-white text-xl font-bold">منطقة التجار</h1>
          <div className="w-10" />
        </div>
      </div>

      <div className="p-4 space-y-6 pb-24">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-[#D4AF37]/20 to-[#D4AF37]/5 border border-[#D4AF37]/30 rounded-2xl p-6 text-center">
          <Store className="w-16 h-16 text-[#D4AF37] mx-auto mb-4" />
          <h2 className="text-white text-2xl font-bold mb-2">أعلن في بازار ريلز</h2>
          <p className="text-white/70 mb-6">وصل منتجاتك لأكثر من 100,000 مستخدم يومياً</p>
          <Button 
            onClick={() => setShowRegister(true)}
            className="bg-[#D4AF37] hover:bg-[#B8962F] text-black font-bold px-8 py-6 rounded-full"
          >
            سجل كتاجر الآن
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="bg-[#252525] border-[#333]">
            <CardContent className="p-4 text-center">
              <Users className="w-6 h-6 text-[#D4AF37] mx-auto mb-2" />
              <p className="text-white text-xl font-bold">100K+</p>
              <p className="text-white/60 text-xs">مستخدم نشط</p>
            </CardContent>
          </Card>
          <Card className="bg-[#252525] border-[#333]">
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-6 h-6 text-[#D4AF37] mx-auto mb-2" />
              <p className="text-white text-xl font-bold">5M+</p>
              <p className="text-white/60 text-xs">مشاهدة يومية</p>
            </CardContent>
          </Card>
          <Card className="bg-[#252525] border-[#333]">
            <CardContent className="p-4 text-center">
              <Package className="w-6 h-6 text-[#D4AF37] mx-auto mb-2" />
              <p className="text-white text-xl font-bold">500+</p>
              <p className="text-white/60 text-xs">متجر نشط</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="merchants" className="w-full">
          <TabsList className="w-full bg-[#252525] p-1 rounded-xl">
            <TabsTrigger 
              value="merchants" 
              className="flex-1 data-[state=active]:bg-[#333] data-[state=active]:text-[#D4AF37] text-white rounded-lg"
            >
              المتاجر
            </TabsTrigger>
            <TabsTrigger 
              value="ads"
              className="flex-1 data-[state=active]:bg-[#333] data-[state=active]:text-[#D4AF37] text-white rounded-lg"
            >
              الإعلانات
            </TabsTrigger>
          </TabsList>

          <TabsContent value="merchants" className="mt-4 space-y-3">
            {merchants.map((merchant) => (
              <Dialog key={merchant.id}>
                <DialogTrigger asChild>
                  <div className="bg-[#252525] border border-[#333] rounded-xl p-4 flex items-center gap-4 cursor-pointer hover:border-[#D4AF37]/50 transition-all">
                    <div className="w-16 h-16 rounded-full bg-[#333] overflow-hidden">
                      <img 
                        src={merchant.logo} 
                        alt={merchant.shopName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-white font-semibold">{merchant.shopName}</h3>
                        {merchant.isVerified && (
                          <Star className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
                        )}
                      </div>
                      <p className="text-white/60 text-sm">{merchant.category}</p>
                      <div className="flex items-center gap-4 mt-1 text-white/40 text-xs">
                        <span>{formatNumber(merchant.totalViews)} مشاهدة</span>
                        <span>{merchant.adsCount} إعلان</span>
                      </div>
                    </div>
                    <ChevronLeft className="w-5 h-5 text-white/40" />
                  </div>
                </DialogTrigger>
                <DialogContent className="bg-[#1E1E1E] border-[#333] text-white max-w-sm">
                  <DialogHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded-full bg-[#333] overflow-hidden">
                        <img 
                          src={merchant.logo} 
                          alt={merchant.shopName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <DialogTitle className="text-[#D4AF37] text-xl flex items-center gap-2">
                          {merchant.shopName}
                          {merchant.isVerified && (
                            <Star className="w-5 h-5 text-[#D4AF37] fill-[#D4AF37]" />
                          )}
                        </DialogTitle>
                        <p className="text-white/60">{merchant.category}</p>
                      </div>
                    </div>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <div className="flex items-center gap-3 text-white/80">
                      <MapPin className="w-5 h-5 text-[#D4AF37]" />
                      <span>{merchant.address}</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/80">
                      <Phone className="w-5 h-5 text-[#D4AF37]" />
                      <span>{merchant.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/80">
                      <Mail className="w-5 h-5 text-[#D4AF37]" />
                      <span>{merchant.email}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-4">
                      <div className="bg-[#252525] rounded-xl p-3 text-center">
                        <p className="text-[#D4AF37] text-xl font-bold">{formatNumber(merchant.totalViews)}</p>
                        <p className="text-white/60 text-sm">مشاهدة</p>
                      </div>
                      <div className="bg-[#252525] rounded-xl p-3 text-center">
                        <p className="text-[#D4AF37] text-xl font-bold">{merchant.adsCount}</p>
                        <p className="text-white/60 text-sm">إعلان</p>
                      </div>
                    </div>
                    <Button className="w-full bg-[#D4AF37] hover:bg-[#B8962F] text-black font-bold">
                      تواصل مع المتجر
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </TabsContent>

          <TabsContent value="ads" className="mt-4 space-y-3">
            {ads.map((ad) => (
              <div 
                key={ad.id}
                className="bg-[#252525] border border-[#333] rounded-xl overflow-hidden"
              >
                <div className="aspect-video bg-[#333]">
                  <img 
                    src={ad.thumbnailUrl} 
                    alt={ad.shopName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-[#D4AF37] text-black text-xs px-2 py-0.5 rounded-full font-bold">
                      إعلان
                    </span>
                    <span className="text-white/60 text-sm">{ad.shopName}</span>
                  </div>
                  <p className="text-white text-sm line-clamp-2">{ad.description}</p>
                  {ad.hasPrice && (
                    <p className="text-[#D4AF37] font-bold mt-2">{ad.price?.toLocaleString('ar-YE')} ريال</p>
                  )}
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

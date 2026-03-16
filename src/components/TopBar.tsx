import { useState } from 'react';
import { Menu, Search, Bell, Video, Store, TrendingUp, User, Settings, LogOut } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

interface TopBarProps {
  onNavigate: (screen: string) => void;
  currentScreen: string;
}

export function TopBar({ onNavigate, currentScreen }: TopBarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { icon: Video, label: 'فيديوهات هاتفي', screen: 'local' },
    { icon: Store, label: 'أعلن معنا (للتجار)', screen: 'merchant' },
    { icon: TrendingUp, label: 'الإعلانات المميزة', screen: 'ads' },
    { icon: User, label: 'الملف الشخصي', screen: 'profile' },
    { icon: Settings, label: 'الإعدادات', screen: 'settings' },
  ];

  return (
    <div className="absolute top-0 left-0 right-0 z-50 px-4 pt-12 pb-4">
      <div className="flex items-center justify-between">
        {/* Menu Button */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-sm transition-all hover:bg-black/50">
              <Menu className="w-6 h-6 text-white" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-[#1E1E1E] border-[#333] w-80">
            <SheetHeader>
              <SheetTitle className="text-[#D4AF37] text-2xl font-bold text-right">
                بازار ريلز
              </SheetTitle>
            </SheetHeader>
            <div className="mt-8 space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.screen}
                  onClick={() => {
                    onNavigate(item.screen);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all ${
                    currentScreen === item.screen 
                      ? 'bg-[#D4AF37]/20 text-[#D4AF37]' 
                      : 'text-white hover:bg-white/5'
                  }`}
                >
                  <item.icon className="w-6 h-6" />
                  <span className="text-lg font-medium">{item.label}</span>
                </button>
              ))}
              <div className="border-t border-[#333] my-4" />
              <button className="w-full flex items-center gap-4 p-4 rounded-xl text-red-400 hover:bg-red-500/10 transition-all">
                <LogOut className="w-6 h-6" />
                <span className="text-lg font-medium">تسجيل الخروج</span>
              </button>
            </div>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <div className="flex flex-col items-center">
          <h1 className="text-[#D4AF37] text-2xl font-bold tracking-wide">بــازار</h1>
          <span className="text-white/60 text-xs tracking-[0.3em]">REELS</span>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <button 
            onClick={() => onNavigate('search')}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-sm transition-all hover:bg-black/50"
          >
            <Search className="w-5 h-5 text-white" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-sm transition-all hover:bg-black/50 relative">
            <Bell className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center text-white font-bold">
              3
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

import { Home, Search, PlusSquare, User, ShoppingBag } from 'lucide-react';

interface BottomNavProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
}

export function BottomNav({ currentScreen, onNavigate }: BottomNavProps) {
  const navItems = [
    { id: 'home', icon: Home, label: 'الرئيسية' },
    { id: 'search', icon: Search, label: 'بحث' },
    { id: 'upload', icon: PlusSquare, label: 'نشر' },
    { id: 'merchant', icon: ShoppingBag, label: 'التجار' },
    { id: 'profile', icon: User, label: 'حسابي' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-lg border-t border-white/10">
      <div className="flex items-center justify-around py-3 px-4 max-w-lg mx-auto">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex flex-col items-center gap-1 transition-all ${
              currentScreen === item.id 
                ? 'text-[#D4AF37]' 
                : 'text-white/60 hover:text-white'
            }`}
          >
            <item.icon 
              className={`w-6 h-6 ${currentScreen === item.id ? 'stroke-[2.5px]' : 'stroke-2'}`} 
            />
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

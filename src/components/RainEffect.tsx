import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gift, Heart } from 'lucide-react';

interface RainEffectProps {
  text: string;
  onWish?: (wish: string) => void;
}

const WISHES = [
    "Chúc bạn luôn xinh đẹp rạng ngời!",
    "Chúc bạn hạnh phúc ngập tràn!",
    "Chúc bạn luôn vui vẻ và yêu đời!",
    "Chúc bạn thành công trong mọi dự định!",
    "Chúc bạn nhận được thật nhiều quà!",
    "Chúc bạn mãi tươi trẻ như tuổi đôi mươi!",
    "Chúc bạn luôn được yêu thương!",
    "Chúc bạn một ngày 8/3 ý nghĩa!",
    "Chúc bạn luôn gặp may mắn!",
    "Chúc bạn luôn là chính mình tuyệt vời nhất!"
];

export default function RainEffect({ text, onWish }: RainEffectProps) {
  const [drops, setDrops] = useState<{ id: number; x: number; delay: number; duration: number; type: 'text' | 'gift' | 'heart' }[]>([]);

  useEffect(() => {
    // Create initial drops
    const initialDrops = Array.from({ length: 50 }).map((_, i) => {
        const rand = Math.random();
        let type: 'text' | 'gift' | 'heart' = 'text';
        if (rand > 0.6) type = 'heart';
        if (rand > 0.85) type = 'gift';

        return {
            id: i,
            x: Math.random() * 100, // percentage
            delay: Math.random() * 5,
            duration: 4 + Math.random() * 4,
            type
        };
    });
    setDrops(initialDrops);
  }, []);

  const handleGiftClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent clicking through
    if (onWish) {
        const randomWish = WISHES[Math.floor(Math.random() * WISHES.length)];
        onWish(randomWish);
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {drops.map((drop) => (
        <motion.div
          key={drop.id}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: '110vh', opacity: [0, 1, 1, 0] }}
          transition={{
            repeat: Infinity,
            duration: drop.duration,
            delay: drop.delay,
            ease: "linear"
          }}
          className={`absolute select-none ${drop.type === 'gift' ? 'pointer-events-auto cursor-pointer hover:scale-125 transition-transform' : ''}`}
          style={{ left: `${drop.x}%` }}
          onClick={drop.type === 'gift' ? handleGiftClick : undefined}
        >
          {drop.type === 'text' && <span className="text-pink-300/40 font-mono text-sm">{text}</span>}
          {drop.type === 'heart' && <Heart size={16} className="text-red-400/50 fill-red-400/50" />}
          {drop.type === 'gift' && (
            <div className="relative group">
                <Gift size={60} className="text-blue-500 fill-blue-200 drop-shadow-md animate-bounce" />
                <div className="absolute inset-0 bg-white/30 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}

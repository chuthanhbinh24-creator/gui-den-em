import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface CursorEffectsProps {
  enabled: boolean;
}

export default function CursorEffects({ enabled }: CursorEffectsProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);

  useEffect(() => {
    if (!enabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      setTrail(prev => [
        ...prev.slice(-15), // Keep last 15 points
        { x: e.clientX, y: e.clientY, id: performance.now() + Math.random() }
      ]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Rotating Hearts around cursor */}
      <motion.div
        className="absolute"
        animate={{
          x: mousePos.x - 20, // Center offset
          y: mousePos.y - 20,
        }}
        transition={{ type: "tween", ease: "linear", duration: 0.05 }}
      >
        <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            className="relative w-10 h-10"
        >
            {/* Inner Ring */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
                <div 
                    key={`inner-${i}`} 
                    className="absolute top-0 left-0 w-full h-full text-pink-500"
                    style={{ transform: `rotate(${deg}deg) translateY(-25px) scale(${i % 2 === 0 ? 0.8 : 0.6})` }}
                >
                    ❤️
                </div>
            ))}
            {/* Middle Ring */}
            {[22, 67, 112, 157, 202, 247, 292, 337].map((deg, i) => (
                <div 
                    key={`middle-${i}`} 
                    className="absolute top-0 left-0 w-full h-full text-pink-400/80"
                    style={{ transform: `rotate(${deg}deg) translateY(-40px) scale(${i % 2 === 0 ? 0.6 : 0.4})` }}
                >
                    ❤️
                </div>
            ))}
            {/* Outer Ring */}
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => (
                <div 
                    key={`outer-${i}`} 
                    className="absolute top-0 left-0 w-full h-full text-pink-300/60"
                    style={{ transform: `rotate(${deg}deg) translateY(-55px) scale(${i % 2 === 0 ? 0.5 : 0.3})` }}
                >
                    ❤️
                </div>
            ))}
        </motion.div>
      </motion.div>

      {/* Trail Effect */}
      {trail.map((point, index) => (
        <motion.div
          key={point.id}
          initial={{ opacity: 0.8, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute w-4 h-4 rounded-full bg-pink-400 blur-sm"
          style={{ left: point.x, top: point.y }}
        />
      ))}
    </div>
  );
}

import { motion } from 'motion/react';
import Magnetic from './Magnetic';

interface PhotoFrameProps {
  src: string;
  index: number;
  onClick: () => void;
  delay: number;
}

export default function PhotoFrame({ src, index, onClick, delay }: PhotoFrameProps) {
  // Symmetrical positioning logic handled by parent, this component handles the frame look and sway
  
  return (
    <Magnetic onClick={onClick} className="cursor-pointer relative group">
      <motion.div
        initial={{ scale: 0, opacity: 0, y: 50 }}
        animate={{ 
          scale: 1, 
          opacity: 1, 
          y: 0,
          rotate: [0, 2, 0, -2, 0] // Swaying effect
        }}
        transition={{
          scale: { delay: delay, duration: 0.5, type: "spring" },
          opacity: { delay: delay, duration: 0.5 },
          y: { delay: delay, duration: 0.5 },
          rotate: {
            repeat: Infinity,
            duration: 4 + (index % 2), // Randomize slightly
            ease: "easeInOut",
            delay: delay + 1 // Start swaying after appearing
          }
        }}
        className="relative bg-white p-2 md:p-3 rounded-xl md:rounded-2xl shadow-lg overflow-hidden border-2 md:border-4 border-pink-200 w-36 h-52 sm:w-52 sm:h-72 md:w-64 md:h-96"
      >
        <div className="w-full h-full rounded-lg md:rounded-xl overflow-hidden relative">
            <img 
                src={src} 
                alt={`Memory ${index}`} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-pink-500/0 group-hover:bg-pink-500/10 transition-colors duration-300" />
        </div>
      </motion.div>
    </Magnetic>
  );
}

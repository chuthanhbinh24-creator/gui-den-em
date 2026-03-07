import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Magnetic from './Magnetic';

interface GiftBoxProps {
  onOpen: (date: string) => void;
}

export default function GiftBox({ onOpen }: GiftBoxProps) {
  const [date, setDate] = useState('');
  const [isOpening, setIsOpening] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleSubmit = () => {
    if (date) {
      setIsOpening(true);
      setTimeout(() => {
        onOpen(date);
      }, 2000); // Wait for animation
    }
  };

  const handleBoxClick = () => {
    setShowHint(true);
    setTimeout(() => setShowHint(false), 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-pink-50 relative overflow-hidden">
      <AnimatePresence>
        {!isOpening ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 5, opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="flex flex-col items-center z-10"
          >
            <Magnetic>
                <div className="relative cursor-pointer group w-40 h-40" onClick={handleBoxClick}>
                    {/* Hint Message */}
                    <AnimatePresence>
                        {showHint && (
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: -50 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white/90 px-4 py-2 rounded-full shadow-lg border border-pink-200 text-pink-600 font-medium z-50 pointer-events-none"
                            >
                                Nhập ngày sinh của bạn
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-3 h-3 bg-white border-r border-b border-pink-200" />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Custom Gift Box Construction */}
                    <div className="relative w-full h-full">
                        {/* Box Body */}
                        <div className="absolute bottom-0 w-full h-3/4 bg-pink-500 rounded-b-lg shadow-xl border-2 border-pink-600">
                             <div className="absolute left-1/2 -translate-x-1/2 w-8 h-full bg-pink-300/50" />
                        </div>
                        
                        {/* Box Lid */}
                        <motion.div 
                            className="absolute top-4 w-[110%] -left-[5%] h-1/4 bg-pink-600 rounded-lg shadow-md border-2 border-pink-700 z-10"
                            animate={isOpening ? { y: -100, rotate: -20, opacity: 0 } : { y: 0 }}
                            transition={{ duration: 1 }}
                        >
                            <div className="absolute left-1/2 -translate-x-1/2 w-8 h-full bg-pink-300/50" />
                            {/* Bow */}
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-8">
                                <div className="absolute left-0 w-6 h-6 rounded-full border-4 border-pink-400 rotate-45" />
                                <div className="absolute right-0 w-6 h-6 rounded-full border-4 border-pink-400 -rotate-45" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </Magnetic>

            <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ delay: 0.5 }}
                className="mt-12 bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-pink-100 flex flex-col items-center gap-4"
            >
                <label className="text-pink-800 font-medium text-sm">Nhập ngày sinh của bạn</label>
                <Magnetic>
                    <input 
                        type="date" 
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="px-4 py-2 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white/50 text-pink-900 w-full"
                    />
                </Magnetic>
                
                {date && (
                    <motion.button
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSubmit}
                        className="px-6 py-2 bg-pink-500 text-white rounded-full font-medium shadow-lg hover:bg-pink-600 transition-colors"
                    >
                        Mở quà
                    </motion.button>
                )}
            </motion.div>
          </motion.div>
        ) : (
            <motion.div 
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                {/* Explosion particles or light effect could go here */}
                <div className="w-[500px] h-[500px] bg-pink-400 rounded-full blur-[100px] opacity-20 animate-pulse" />
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

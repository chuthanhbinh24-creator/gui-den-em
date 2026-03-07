import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play } from 'lucide-react';
import GiftBox from './components/GiftBox';
import PhotoFrame from './components/PhotoFrame';
import Letter from './components/Letter';
import VideoModal from './components/VideoModal';
import AudioControl from './components/AudioControl';
import Magnetic from './components/Magnetic';
import RainEffect from './components/RainEffect';
import CursorEffects from './components/CursorEffects';

// Placeholder images
const PHOTOS = [
  "https://files.catbox.moe/p1qu8n.jpg",
  "https://files.catbox.moe/k3bp8p.jpg",
  "https://files.catbox.moe/x1rzvz.jpg",
  "https://files.catbox.moe/y9wuvb.jpg",
];

// Custom Video Link - Replace this with your own video URL
const VIDEO_URL = "https://www.dropbox.com/scl/fi/1pnzngn597ynp47bj7c0a/lv_7608946151756205328_20260306003939.mp4?rlkey=5qwg7uxa7rx3q43e1m5ip92hz&st=l7vtp5b3&raw=1";

// Custom Audio Link - Replace this with your own audio URL
const AUDIO_URL = "https://meaningful-yellow-ferdenpkfe.edgeone.app/Ng%C3%A0y%20N%C3%A0y%20N%C4%83m%20%E1%BA%A4y%20-%20Vi%E1%BB%87t%20Anh%20%20Ballad%20T%C3%A2m%20Tr%E1%BA%A1ng%20C%E1%BB%B1c%20Chill%20%20Tr%E1%BA%A1m%20C%E1%BA%A3m%20X%C3%BAc%20-%20Tr%E1%BA%A1m%20C%E1%BA%A3m%20X%C3%BAc.mp3";

export default function App() {
  const [appState, setAppState] = useState<'loading' | 'intro' | 'main'>('loading');
  const [showVideoTrigger, setShowVideoTrigger] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [birthDate, setBirthDate] = useState('');
  const [currentWish, setCurrentWish] = useState<string | null>(null);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setAppState('intro');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleLetterCloseComplete = () => {
    setTimeout(() => {
      setShowVideoTrigger(true);
    }, 500);
  };

  const handleGiftOpen = (date: string) => {
    setBirthDate(date);
    setAppState('main');
  };

  const handleWish = (wish: string) => {
    setCurrentWish(wish);
    setTimeout(() => setCurrentWish(null), 3000);
  };

  return (
    <div className="min-h-screen bg-pink-50 overflow-hidden font-sans text-gray-900 selection:bg-pink-200 cursor-none">
      <AudioControl audioSrc={AUDIO_URL} isVideoOpen={isVideoOpen} />
      <CursorEffects enabled={true} />

      {/* Wish Toast */}
      <AnimatePresence>
        {currentWish && (
            <motion.div
                initial={{ opacity: 0, y: -50, scale: 0.5 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.8 }}
                className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] bg-white/90 backdrop-blur-md px-8 py-4 rounded-full shadow-2xl border-2 border-pink-300"
            >
                <p className="text-pink-600 font-script text-2xl font-bold text-center whitespace-nowrap">
                    {currentWish}
                </p>
            </motion.div>
        )}
      </AnimatePresence>

      {/* Loading Screen */}
      <AnimatePresence>
        {appState === 'loading' && (
          <motion.div
            key="loading"
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-pink-100 z-50"
          >
            <div className="flex flex-col items-center gap-4">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    className="w-16 h-16 border-4 border-pink-300 border-t-pink-600 rounded-full"
                />
                <p className="text-pink-600 font-medium animate-pulse">Đang tải yêu thương...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Intro Screen */}
      {appState === 'intro' && (
        <GiftBox onOpen={handleGiftOpen} />
      )}

      {/* Main Screen */}
      {appState === 'main' && (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative min-h-screen w-full flex flex-col items-center justify-center p-4"
        >
            <RainEffect text={birthDate} onWish={handleWish} />

            {/* Background Decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div 
                    animate={{ 
                        scale: [1, 1.2, 1],
                        x: [0, 20, 0],
                        y: [0, -20, 0],
                    }}
                    transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
                    className="absolute top-10 left-10 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30" 
                />
                <motion.div 
                    animate={{ 
                        scale: [1, 1.1, 1],
                        x: [0, -30, 0],
                        y: [0, 20, 0],
                    }}
                    transition={{ repeat: Infinity, duration: 8, ease: "easeInOut", delay: 2 }}
                    className="absolute top-10 right-10 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30" 
                />
                <motion.div 
                    animate={{ 
                        scale: [1, 1.3, 1],
                        x: [0, 40, 0],
                        y: [0, -10, 0],
                    }}
                    transition={{ repeat: Infinity, duration: 9, ease: "easeInOut", delay: 4 }}
                    className="absolute -bottom-8 left-20 w-64 h-64 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30" 
                />
            </div>

            <div className="relative z-10 w-full max-w-6xl h-[80vh] flex flex-col items-center justify-center">
                <motion.h1 
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-5xl md:text-7xl font-bold text-pink-600 mb-12 text-center drop-shadow-sm font-script"
                >
                    Chúc Mừng Ngày Quốc Tế Phụ Nữ 8-3
                </motion.h1>

                <div className="relative w-full flex justify-center items-end gap-2 md:gap-12 h-[350px] md:h-[500px]">
                    {/* Left Photos */}
                    <div className="flex gap-2 md:gap-8 items-end">
                        <div className="mb-8 md:mb-12"> {/* Back frame higher */}
                             <PhotoFrame 
                                src={PHOTOS[0]} 
                                index={0} 
                                onClick={() => setSelectedPhotoIndex(0)} 
                                delay={0.2}
                            />
                        </div>
                        <div className="mb-0"> {/* Front frame lower */}
                            <PhotoFrame 
                                src={PHOTOS[1]} 
                                index={1} 
                                onClick={() => setSelectedPhotoIndex(1)} 
                                delay={0.4}
                            />
                        </div>
                    </div>

                    {/* Center Letter */}
                    <div className="mb-2 md:mb-4 z-20 shrink-0">
                        <Letter 
                            onCloseComplete={handleLetterCloseComplete} 
                            delay={1.0}
                            content={`Helloooooooooooooooo

Cũng không có gì đặc biệt.
Ờm thì...

Chúc em ngày 8/3 vui vẻ, luôn xinh đẹp và hạnh phúc bên người mà em yêu. Mong em lúc nào cũng nở nụ cười và gặp nhiều điều tốt đẹp trên con đường mà em đã chọn.`}
                        />
                    </div>

                    {/* Right Photos */}
                    <div className="flex gap-2 md:gap-8 items-end">
                        <div className="mb-0"> {/* Front frame lower */}
                            <PhotoFrame 
                                src={PHOTOS[2]} 
                                index={2} 
                                onClick={() => setSelectedPhotoIndex(2)} 
                                delay={0.6}
                            />
                        </div>
                        <div className="mb-8 md:mb-12"> {/* Back frame higher */}
                            <PhotoFrame 
                                src={PHOTOS[3]} 
                                index={3} 
                                onClick={() => setSelectedPhotoIndex(3)} 
                                delay={0.8}
                            />
                        </div>
                    </div>
                </div>

                {/* Video Trigger Button */}
                <AnimatePresence>
                    {showVideoTrigger && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="mt-12"
                        >
                            <Magnetic onClick={() => setIsVideoOpen(true)}>
                                <button className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full shadow-lg hover:shadow-xl transition-shadow font-medium">
                                    <Play size={20} fill="currentColor" />
                                    Xem video kỷ niệm
                                </button>
                            </Magnetic>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
      )}

      {/* Photo Lightbox */}
      <AnimatePresence>
        {selectedPhotoIndex !== null && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-auto"
                onClick={() => setSelectedPhotoIndex(null)}
            >
                <button 
                    className="absolute top-4 right-4 text-white p-2 hover:bg-white/20 rounded-full"
                    onClick={() => setSelectedPhotoIndex(null)}
                >
                    <X size={32} />
                </button>
                
                <motion.img
                    key={selectedPhotoIndex}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    src={PHOTOS[selectedPhotoIndex]}
                    className="max-w-full max-h-[90vh] rounded-lg shadow-2xl object-contain"
                    onClick={(e) => e.stopPropagation()}
                />

                {/* Navigation hints could go here */}
                <div className="absolute bottom-8 flex gap-2">
                    {PHOTOS.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedPhotoIndex(idx);
                            }}
                            className={`w-3 h-3 rounded-full transition-colors ${idx === selectedPhotoIndex ? 'bg-white' : 'bg-white/30 hover:bg-white/50'}`}
                        />
                    ))}
                </div>
            </motion.div>
        )}
      </AnimatePresence>

      {/* Video Modal */}
      <VideoModal 
        isOpen={isVideoOpen} 
        onClose={() => setIsVideoOpen(false)} 
        videoSrc={VIDEO_URL}
      />

    </div>
  );
}

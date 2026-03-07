import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, X, Play } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc?: string;
}

export default function VideoModal({ isOpen, onClose, videoSrc }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.play().catch(e => console.log("Autoplay prevented", e));
    }
  }, [isOpen]);

  const handleEnded = () => {
    onClose();
  };

  const isGoogleDrive = videoSrc?.includes('drive.google.com');
  
  // Convert view/sharing links to preview links for embedding
  let embedSrc = videoSrc;
  if (isGoogleDrive && videoSrc) {
      embedSrc = videoSrc.replace('/view', '/preview').replace('/edit', '/preview');
      // Check if URL already has query parameters
      if (embedSrc.includes('?')) {
          embedSrc += '&autoplay=1';
      } else {
          embedSrc += '?autoplay=1';
      }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10"
          >
            <button 
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full text-white hover:bg-white/20 transition-colors"
            >
                <X size={24} />
            </button>
            
            {isGoogleDrive ? (
                <iframe 
                    src={embedSrc} 
                    className="w-full h-full border-0" 
                    allow="autoplay; encrypted-media" 
                    allowFullScreen
                />
            ) : (
                <video
                    ref={videoRef}
                    src={videoSrc || "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"}
                    className="w-full h-full object-contain"
                    controls
                    onEnded={handleEnded}
                />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

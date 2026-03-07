import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'motion/react';

interface AudioControlProps {
  audioSrc: string;
  isVideoOpen?: boolean;
}

export default function AudioControl({ audioSrc, isVideoOpen }: AudioControlProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (isVideoOpen && isPlaying && audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, [isVideoOpen]);

  useEffect(() => {
    setHasError(false);
    audioRef.current = new Audio(audioSrc);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;
    
    const handleError = (e: Event) => {
      console.error("Audio loading error:", e);
      setIsPlaying(false);
      setHasError(true);
    };

    audioRef.current.addEventListener('error', handleError);
    
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('error', handleError);
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [audioSrc]);

  const toggleAudio = () => {
    if (!audioRef.current || hasError) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(e => {
            console.error("Audio play failed", e);
            // Don't set error here, as it might be just an interaction policy block
        });
    }
  };

  if (hasError) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleAudio}
            className={`p-3 backdrop-blur-sm rounded-full shadow-lg transition-colors flex items-center justify-center ${isPlaying ? 'bg-pink-500 text-white' : 'bg-white/80 text-pink-600 hover:bg-white'}`}
        >
            {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
        </motion.button>
    </div>
  );
}

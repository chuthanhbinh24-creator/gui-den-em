import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Magnetic from './Magnetic';

interface LetterProps {
  onCloseComplete: () => void;
  delay: number;
  content?: string;
  sender?: string;
  recipient?: string;
}

export default function Letter({ 
    onCloseComplete, 
    delay, 
    content = "Chúc em một ngày 8/3 thật nhiều niềm vui, hạnh phúc và luôn xinh đẹp rạng ngời như những đóa hoa. Cảm ơn vì những điều tuyệt vời em đã mang đến cho thế giới này!",
    sender = "~ Thân gửi ~",
    recipient = "Gửi người từng thương"
}: LetterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [flapZIndex, setFlapZIndex] = useState(30); // Start closed (high z)
  const [paperZIndex, setPaperZIndex] = useState(15); // Start inside (low z)

  const handleToggle = () => {
    if (isOpen) {
      // Closing sequence
      setIsOpen(false);
      setPaperZIndex(15); // Paper goes "inside" layer immediately
      
      // Wait for paper to slide down (0.5s) before bringing flap to front
      setTimeout(() => {
        setFlapZIndex(30);
      }, 500);

      setTimeout(() => {
        onCloseComplete();
      }, 1000); 
    } else {
      // Opening sequence
      setIsOpen(true);
      setHasOpened(true);
      setFlapZIndex(10); // Flap goes to back immediately
      
      // Wait for flap to open (0.5s) before bringing paper to front layer
      setTimeout(() => {
        setPaperZIndex(40);
      }, 500);
    }
  };

  return (
    <div className="relative flex justify-center items-center z-20">
      <Magnetic onClick={handleToggle} className="cursor-pointer">
        <motion.div
          initial={{ scale: 0, opacity: 0, y: 100 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ delay: delay, duration: 0.6, type: "spring" }}
          className="relative w-40 h-24 sm:w-56 sm:h-36 md:w-72 md:h-44 bg-pink-100 rounded-lg shadow-xl border-2 border-pink-300 flex items-center justify-center overflow-visible"
        >
            {/* Envelope Flap */}
            <motion.div 
                className="absolute top-0 left-0 w-full h-1/2 bg-pink-200 origin-top rounded-t-lg border-b border-pink-300"
                style={{ clipPath: 'polygon(0 0, 50% 100%, 100% 0)', zIndex: flapZIndex }}
                animate={{ 
                    rotateX: isOpen ? 180 : 0,
                }}
                transition={{ duration: 0.5, delay: isOpen ? 0 : 0.5 }}
            />
            
            {/* Letter Paper */}
            <motion.div
                className="absolute w-[90%] bg-[#fdfbf7] p-4 shadow-sm flex flex-col items-center justify-start text-center"
                style={{ zIndex: paperZIndex }}
                initial={{ y: 0 }}
                animate={{ 
                    y: isOpen ? -120 : 0,
                    height: isOpen ? 'auto' : '90%',
                    minHeight: isOpen ? '280px' : '90%'
                }}
                transition={{ 
                    y: { duration: 0.5, delay: isOpen ? 0.5 : 0 },
                    height: { duration: 0.5, delay: isOpen ? 0.5 : 0 },
                    minHeight: { duration: 0.5, delay: isOpen ? 0.5 : 0 }
                }}
            >
                <div className="w-full h-full border border-dashed border-amber-200 p-4 flex flex-col items-center overflow-hidden">
                    <h3 className="font-script text-pink-800 font-bold text-sm sm:text-lg md:text-xl mb-2 text-center">{recipient}</h3>
                    <p className="font-serif text-gray-700 text-xs sm:text-sm leading-relaxed italic text-center whitespace-pre-wrap">
                        {content}
                    </p>
                    <div className="mt-auto pt-4 self-end text-xs sm:text-sm text-pink-600 font-script">{sender}</div>
                    
                    {/* Aged paper effect overlay */}
                    <div className="absolute inset-0 bg-amber-100/20 pointer-events-none mix-blend-multiply" />
                </div>
            </motion.div>

            {/* Envelope Body Front (to hide paper when inside) */}
            <div className="absolute bottom-0 left-0 w-full h-full bg-pink-100 z-20 rounded-b-lg border-t-2 border-pink-200" 
                 style={{ clipPath: 'polygon(0 0, 50% 40%, 100% 0, 100% 100%, 0 100%)' }}>
            </div>
             <div className="absolute bottom-0 left-0 w-full h-full bg-pink-50 z-20 rounded-b-lg opacity-50" 
                 style={{ clipPath: 'polygon(0 100%, 50% 40%, 100% 100%)' }}>
            </div>

            {!isOpen && !hasOpened && (
                <motion.div 
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute z-40 bg-red-500 text-white text-xs px-2 py-1 rounded-full -top-2 -right-2 shadow-md"
                >
                    Mở thư
                </motion.div>
            )}
        </motion.div>
      </Magnetic>
    </div>
  );
}

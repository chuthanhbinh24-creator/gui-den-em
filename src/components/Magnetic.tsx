import { useRef, useState, MouseEvent } from 'react';
import { motion } from 'motion/react';

interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function Magnetic({ children, className = "", onClick }: MagneticProps) {
  return (
    <motion.div
      className={className}
      whileHover={{ scale: 1.1, y: -10 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}

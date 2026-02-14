'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect } from 'react';
import { QuizWizard } from './QuizWizard';

type Props = {
  open: boolean;
  onClose: () => void;
  scenario?: string;
};

export function QuizModal({ open, onClose, scenario }: Props) {
  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-end justify-center bg-[#2d261d]/35 p-4 backdrop-blur-sm lg:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 28, opacity: 0, scale: 0.985 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 24, opacity: 0, scale: 0.985 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl"
          >
            <button onClick={onClose} className="absolute -top-3 right-2 rounded-full border border-[#ddceb8] bg-[#fcfaf6] p-2 text-[#6a5637]" aria-label="Закрыть квиз">
              <X size={18} />
            </button>
            <QuizWizard scenario={scenario} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

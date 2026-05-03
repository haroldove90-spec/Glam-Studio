import React from 'react';
import { motion } from 'motion/react';

export const SplashScreen: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1, delay: 2.5 }}
      onAnimationComplete={() => {
        const splash = document.getElementById('splash-screen');
        if (splash) splash.style.display = 'none';
      }}
      id="splash-screen"
      className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center p-8 overflow-hidden"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "circOut" }}
        className="relative flex flex-col items-center"
      >
        <img 
          src="https://cossma.com.mx/glamstudio.png" 
          alt="Glam Studio Logo" 
          className="h-32 object-contain grayscale"
        />
        <div className="mt-12 flex flex-col items-center gap-4">
          <div className="h-0.5 w-48 bg-slate-100 rounded-full overflow-hidden">
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
              className="h-full bg-gold-500 shadow-[0_0_15px_#d4af3730]"
            />
          </div>
          <p className="text-gold-600 text-[10px] font-black uppercase tracking-[0.8em] opacity-40 ml-2">Initializing OS</p>
        </div>
      </motion.div>
      
      <div className="absolute bottom-16">
        <p className="text-slate-300 text-[8px] font-black uppercase tracking-[0.5em]">GLAM STUDIO • PRIVATE ACCESS ONLY</p>
      </div>
    </motion.div>
  );
};

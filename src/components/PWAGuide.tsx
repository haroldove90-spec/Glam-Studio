import React from 'react';
import { motion } from 'motion/react';
import { Smartphone, WifiOff, Bell, Download, Monitor, CheckCircle2, X } from 'lucide-react';

export const PWAGuide: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="fixed inset-0 z-[120] bg-white/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-8 overflow-y-auto"
    >
      <div className="w-full max-w-4xl bg-white border border-slate-200 rounded-[40px] overflow-hidden shadow-2xl flex flex-col md:flex-row">
        {/* Mockup iPhone */}
        <div className="bg-slate-50 p-12 flex flex-col items-center justify-center relative overflow-hidden border-r border-slate-100">
          <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          
          <div className="relative w-[180px] h-[360px] bg-white rounded-[40px] border-[6px] border-slate-200 shadow-2xl flex flex-col items-center p-6 overflow-hidden outline outline-1 outline-slate-100">
             {/* Notch */}
             <div className="w-20 h-5 bg-slate-200 rounded-b-2xl mb-8"></div>
             
             {/* App Grid Sim */}
             <div className="grid grid-cols-3 gap-6 w-full opacity-10">
               {[...Array(9)].map((_, i) => (
                 <div key={i} className="w-8 h-8 bg-slate-400 rounded-xl"></div>
               ))}
             </div>
             
             {/* Glam Icon */}
             <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 12, delay: 0.5 }}
                className="mt-8 flex flex-col items-center gap-2"
             >
                <div className="w-14 h-14 bg-white rounded-2xl shadow-xl border border-gold-500/30 flex items-center justify-center p-2 overflow-hidden shadow-gold-500/5 ring-4 ring-gold-500/5">
                  <img src="https://cossma.com.mx/glamstudio.png" alt="Icon" className="w-full h-full object-contain grayscale" />
                </div>
                <span className="text-[8px] font-black text-gold-600 uppercase tracking-widest text-center mt-1">Glam Studio</span>
             </motion.div>
          </div>
          <p className="mt-6 text-[10px] text-slate-400 font-black uppercase tracking-[0.3em]">Native Multi-Device</p>
        </div>

        {/* Content */}
        <div className="flex-grow p-8 md:p-12 space-y-10">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-black text-slate-900 italic leading-tight tracking-tighter">Acceso Directo <br /> <span className="text-gold-500">Sin Intervenciones.</span></h2>
              <p className="text-[10px] text-slate-400 mt-2 font-black uppercase tracking-[0.2em]">PWA Deployment OS v3.0</p>
            </div>
            <button onClick={onClose} className="p-2 bg-slate-100 hover:bg-gold-500 hover:text-black rounded-full transition-all text-slate-500 border border-slate-200">
               <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {[
              { icon: <Download />, title: 'Instalación', desc: 'Aparecerá en tu pantalla de inicio como una App nativa, sin ocupar espacio de tienda.', color: 'text-gold-500' },
              { icon: <WifiOff />, title: 'Offline 2.0', desc: 'Consulta inventarios y agendas sin conexión. Sincronización atómica al detectar red.', color: 'text-gold-500' },
              { icon: <Bell />, title: 'Alertas Gold', desc: 'Notificaciones push exclusivas para citas prioritarias y avisos de stock crítico.', color: 'text-gold-500' },
              { icon: <Monitor />, title: 'Full Screen', desc: 'Elimina las barras del navegador para una inmersión completa en la operativa.', color: 'text-gold-500' }
            ].map((item, i) => (
              <div key={i} className="space-y-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-gold-500/20 transition-all shadow-sm">
                <div className={`flex items-center gap-3 ${item.color}`}>
                  {React.cloneElement(item.icon as React.ReactElement, { className: "w-4 h-4" })}
                  <h4 className="font-black text-[10px] uppercase tracking-widest"> {item.title}</h4>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-slate-100 flex items-center justify-between">
             <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gold-500 rounded-full flex items-center justify-center text-black">
                   <Smartphone className="w-5 h-5 text-black" />
                </div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest italic leading-tight">Certificación de Seguridad <br /> <span className="text-slate-900">GS-PROTOCOL-772</span></p>
             </div>
             <button className="px-6 py-2 bg-gold-500 text-black rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-lg shadow-gold-500/20">DESCARGAR APP</button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

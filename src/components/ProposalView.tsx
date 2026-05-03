import React from 'react';
import { motion } from 'motion/react';
import { FileText, CheckCircle2, TrendingUp, Clock, Zap, ArrowRight, Printer, Share2, ShieldCheck, X } from 'lucide-react';

export const ProposalView: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }} 
      animate={{ opacity: 1, scale: 1 }} 
      className="fixed inset-0 z-[110] bg-white/95 backdrop-blur-2xl flex flex-col p-4 md:p-12 overflow-y-auto"
    >
      <div className="max-w-4xl mx-auto w-full bg-white shadow-2xl rounded-[40px] overflow-hidden border border-slate-200 mb-12 relative">
        <button onClick={onClose} className="absolute top-8 right-8 p-2 bg-slate-100 text-slate-500 rounded-full border border-slate-200 hover:bg-gold-500 hover:text-black transition-all z-20">
           <X className="w-5 h-5" />
        </button>

        {/* Header con Logo */}
        <header className="p-12 pb-0 flex flex-col items-center text-center relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-64 bg-gold-500/5 blur-3xl rounded-full -translate-y-1/2"></div>
          <img src="https://cossma.com.mx/glamstudio.png" alt="Glam Studio" className="h-20 mb-8 grayscale relative z-10" />
          <h1 className="text-sm font-black tracking-[0.5em] text-slate-900 border-y-2 py-4 px-12 uppercase border-gold-500/30 relative z-10">Transformación Digital Glam Studio</h1>
          <p className="mt-4 text-[10px] font-black text-slate-400 uppercase font-mono tracking-[0.3em] relative z-10">Propuesta de Implementación Operativa de Alto Nivel</p>
        </header>

        <div className="p-12 space-y-20 relative z-10 text-slate-900">
          {/* ROI Analysis - Destacado */}
          <section className="bg-slate-50 text-slate-900 p-10 rounded-[32px] border border-slate-100 shadow-sm flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-3 text-gold-600 mb-2">
                 <ShieldCheck className="w-6 h-6" />
                 <span className="text-xs font-black uppercase tracking-widest">Garantía de Rentabilidad</span>
              </div>
              <h2 className="text-4xl font-black italic tracking-tighter leading-none">Tu Negocio <br /> <span className="text-gold-500">Sin Puntos Ciegos.</span></h2>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">Automatizamos el cálculo de comisiones e inventarios, eliminando el 100% de los errores humanos que actualmente drenan tu utilidad mensual.</p>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-4 w-full">
               <div className="p-6 bg-white rounded-2xl border border-slate-100 text-center shadow-sm">
                  <p className="text-3xl font-black text-gold-500">0%</p>
                  <p className="text-[9px] text-slate-400 uppercase font-black tracking-widest mt-1">Margen de Error</p>
               </div>
               <div className="p-6 bg-white rounded-2xl border border-slate-100 text-center shadow-sm">
                  <p className="text-3xl font-black text-slate-900">-85%</p>
                  <p className="text-[9px] text-slate-400 uppercase font-black tracking-widest mt-1">Tiempo Administrativo</p>
               </div>
            </div>
          </section>

          {/* Resumen de Beneficios */}
          <section className="space-y-8">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <TrendingUp className="w-5 h-5 text-gold-500" />
              <h2 className="text-lg font-black uppercase tracking-widest text-slate-900 italic">Ejes de Innovación</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: 'Auditoría en Tiempo Real', desc: 'Control total de cada peso que entra y sale, sincronizado con tu inventario físico.', icon: <CheckCircle2 /> },
                { title: 'PWA Multi-Device', desc: 'Lleva tu salón en el bolsillo. Instalación nativa para dueños, recepcionistas y especialistas.', icon: <Zap /> },
                { title: 'Data-Driven Growth', desc: 'Gráficos de rendimiento por especialista para motivar el cumplimiento de metas mensuales.', icon: <FileText /> }
              ].map((item, i) => (
                <div key={i} className="space-y-4">
                  <div className="w-12 h-12 bg-gold-500/10 rounded-2xl flex items-center justify-center text-gold-500 border border-gold-500/10">{item.icon}</div>
                  <h4 className="font-black text-xs uppercase text-slate-900 tracking-widest">{item.title}</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-medium">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Inversión */}
          <section className="space-y-12">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-10 bg-slate-50 border border-slate-100 rounded-[32px] shadow-sm group hover:border-gold-500 transition-all">
                <p className="text-[10px] font-black text-slate-400 uppercase mb-4 tracking-[0.2em]">Setup & Deployment (Único)</p>
                <p className="text-5xl font-black text-slate-900 mb-6 tracking-tighter">$8,500 <span className="text-sm font-medium text-slate-400">MXN</span></p>
                <div className="space-y-3 opacity-60 group-hover:opacity-100 transition-opacity">
                   {['Full PWA Configuration', 'Cloud Data Migration', 'Staff Onboarding'].map((line, i) => (
                     <p key={i} className="text-[10px] font-black text-slate-500 uppercase italic flex items-center gap-2">
                        <div className="w-1 h-1 bg-gold-500 rounded-full"></div> {line}
                     </p>
                   ))}
                </div>
              </div>
              <div className="p-10 bg-gold-500 rounded-[32px] text-black relative shadow-2xl shadow-gold-500/20 overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                   <Zap className="w-24 h-24" />
                </div>
                <p className="text-[10px] font-black uppercase mb-4 tracking-[0.2em] opacity-60">SaaS Maintenance (Mensual)</p>
                <p className="text-5xl font-black mb-6 tracking-tighter">$1,500 <span className="text-sm font-medium opacity-60">MXN</span></p>
                <div className="space-y-3 font-black">
                   {['Golden Support 24/7', 'Daily Cloud Backups', 'OS Core Updates'].map((line, i) => (
                     <p key={i} className="text-[10px] uppercase italic flex items-center gap-2">
                        <ArrowRight className="w-3 h-3" /> {line}
                     </p>
                   ))}
                </div>
              </div>
            </div>
          </section>

          {/* Cierre */}
          <section className="text-center space-y-8 pt-12 border-t border-slate-100">
            <h3 className="text-4xl font-black italic tracking-tighter text-slate-900">¿Desplegamos Glam OS?</h3>
            <div className="flex flex-wrap justify-center gap-6">
              <button className="px-12 py-5 bg-gold-500 text-black rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-gold-500/20">
                Iniciar Implementación
              </button>
              <button className="px-12 py-5 border-2 border-gold-500/20 text-gold-500 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gold-500 hover:text-black transition-all">
                Exportar Cotización
              </button>
            </div>
          </section>
        </div>

        <footer className="bg-slate-50 p-10 flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] font-mono border-t border-slate-100">
          <span>PRIVATE PROPOSAL ID: #GP-883-X</span>
          <span className="text-gold-600 opacity-40">GLAM STUDIO MGMT SYSTEMS</span>
        </footer>
      </div>

      <div className="flex justify-center gap-6 pb-12">
        <button className="p-4 bg-white border border-slate-100 shadow-sm rounded-full hover:bg-gold-500 group transition-all">
           <Printer className="w-5 h-5 text-slate-400 group-hover:text-black" />
        </button>
        <button className="p-4 bg-white border border-slate-100 shadow-sm rounded-full hover:bg-gold-500 group transition-all">
           <Share2 className="w-5 h-5 text-slate-400 group-hover:text-black" />
        </button>
      </div>
    </motion.div>
  );
};

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Calendar, CircleDollarSign, Scissors, UserCheck, Wallet, ChevronRight, 
  BarChart3, Package, CreditCard, ShieldCheck, TrendingUp, AlertCircle, 
  CheckSquare, Printer, Settings, LogOut, Info, Smartphone, FileText, 
  UserPlus, Settings2, PlusCircle, DollarSign, Activity, Trash2, Shield
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { APPOINTMENTS, SALES, SPECIALISTS, PENDING_PAYMENTS, INVENTORY, EXPENSES, MONTHLY_GOALS } from '../data';
import { UserRole } from '../types';
import { PWAGuide } from './PWAGuide';
import { SplashScreen } from './SplashScreen';
import { ProposalView } from './ProposalView';

const REVENUE_DATA = [
  { name: '10:00', total: 4500 },
  { name: '12:00', total: 8200 },
  { name: '14:00', total: 6100 },
  { name: '16:00', total: 12500 },
  { name: '18:00', total: 15800 },
  { name: '20:00', total: 21400 },
];

export const Dashboard: React.FC = () => {
  const [currentRole, setCurrentRole] = useState<UserRole>('admin');
  const [showCierre, setShowCierre] = useState(false);
  const [showPWAInfo, setShowPWAInfo] = useState(false);
  const [showProposal, setShowProposal] = useState(false);

  // Calculations
  const totalSales = SALES.reduce((acc, sale) => acc + sale.total, 0);
  const totalServiceSales = SALES.reduce((acc, sale) => acc + sale.servicePrice, 0);
  const totalProductSales = SALES.reduce((acc, sale) => acc + sale.productPrice, 0);
  
  const commissionSummary = SPECIALISTS.map(spec => {
    const specSales = SALES.filter(s => s.specialist === spec.name);
    const serviceTotal = specSales.reduce((acc, s) => acc + s.servicePrice, 0);
    const productTotal = specSales.reduce((acc, s) => acc + s.productPrice, 0);
    const serviceCommission = serviceTotal * spec.serviceCommission;
    const productCommission = productTotal * spec.productCommission;
    
    return {
      name: spec.name,
      total: serviceCommission + productCommission,
      serviceTotal,
      productTotal
    };
  });

  const totalCommissions = commissionSummary.reduce((acc, curr) => acc + curr.total, 0);
  const totalExpenses = EXPENSES.reduce((acc, e) => acc + e.amount, 0);
  const netUtility = totalSales - totalCommissions - totalExpenses;

  // Specialists Performance
  const specialistGoals = MONTHLY_GOALS.map(goal => {
    const comm = commissionSummary.find(c => c.name === goal.specialist);
    const todaySales = comm ? comm.serviceTotal + comm.productTotal : 0;
    const totalWithToday = goal.current + todaySales;
    const percentage = (totalWithToday / goal.target) * 100;
    return { ...goal, todaySales, totalWithToday, percentage };
  });

  // Specialist View Data (Ana)
  const anaPerformance = commissionSummary.find(c => c.name === 'Ana');
  const anaServices = SALES.filter(s => s.specialist === 'Ana');

  if (showCierre) {
    return (
      <div className="w-full max-w-[900px] min-h-screen bg-white font-sans text-slate-900 flex flex-col p-8 md:p-16 mx-auto shadow-2xl my-12 rounded-3xl border border-slate-100">
        <header className="flex flex-col items-center text-center mb-12">
          <img 
            src="https://cossma.com.mx/glamstudio.png" 
            alt="Glam Studio Logo" 
            className="h-24 object-contain mb-6 grayscale" 
          />
          <h1 className="text-2xl font-black tracking-[0.3em] uppercase border-y-2 border-gold-500 py-3 px-8 text-slate-900">Reporte de Cierre de Turno</h1>
          <p className="mt-4 font-mono text-[10px] uppercase text-slate-400">Fecha de Emisión: {new Date().toLocaleDateString('es-MX')} | 10:00 PM</p>
        </header>

        <button 
          onClick={() => setShowCierre(false)}
          className="absolute top-8 right-8 p-3 bg-slate-50 border border-slate-200 hover:bg-gold-100 rounded-full transition-colors group"
        >
          <LogOut className="w-5 h-5 text-slate-400 group-hover:text-gold-600" />
        </button>

        <div className="space-y-12">
          <section>
            <h2 className="text-xs font-black uppercase tracking-widest text-gold-600 mb-4 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Incidencias y Ajustes del Día
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl shadow-sm">
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1 opacity-60">Cancelación de Último Minuto</p>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="font-bold text-slate-900 text-sm">Servicio: Pestañas</p>
                    <p className="text-xs text-slate-500 italic">Roberto</p>
                  </div>
                  <span className="text-lg font-black text-rose-500">-$800.00</span>
                </div>
              </div>
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl shadow-sm">
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1 opacity-60">Gasto Imprevisto</p>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="font-bold text-slate-900 text-sm">Reparación de Secadora</p>
                    <p className="text-xs text-slate-500 italic">Técnico especializado</p>
                  </div>
                  <span className="text-lg font-black text-rose-500">-$350.00</span>
                </div>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 gap-12 border-t border-slate-100 pt-12">
            <div className="space-y-4">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                Resumen Administrativo
              </h3>
              <div className="bg-white border border-slate-100 p-8 rounded-2xl shadow-lg flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
                <div className="space-y-2">
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-[0.2em]">Balance Final Ajustado</p>
                  <p className="text-4xl font-black text-gold-500 font-mono">${netUtility.toFixed(2)}</p>
                </div>
                <div className="h-px md:h-12 w-full md:w-px bg-slate-100"></div>
                <div className="flex flex-col items-center md:items-end">
                  <p className="text-[10px] uppercase font-bold text-slate-400 mb-1 tracking-[0.2em]">Caja Efectivo</p>
                  <p className="text-2xl font-black font-mono text-slate-900">${(totalSales * 0.4 - totalExpenses).toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <SplashScreen />
      {showPWAInfo && <PWAGuide onClose={() => setShowPWAInfo(false)} />}
      {showProposal && <ProposalView onClose={() => setShowProposal(false)} />}
      
      <div className="w-full max-w-[1400px] min-h-screen bg-[#F8FAFC] font-sans text-slate-500 flex flex-col p-4 sm:p-6 md:p-10 mx-auto selection:bg-gold-500 selection:text-black">
        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-8">
          <div className="flex items-center gap-6 group">
            <div className="relative">
              <img 
                src="https://cossma.com.mx/glamstudio.png" 
                alt="Logo" 
                className="h-14 sm:h-16 object-contain grayscale group-hover:grayscale-0 transition-all duration-700" 
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gold-500 rounded-full flex items-center justify-center border-2 border-[#F8FAFC]">
                 <ShieldCheck className="w-2.5 h-2.5 text-black" />
              </div>
            </div>
            <div className="h-10 w-px bg-slate-200 hidden sm:block"></div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black tracking-[0.25em] text-slate-900 uppercase flex items-center gap-3 italic">
                Management
                <span className="text-[9px] bg-black text-gold-500 px-2 py-0.5 rounded font-black tracking-normal not-italic">{currentRole.toUpperCase()}</span>
              </h1>
              <p className="text-[10px] text-gold-600 font-black tracking-[0.4em] mt-1 opacity-60">CORE OPERATING SYSTEM v3.1</p>
            </div>
          </div>

          <div className="w-full lg:w-auto flex flex-col sm:flex-row items-center gap-4">
             <div className="w-full sm:w-auto flex bg-white p-1 rounded-2xl border border-slate-200 shadow-sm">
                {(['admin', 'recepcion', 'especialista'] as UserRole[]).map((role) => (
                  <button
                    key={role}
                    onClick={() => setCurrentRole(role)}
                    className={`flex-1 sm:flex-none px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                      currentRole === role 
                        ? 'bg-gold-500 text-black shadow-lg shadow-gold-500/20' 
                        : 'text-slate-400 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    {role}
                  </button>
                ))}
             </div>
             
             <div className="w-full sm:w-auto flex gap-3">
                <button 
                  onClick={() => setShowCierre(true)}
                  className="flex-1 sm:flex-none px-6 py-3 bg-slate-900 text-gold-500 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-black/10"
                >
                  Cierre
                </button>
                <button 
                  onClick={() => setShowProposal(true)}
                  className="p-3 bg-white border border-slate-200 text-slate-400 rounded-xl hover:text-gold-600 transition-all shadow-sm"
                >
                  <Info className="w-4 h-4" />
                </button>
             </div>
          </div>
        </header>

        <main className="flex-grow space-y-8 sm:space-y-12">
              {/* ROLE: ADMIN */}
          {currentRole === 'admin' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10">
              {/* KPIs Principales */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: 'Ventas Brutas', val: `$${totalSales.toLocaleString()}`, color: 'text-slate-900', sub: '+12.4% vs Ayer', icon: <TrendingUp className="w-5 h-5" /> },
                  { label: 'Utilidad Neta', val: `$${netUtility.toLocaleString()}`, color: 'text-gold-600', sub: 'Margen: 42%', icon: <DollarSign className="w-5 h-5" /> },
                  { label: 'Comisiones', val: `$${totalCommissions.toLocaleString()}`, color: 'text-slate-900', sub: 'Pendiente Pago', icon: <CreditCard className="w-5 h-5" /> },
                  { label: 'Eficiencia', val: '94%', color: 'text-slate-900', sub: 'Optimización Max', icon: <Activity className="w-5 h-5" /> },
                ].map((kpi, i) => (
                  <div key={i} className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{kpi.label}</p>
                      <div className="text-gold-500">{kpi.icon}</div>
                    </div>
                    <p className={`text-3xl font-black ${kpi.color} font-mono tracking-tighter`}>{kpi.val}</p>
                    <p className="mt-2 text-[10px] text-slate-400 font-bold uppercase italic">{kpi.sub}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Gráfica Financiera */}
                <div className="lg:col-span-8 space-y-8">
                  <div className="bg-white border border-slate-100 rounded-[32px] p-8 shadow-sm">
                    <div className="flex justify-between items-center mb-8">
                      <div>
                        <h3 className="text-slate-900 font-black uppercase text-sm tracking-widest">Reporte Financiero Intra-Día</h3>
                        <p className="text-[10px] text-slate-400 font-bold uppercase italic">Balance Activo vs Gastos</p>
                      </div>
                      <button className="p-2 px-4 bg-slate-50 border border-slate-200 rounded-xl text-[10px] font-black text-slate-900 uppercase tracking-widest hover:bg-gold-500 hover:text-black transition-all">Exportar PDF</button>
                    </div>
                    <div className="h-[320px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={REVENUE_DATA}>
                          <defs>
                            <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#d4af37" stopOpacity={0.2}/>
                              <stop offset="95%" stopColor="#d4af37" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                          <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} axisLine={false} tickLine={false} dy={10} />
                          <YAxis stroke="#94a3b8" fontSize={10} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
                          <Tooltip 
                             contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #e2e8f0', borderRadius: '16px', fontSize: '10px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                             itemStyle={{ color: '#b45309', fontWeight: 'bold' }}
                             labelStyle={{ color: '#64748b', marginBottom: '4px' }}
                          />
                          <Area type="monotone" dataKey="total" stroke="#d4af37" strokeWidth={4} fillOpacity={1} fill="url(#colorTotal)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Edición de Registros (Vault) */}
                  <div className="bg-white border border-slate-100 rounded-[32px] overflow-hidden shadow-sm">
                    <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-center gap-4">
                       <ShieldCheck className="w-5 h-5 text-gold-600" />
                       <h3 className="text-slate-900 font-black uppercase text-xs tracking-[0.2em]">Bóveda de Correcciones (Tickets Cerrados)</h3>
                    </div>
                    <div className="p-8">
                       <div className="space-y-4">
                          {SALES.slice(0, 3).map((sale) => (
                            <div key={sale.id} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-200 group transition-all">
                               <div className="flex items-center gap-4">
                                  <div className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center font-black text-[10px] text-slate-400">{sale.id}</div>
                                  <div>
                                     <p className="text-xs font-black text-slate-900">{sale.service}</p>
                                     <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{sale.specialist} • {sale.paymentMethod}</p>
                                  </div>
                               </div>
                               <div className="flex items-center gap-4">
                                  <span className="text-sm font-black text-slate-900 font-mono">${sale.total.toFixed(2)}</span>
                                  <button className="p-2 px-4 bg-white border border-slate-200 rounded-lg text-[9px] font-black uppercase text-gold-600 hover:bg-gold-500 hover:text-black transition-all">EDITAR TICKET</button>
                                  <button className="p-2 text-rose-400 hover:text-rose-600 transition-colors"><Trash2 className="w-4 h-4" /></button>
                               </div>
                            </div>
                          ))}
                       </div>
                       <p className="mt-6 text-[9px] text-slate-400 font-bold text-center uppercase tracking-widest italic opacity-60">Solo el Administrador puede revertir transacciones en la Bóveda</p>
                    </div>
                  </div>
                </div>

                {/* Sidebar Administrativo */}
                <div className="lg:col-span-4 space-y-8">
                  {/* Comisiones y Staff */}
                  <div className="bg-white border border-slate-100 rounded-[32px] p-8 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                       <div className="flex items-center gap-3">
                          <Settings2 className="w-5 h-5 text-gold-600" />
                          <h4 className="text-slate-900 font-black uppercase text-xs tracking-widest">Configura Comisiones</h4>
                       </div>
                    </div>
                    <div className="space-y-6">
                      {SPECIALISTS.map((spec, i) => (
                        <div key={i} className="space-y-2">
                           <div className="flex justify-between items-center">
                              <p className="text-xs font-black text-slate-900">{spec.name}</p>
                              <p className="text-[10px] font-mono text-gold-600 font-black">{(spec.serviceCommission * 100).toFixed(0)}%</p>
                           </div>
                           <div className="h-1.5 w-full bg-slate-100 rounded-full relative overflow-hidden group">
                              <div className="absolute inset-y-0 left-0 bg-gold-500 rounded-full" style={{ width: `${spec.serviceCommission * 100}%` }}></div>
                              <input 
                                type="range" 
                                className="absolute inset-0 opacity-0 cursor-pointer" 
                                min="0" max="1" step="0.05" 
                                value={spec.serviceCommission}
                                readOnly
                              />
                           </div>
                        </div>
                      ))}
                      <div className="pt-4 space-y-4">
                        <button className="w-full py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-gold-500 hover:text-black transition-all">Guardar Cambios</button>
                        <button className="w-full py-4 border-2 border-dashed border-slate-100 text-slate-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:border-gold-500 hover:text-gold-600 transition-all flex items-center justify-center gap-3">
                           <UserPlus className="w-4 h-4" /> Alta Nuevo Staff
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Logs de Seguridad y Sync Operativo */}
                  <div className="space-y-6">
                    <div className="bg-white border border-slate-100 rounded-[32px] p-8 shadow-sm">
                       <div className="flex items-center gap-3 mb-6">
                          <Package className="w-5 h-5 text-gold-600" />
                          <h4 className="text-slate-900 font-black uppercase text-xs tracking-widest">Stock Sync</h4>
                       </div>
                       <div className="space-y-4">
                          {INVENTORY.slice(0, 2).map((item, i) => (
                            <div key={i} className="flex justify-between items-center text-[10px] uppercase font-bold">
                               <span className="text-slate-400">{item.name}</span>
                               <span className={item.currentStock < 5 ? 'text-rose-500 font-black' : 'text-slate-900'}>
                                 {item.currentStock} UNIDADES
                               </span>
                            </div>
                          ))}
                       </div>
                    </div>

                    <div className="bg-slate-900 rounded-[32px] p-8 text-white relative overflow-hidden shadow-2xl">
                       <div className="absolute top-0 right-0 p-4 opacity-10"><Shield className="w-20 h-20" /></div>
                       <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 opacity-40">Security Logs</h4>
                       <div className="space-y-4 relative z-10">
                          {['Acceso Admin: 22:59', 'Backup Cloud OK', 'Ticket #S3 Modificado'].map((log, i) => (
                            <div key={i} className="flex items-center gap-3 text-[9px] font-mono opacity-60">
                               <div className="w-1 h-1 bg-gold-500 rounded-full"></div> {log}
                            </div>
                          ))}
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ROLE: RECEPCION */}
          {currentRole === 'recepcion' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 lg:space-y-12">
              {/* Agenda y POS */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-7 bg-white border border-slate-100 rounded-[32px] overflow-hidden shadow-sm flex flex-col">
                   <div className="p-6 bg-slate-50 border-b border-slate-100 flex justify-between items-center bg-gradient-to-r from-slate-50 to-white">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-gold-500/10 rounded-xl">
                          <Calendar className="w-5 h-5 text-gold-600" />
                        </div>
                        <div>
                          <h3 className="text-slate-900 font-black uppercase text-sm tracking-widest">Agenda Global</h3>
                          <p className="text-[10px] text-slate-400 font-bold uppercase">Gestión de Citas - {new Date().toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors"><BarChart3 className="w-4 h-4 text-slate-400" /></button>
                        <span className="text-[10px] font-black text-white bg-slate-900 px-3 py-1 rounded-full">{APPOINTMENTS.length} HOY</span>
                      </div>
                   </div>
                   <div className="p-6 overflow-y-auto max-h-[500px]">
                      <div className="space-y-3">
                        {APPOINTMENTS.map((app) => (
                          <div key={app.id} className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl hover:border-gold-500/30 transition-all hover:shadow-md group">
                             <div className="flex items-center gap-4">
                                <div className="min-w-[60px] text-center p-2 bg-slate-50 rounded-xl border border-slate-100 group-hover:bg-gold-50 transition-colors">
                                   <p className="text-xs font-black text-slate-900 font-mono">{app.time}</p>
                                </div>
                                <div className="h-8 w-px bg-slate-100"></div>
                                <div>
                                   <p className="text-sm font-black text-slate-900 group-hover:text-gold-600 transition-colors">{app.name}</p>
                                   <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-2">
                                      {app.service} <span className="w-1 h-1 bg-slate-200 rounded-full"></span> {app.specialist}
                                   </p>
                                </div>
                             </div>
                             <div className="flex items-center gap-4">
                                <span className={`text-[9px] font-black uppercase px-3 py-1 rounded-full ${
                                  app.status === 'Completada' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-gold-50 text-gold-600 border border-gold-100'
                                }`}>
                                  {app.status}
                                </span>
                                <button className="p-2 opacity-0 group-hover:opacity-100 bg-white shadow-sm border border-slate-200 rounded-lg text-slate-400 hover:text-gold-600 transition-all">
                                   <Settings className="w-4 h-4" />
                                </button>
                             </div>
                          </div>
                        ))}
                      </div>
                      <button className="w-full mt-6 py-4 bg-slate-900 text-gold-500 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:scale-[1.01] transition-all shadow-xl shadow-black/5">
                        <PlusCircle className="w-4 h-4" /> Nueva Reservación
                      </button>
                   </div>
                </div>

                <div className="lg:col-span-5 space-y-8">
                  {/* Punto de Venta */}
                  <div className="bg-white border border-slate-100 rounded-[32px] p-8 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5"><Wallet className="w-24 h-24 text-gold-500" /></div>
                    <div className="flex items-center gap-4 mb-8 relative z-10">
                      <div className="p-2 bg-emerald-500/10 rounded-xl">
                        <CreditCard className="w-5 h-5 text-emerald-600" />
                      </div>
                      <h4 className="text-slate-900 font-black uppercase text-xs tracking-widest">Caja y Punto de Venta</h4>
                    </div>
                    
                    <div className="space-y-6 relative z-10">
                      <div className="p-6 bg-slate-50 border border-slate-200 rounded-[24px] border-dashed flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-gold-500/5 hover:border-gold-500/30 transition-all">
                         <div className="w-14 h-14 bg-white border border-slate-200 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm">
                            <PlusCircle className="w-6 h-6 text-gold-500" />
                         </div>
                         <p className="text-slate-900 font-black uppercase text-xs">Registrar Venta</p>
                         <p className="text-[10px] text-slate-400 font-medium mt-1">Servicio o Venta de Producto</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                         <button className="p-4 bg-white border border-slate-200 rounded-2xl text-[10px] font-black uppercase text-slate-600 hover:border-gold-500 transition-all flex flex-col items-center gap-2">
                            <Printer className="w-5 h-5 text-slate-400" /> Reimprimir Ticket
                         </button>
                         <button className="p-4 bg-white border border-slate-200 rounded-2xl text-[10px] font-black uppercase text-slate-600 hover:border-gold-500 transition-all flex flex-col items-center gap-2">
                            <LogOut className="w-5 h-5 text-rose-400" /> Cerrar Caja
                         </button>
                      </div>
                    </div>
                  </div>

                  {/* Inventario Rápido */}
                  <div className="bg-white border border-slate-100 rounded-[32px] p-8 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                       <div className="flex items-center gap-4">
                         <div className="p-2 bg-slate-100 rounded-xl">
                           <Package className="w-5 h-5 text-slate-600" />
                         </div>
                         <h4 className="text-slate-900 font-black uppercase text-xs tracking-widest">Inventario</h4>
                       </div>
                    </div>
                    <div className="space-y-4">
                       <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                          <div>
                             <p className="text-[10px] font-black text-slate-900 uppercase">Shampoo Premium 500ml</p>
                             <p className="text-[9px] text-slate-400 font-bold uppercase">Stock Actual: 12 unidades</p>
                          </div>
                          <button className="p-2 px-3 bg-white border border-slate-200 rounded-lg text-[9px] font-black text-gold-600">+ ENTRADA</button>
                       </div>
                       <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                          <div>
                             <p className="text-[10px] font-black text-slate-900 uppercase">Tinte Gold Series</p>
                             <p className="text-[9px] text-slate-400 font-bold uppercase">Stock Actual: 4 unidades</p>
                          </div>
                          <button className="p-2 px-3 bg-white border border-slate-200 rounded-lg text-[9px] font-black text-gold-600">+ ENTRADA</button>
                       </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Gastos Operativos */}
              <div className="bg-white border border-slate-100 rounded-[32px] p-8 shadow-sm">
                 <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-4">
                       <div className="p-2 bg-rose-500/10 rounded-xl">
                         <AlertCircle className="w-5 h-5 text-rose-600" />
                       </div>
                       <div>
                         <h4 className="text-slate-900 font-black uppercase text-sm tracking-widest">Gastos Operativos (Caja Chica)</h4>
                         <p className="text-[10px] text-slate-400 font-bold uppercase">Registro de Egresos Diarios</p>
                       </div>
                    </div>
                    <button className="p-2 px-6 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all">Reportar Gasto</button>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {EXPENSES.map((exp, i) => (
                      <div key={i} className="flex justify-between items-center p-5 bg-slate-50 rounded-2xl border border-slate-100 group">
                         <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-rose-500"><LogOut className="w-4 h-4 rotate-180" /></div>
                            <div>
                               <p className="text-xs font-black text-slate-900 line-clamp-1">{exp.description}</p>
                               <p className="text-[9px] text-slate-400 font-bold uppercase">{exp.date}</p>
                            </div>
                         </div>
                         <span className="text-sm font-black text-rose-500 font-mono">-${exp.amount.toFixed(0)}</span>
                      </div>
                    ))}
                 </div>
              </div>
            </motion.div>
          )}

          {/* ROLE: ESPECIALISTA */}
          {currentRole === 'especialista' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8 space-y-8">
                <div className="bg-white border border-slate-100 rounded-3xl p-8 relative overflow-hidden shadow-sm">
                   <div className="absolute -right-4 -top-4 w-32 h-32 bg-gold-500/5 rounded-full blur-3xl opacity-30"></div>
                   <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
                      <div>
                         <h2 className="text-3xl font-black text-slate-900 italic tracking-tighter">Bienvenida, Ana</h2>
                         <p className="text-[10px] text-gold-600 font-black uppercase tracking-[0.3em] mt-1">Estatus: Premium Specialist</p>
                      </div>
                      <div className="text-right">
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Tu Comisión Hoy</p>
                         <p className="text-5xl font-black text-gold-500 font-mono tracking-tighter">${anaPerformance?.total.toLocaleString()}</p>
                      </div>
                   </div>
                </div>

                <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm">
                   <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-center gap-4">
                      <Scissors className="w-5 h-5 text-gold-600" />
                      <h3 className="text-slate-900 font-black uppercase text-sm tracking-widest">Tus Servicios de Hoy</h3>
                   </div>
                   <div className="p-0">
                      <table className="w-full text-left">
                        <thead className="text-[10px] text-slate-400 font-black uppercase border-b border-slate-100 bg-slate-50/50">
                           <tr>
                              <th className="px-8 py-4">Servicio Realizado</th>
                              <th className="px-8 py-4">Total</th>
                              <th className="px-8 py-4 text-right">Comisión</th>
                           </tr>
                        </thead>
                        <tbody>
                          {anaServices.map((s, i) => (
                            <tr key={i} className="border-b border-slate-100 hover:bg-gold-50/50 transition-colors">
                               <td className="px-8 py-6">
                                  <p className="text-sm font-black text-slate-900">{s.service} <span className="text-[9px] text-slate-400 font-normal italic lowercase tracking-normal bg-slate-100 border border-slate-200 px-2 py-0.5 rounded ml-2">completado</span></p>
                                  <p className="text-[10px] text-gold-600 uppercase font-black tracking-widest mt-0.5">Ticket #{s.id}</p>
                               </td>
                               <td className="px-8 py-6 font-mono text-xs text-slate-500">${s.servicePrice.toFixed(2)}</td>
                               <td className="px-8 py-6 text-right font-black text-gold-600 font-mono text-sm">
                                  +${(s.servicePrice * 0.3).toFixed(2)}
                                </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                   </div>
                </div>
              </div>

              <div className="lg:col-span-4 space-y-8">
                 <div className="bg-white border border-slate-100 rounded-3xl p-8 flex flex-col items-center text-center shadow-sm">
                    <div className="w-32 h-32 rounded-full border-4 border-slate-50 relative flex items-center justify-center mb-6 shadow-xs">
                       <svg className="absolute -rotate-90 w-full h-full">
                          <circle cx="64" cy="64" r="60" stroke="#f8fafc" strokeWidth="6" fill="transparent" />
                          <circle cx="64" cy="64" r="60" stroke="#d4af37" strokeWidth="6" strokeDasharray="376" strokeDashoffset={376 * (1 - 0.72)} fill="transparent" strokeLinecap="round" />
                       </svg>
                       <span className="text-2xl font-black text-slate-900 italic">72%</span>
                    </div>
                    <h4 className="text-slate-900 font-black uppercase text-xs tracking-widest mb-2">Meta Personal</h4>
                    <p className="text-xs text-slate-400 font-medium px-8 italic">Buen trabajo Ana, estás muy cerca del bono nivel platino.</p>
                    <button className="mt-8 w-full py-4 bg-slate-100 border border-slate-200 text-gold-600 text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-gold-500 hover:text-black transition-all shadow-xs">
                       Ver Mis Bonos
                    </button>
                 </div>

                 <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
                    <h4 className="text-slate-900 font-black uppercase text-xs tracking-widest mb-6">Siguiente Cliente</h4>
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                       <p className="text-xs font-black text-gold-600 font-mono mb-1">11:30 AM</p>
                       <p className="text-sm font-black text-slate-900 uppercase italic">Claudia R.</p>
                       <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Uñas Acrílico + Gelish</p>
                    </div>
                    <button className="w-full mt-6 py-3 bg-slate-100 border border-slate-200 text-slate-400 font-black text-[10px] uppercase tracking-widest rounded-xl hover:text-slate-900 transition-all shadow-xs">
                       Gestionar Mi Agenda
                    </button>
                 </div>
              </div>
            </motion.div>
          )}

        </main>

        <footer className="mt-16 pt-10 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6 text-[10px] font-black tracking-[0.4em] uppercase text-slate-300">
             <span>v3.0.1 Stable Cloud</span>
             <span className="hidden md:block">|</span>
             <span>Region: MX-CDMX-01</span>
          </div>
          <div className="flex items-center gap-3">
             <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b98150]"></div>
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Encritptación AES-256 Activa</p>
          </div>
          <p className="text-[10px] font-black text-slate-200 uppercase tracking-[0.2em]">© 2026 GLAM STUDIO MGMT</p>
        </footer>
      </div>
    </>
  );
};

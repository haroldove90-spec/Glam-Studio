import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Calendar, CircleDollarSign, Scissors, UserCheck, Wallet, ChevronRight, 
  BarChart3, Package, CreditCard, ShieldCheck, TrendingUp, AlertCircle, 
  CheckSquare, Printer, Settings, LogOut, Info
} from 'lucide-react';
import { APPOINTMENTS, SALES, SPECIALISTS, PENDING_PAYMENTS, INVENTORY, EXPENSES, MONTHLY_GOALS } from '../data';
import { UserRole } from '../types';

export const Dashboard: React.FC = () => {
  const [currentRole, setCurrentRole] = useState<UserRole>('Administrador');
  const [showCierre, setShowCierre] = useState(false);

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

  // Specialists Performance (Today's impact on monthly goals)
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
      <div className="w-full max-w-[900px] min-h-screen bg-white font-sans text-slate-800 flex flex-col p-8 md:p-16 mx-auto shadow-2xl my-12 rounded-3xl border border-slate-100">
        <header className="flex flex-col items-center text-center mb-12">
          <img 
            src="https://cossma.com.mx/glamstudio.png" 
            alt="Glam Studio Logo" 
            className="h-24 object-contain mb-6 grayscale hover:grayscale-0 transition-all duration-500" 
          />
          <h1 className="text-2xl font-black tracking-[0.3em] uppercase border-y-2 border-slate-900 py-2 px-8">Reporte de Cierre de Turno</h1>
          <p className="mt-4 font-mono text-[10px] uppercase text-slate-400">Fecha de Emisión: {new Date().toLocaleDateString('es-MX')} | 10:00 PM</p>
        </header>

        <button 
          onClick={() => setShowCierre(false)}
          className="absolute top-8 right-8 p-3 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors group"
          title="Volver"
        >
          <LogOut className="w-5 h-5 text-slate-400 group-hover:text-slate-900" />
        </button>

        <div className="space-y-12">
          {/* Incidences Section */}
          <section>
            <h2 className="text-xs font-black uppercase tracking-widest text-pink-500 mb-4 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Incidencias y Ajustes del Día
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-pink-50 border border-pink-100 rounded-xl">
                <p className="text-[10px] font-bold text-pink-600 uppercase mb-1">Cancelación de Último Minuto</p>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="font-bold text-slate-900 text-sm">Servicio: Pestañas</p>
                    <p className="text-xs text-slate-500 italic">Especialista: Roberto</p>
                  </div>
                  <span className="text-lg font-black text-pink-700">-$800.00</span>
                </div>
              </div>
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
                <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Gasto Imprevisto</p>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="font-bold text-slate-900 text-sm">Reparación de Secadora</p>
                    <p className="text-xs text-slate-400 italic">Técnico especializado</p>
                  </div>
                  <span className="text-lg font-black text-slate-900">-$350.00</span>
                </div>
              </div>
            </div>
          </section>

          {/* Role Summaries */}
          <div className="grid grid-cols-1 gap-12 border-t border-slate-100 pt-12">
            
            {/* View: Administrator */}
            <div className="space-y-4">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                Resumen Administrativo
              </h3>
              <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
                <div className="space-y-2">
                  <p className="text-[10px] uppercase font-bold text-slate-400">Balance Final Ajustado</p>
                  <p className="text-4xl font-black text-pink-400 font-mono">${netUtility.toFixed(2)}</p>
                  <p className="text-[10px] text-slate-500 italic">Deducciones de comisiones e insumos aplicadas.</p>
                </div>
                <div className="h-px md:h-12 w-full md:w-px bg-white/10"></div>
                <div className="flex flex-col items-center md:items-end">
                  <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Efectivo Físico en Caja</p>
                  <p className="text-2xl font-black font-mono text-white">${(totalSales * 0.4 - totalExpenses).toFixed(2)}</p>
                  <p className="text-[10px] opacity-40 uppercase">(Ventas Efectivo - Gastos)</p>
                </div>
              </div>
            </div>

            {/* View: Reception */}
            <div className="space-y-4">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2 font-mono">
                <CheckSquare className="w-4 h-4" />
                Checklist de Recepción
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {['Corte de terminal', 'Limpieza de estaciones', 'Respaldo de citas'].map((task, i) => (
                  <div key={i} className="p-4 border border-slate-200 rounded-xl flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-pink-500 rounded flex items-center justify-center">
                      <span className="text-pink-500 font-black text-xs">✓</span>
                    </div>
                    <span className="text-xs font-bold uppercase tracking-tighter">{task}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* View: Specialists */}
            <div className="space-y-4">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Metas Mensuales (Avance Real)
              </h3>
              <div className="space-y-6">
                {specialistGoals.map((goal, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between items-end">
                      <p className="font-bold text-slate-900 uppercase text-xs">{goal.specialist}</p>
                      <p className="font-mono text-xs text-pink-600 font-black">{goal.percentage.toFixed(1)}% Alcanzado</p>
                    </div>
                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${goal.percentage}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="h-full bg-slate-900"
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                      <span>ACTUAL: ${goal.totalWithToday.toFixed(0)}</span>
                      <span>OBJETIVO: ${goal.target.toFixed(0)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-24 pt-8 border-t border-slate-100 flex justify-between items-center text-slate-300 font-mono text-[10px] uppercase">
          <span>Glam Studio OS Terminal ID: #774-XP</span>
          <div className="flex items-center gap-4 text-right">
            <button className="flex items-center gap-1 hover:text-pink-500 transition-colors">
              <Printer className="w-3 h-3" /> Imprimir Ticket
            </button>
            <span className="font-black text-slate-900 italic">Validado Correctamente</span>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1280px] min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col p-8 mx-auto">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 border-b border-slate-200 pb-4 gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-black tracking-tight text-slate-900 underline decoration-pink-500 decoration-4 underline-offset-4">GLAM STUDIO</h1>
            <span className="text-[10px] bg-slate-900 text-white px-2 py-0.5 rounded font-black uppercase tracking-widest">{currentRole}</span>
          </div>
          <p className="text-sm text-slate-500 mt-1 uppercase tracking-widest font-semibold tracking-tighter">Terminal de Gestión Operativa</p>
        </div>
        
        {/* Actions & Role Selector */}
        <div className="flex flex-wrap items-center gap-4 self-end scale-90 md:scale-100 origin-right">
          <button 
            onClick={() => setShowCierre(true)}
            className="flex items-center gap-2 px-4 py-1.5 bg-pink-600 text-white rounded-md text-xs font-black shadow-lg shadow-pink-600/20 hover:bg-pink-700 transition-all uppercase tracking-widest"
          >
            <Settings className="w-3 h-3" />
            Cierre de Turno
          </button>
          
          <div className="flex bg-slate-200 p-1 rounded-lg">
            {(['Especialista', 'Recepcion', 'Administrador'] as UserRole[]).map((role) => (
              <button
                key={role}
                onClick={() => setCurrentRole(role)}
                className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${
                  currentRole === role 
                  ? 'bg-white text-slate-900 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {role === 'Especialista' ? 'Ana' : role === 'Recepcion' ? 'Recepción' : 'Admin'}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Info Bar */}
      <div className="mb-6 flex flex-wrap items-center gap-6 px-4 py-2 bg-white rounded-xl border border-slate-200 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          {new Date().toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long' })}
        </div>
        <div className="flex items-center gap-2">
          <Info className="w-3 h-3" />
          TERMINAL: TS-0129-B
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-3 h-3 text-pink-500" />
          SESSION ENCRYPTED
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow">
        
        {/* VIEW: SPECIALIST (Ana) */}
        {currentRole === 'Especialista' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-8 space-y-6">
              <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-slate-200 shadow-sm overflow-hidden relative">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-pink-500"></div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900 mb-1">Tu Actividad de Hoy</h2>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">RESUMEN DE DESEMPEÑO PERSONAL - ANA</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase font-bold text-slate-400">Comisión Acumulada</p>
                  <p className="text-3xl font-black text-pink-600">${anaPerformance?.total.toFixed(2)}</p>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="bg-slate-900 p-4 flex justify-between items-center text-white">
                  <h3 className="font-bold flex items-center gap-2 italic uppercase text-[10px] tracking-widest text-[#FDFBF7]">
                    <Scissors className="w-4 h-4 text-pink-400" />
                    Servicios Realizados
                  </h3>
                  <span className="text-[10px] font-black bg-white/10 px-2 py-1 rounded truncate max-w-[100px]">{anaServices.length} servicios</span>
                </div>
                <div className="p-4 overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="text-[10px] uppercase text-slate-400 border-b border-slate-100">
                      <tr>
                        <th className="py-3 px-2">Servicio</th>
                        <th className="py-3 px-2">Precio</th>
                        <th className="py-3 px-2 text-right">Tu Comisión</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {anaServices.map((s) => (
                        <tr key={s.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                          <td className="py-4 px-2 font-black text-slate-800">{s.service}</td>
                          <td className="py-4 px-2 font-mono font-medium">${s.servicePrice.toFixed(2)}</td>
                          <td className="py-4 px-2 text-right font-mono text-pink-600 font-black">
                            +${(s.servicePrice * 0.3).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="md:col-span-4 space-y-6">
              <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl">
                <h3 className="text-[10px] uppercase tracking-widest text-slate-400 mb-6 font-bold flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Métricas Operativas
                </h3>
                <div className="space-y-6">
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase mb-2 font-bold">Total en Servicios</p>
                    <div className="flex items-end justify-between">
                      <span className="text-2xl font-black italic underline decoration-pink-500 underline-offset-4">${anaPerformance?.serviceTotal.toFixed(2)}</span>
                      <span className="text-[10px] bg-white/10 px-2 py-1 rounded font-bold">30% Share</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase mb-2 font-bold">Comisión por Productos</p>
                    <div className="flex items-end justify-between">
                      <span className="text-2xl font-black italic underline decoration-blue-500 underline-offset-4">${(anaPerformance?.productTotal! * 0.1).toFixed(2)}</span>
                      <span className="text-[10px] bg-white/10 px-2 py-1 rounded font-bold">10% Retail</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm flex items-center gap-4 text-slate-400 italic text-xs">
                <CreditCard className="w-8 h-8 opacity-20 text-pink-600" />
                <p>Las comisiones acumuladas se liquidan automáticamente al procesar el cierre de turno.</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* VIEW: RECEPTION */}
        {currentRole === 'Recepcion' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-7 space-y-6">
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="bg-slate-800 p-4 text-white flex justify-between items-center font-bold">
                  <h3 className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#FDFBF7]">
                    <Wallet className="w-4 h-4 text-pink-400" />
                    Pagos Pendientes por Cobrar
                  </h3>
                </div>
                <div className="p-4">
                  {PENDING_PAYMENTS.map((p, i) => (
                    <div key={i} className="flex justify-between items-center py-4 border-b border-slate-100 last:border-0 group hover:bg-slate-50 px-2 rounded-lg transition-colors">
                      <div>
                        <p className="font-black text-slate-900 uppercase text-xs mb-0.5">{p.client}</p>
                        <p className="text-[10px] text-slate-500 uppercase font-medium">{p.service}</p>
                      </div>
                      <div className="text-right flex items-center gap-4">
                        <span className="text-sm font-black text-slate-900 font-mono tracking-tighter">${p.amount.toFixed(2)}</span>
                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-pink-500 transition-colors" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="md:col-span-5 space-y-6">
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="bg-slate-900 p-4 text-white flex items-center gap-2 font-bold text-[10px] uppercase tracking-widest text-[#FDFBF7]">
                   <Package className="w-4 h-4 text-blue-400" />
                   Inventario: Reposición de Hoy
                </div>
                <div className="p-4">
                  <div className="space-y-4">
                    {INVENTORY.filter(item => item.soldToday > 0).map((item, i) => (
                      <div key={i} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-100">
                        <div>
                          <p className="text-xs font-black text-slate-800 uppercase">{item.name}</p>
                          <p className="text-[10px] text-pink-500 font-bold uppercase tracking-tighter italic">Vendido: {item.soldToday} u.</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] uppercase text-slate-400 font-bold mb-0.5">Stock</p>
                          <p className={`text-xs font-black ${item.currentStock < 5 ? 'text-red-500' : 'text-slate-900'}`}>{item.currentStock} u.</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* VIEW: ADMIN (Dueño) */}
        {currentRole === 'Administrador' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
                <p className="text-[10px] uppercase font-bold text-slate-400 mb-2 font-mono">Ingresos Brutos</p>
                <p className="text-3xl font-black text-slate-900">${totalSales.toFixed(2)}</p>
                <div className="mt-4 flex items-center gap-1 text-[10px] font-bold text-green-500 bg-green-50 px-2 py-1 rounded w-fit uppercase tracking-tighter">
                   <TrendingUp className="w-3 h-3" />
                   TURNO ACTUAL
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <p className="text-[10px] uppercase font-bold text-slate-400 mb-2 font-mono">Comisiones a Pagar</p>
                <p className="text-3xl font-black text-pink-600">${totalCommissions.toFixed(2)}</p>
                <p className="mt-4 text-[10px] text-slate-400 font-black uppercase italic tracking-widest truncate">Salidas Proyectadas</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <p className="text-[10px] uppercase font-bold text-slate-400 mb-2 font-mono">Gastos Hoy</p>
                <p className="text-3xl font-black text-slate-900 underline decoration-slate-200">${totalExpenses.toFixed(2)}</p>
                <p className="mt-4 text-[10px] text-slate-300 font-bold uppercase truncate tracking-widest">{EXPENSES.length} Movimientos</p>
              </div>
              <div className="bg-slate-900 p-6 rounded-2xl shadow-xl ring-4 ring-pink-500/10 text-white">
                <p className="text-[10px] uppercase font-bold text-slate-400 mb-2 font-mono text-[#FDFBF7]">Utilidad Neta Real</p>
                <p className="text-3xl font-black text-pink-400">${netUtility.toFixed(2)}</p>
                <p className="mt-4 text-[10px] text-white/40 font-black uppercase italic tracking-widest truncate">Balance Final Turno</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-8 bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="bg-slate-800 p-4 text-white font-black text-[10px] tracking-widest flex items-center gap-2 italic uppercase text-[#FDFBF7]">
                   <ShieldCheck className="w-4 h-4 text-pink-400" />
                   RESUMEN EJECUTIVO DE OPERACIONES
                </div>
                <div className="p-8">
                   <div className="space-y-6">
                      <div className="flex justify-between pb-4 border-b border-slate-100">
                         <span className="font-black text-xs uppercase tracking-widest text-slate-400">Total Venta de Servicios</span>
                         <span className="font-mono text-slate-600 font-bold">${totalServiceSales.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between pb-4 border-b border-slate-100">
                         <span className="font-black text-xs uppercase tracking-widest text-slate-400">Total Venta de Productos</span>
                         <span className="font-mono text-slate-600 font-bold">${totalProductSales.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between pb-4 border-b border-slate-100 italic font-medium">
                         <span className="font-black text-xs tracking-widest text-pink-600 uppercase">Retención por Comisiones</span>
                         <span className="font-mono text-pink-600 font-bold">-${totalCommissions.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between pt-4">
                         <span className="text-2xl font-black italic tracking-tighter">UTILIDAD OPERATIVA</span>
                         <span className="text-2xl font-black underline decoration-4 decoration-pink-500 underline-offset-4 font-mono tracking-tighter">
                           ${(totalSales - totalCommissions).toFixed(2)}
                         </span>
                      </div>
                   </div>
                </div>
              </div>
              <div className="md:col-span-4 bg-white border border-slate-200 shadow-sm rounded-2xl p-6 flex flex-col justify-center items-center text-center">
                 <p className="text-[10px] uppercase font-bold text-slate-400 mb-6 px-4 tracking-widest">Este reporte es un resumen del rendimiento operativo del turno en curso.</p>
                 <div className="p-5 bg-slate-900 rounded-full shadow-lg mb-6 border-4 border-pink-500/20">
                    <BarChart3 className="w-8 h-8 text-pink-500" />
                 </div>
                 <p className="text-xs text-slate-400 font-black italic uppercase tracking-tighter">"Excelencia en cada detalle"</p>
              </div>
            </div>
          </motion.div>
        )}

      </div>
      
      <footer className="mt-8 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 font-bold uppercase tracking-[0.3em] font-mono text-[8px] md:text-[10px]">
        <span>Glam OS v2.5 Stable Production</span>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          <span>Sincronización Cloud OK</span>
        </div>
        <span>© 2026 GLAM STUDIO MGMT</span>
      </footer>
    </div>
  );
};

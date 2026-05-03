import { Appointment, Sale, Specialist, PendingPayment, InventoryItem, Expense, MonthlyGoal } from './types';

export const APPOINTMENTS: Appointment[] = [
  { id: '1', name: 'Laura Martínez', service: 'Corte y Peinado', specialist: 'Ana', time: '10:00 AM', status: 'Completada' },
  { id: '2', name: 'Sofía Rodríguez', service: 'Manicura Spa', specialist: 'Roberto', time: '11:15 AM', status: 'Completada' },
  { id: '3', name: 'Carlos Penagos', service: 'Limpieza Facial', specialist: 'Ana', time: '12:30 PM', status: 'Completada' },
  { id: '4', name: 'Elena Gómez', service: 'Balayage', specialist: 'Ana', time: '03:00 PM', status: 'Pendiente' },
  { id: '5', name: 'Marta Soto', service: 'Masaje Relajante', specialist: 'Roberto', time: '04:30 PM', status: 'Pendiente' },
  { id: '6', name: 'Cliente Incógnito', service: 'Pestañas', specialist: 'Roberto', time: '05:00 PM', status: 'Cancelada' },
];

export const EXPENSES: Expense[] = [
  { description: 'Insumos básicos', amount: 450, date: '01 May' },
  { description: 'Reparación de secadora profesional', amount: 350, date: '03 May' },
];

export const MONTHLY_GOALS: MonthlyGoal[] = [
  { specialist: 'Ana', target: 5000, current: 3200 },
  { specialist: 'Roberto', target: 4500, current: 2800 },
  { specialist: 'Carla', target: 4000, current: 1500 },
  { specialist: 'Sofía', target: 4000, current: 2100 },
];

export const SALES: Sale[] = [
  { 
    id: 'S1', 
    service: 'Corte y Peinado', 
    extraProducts: ['Shampoo Keratina'], 
    servicePrice: 60,
    productPrice: 25,
    total: 85.00, 
    paymentMethod: 'Tarjeta',
    specialist: 'Ana'
  },
  { 
    id: 'S2', 
    service: 'Manicura Spa', 
    extraProducts: [], 
    servicePrice: 45,
    productPrice: 0,
    total: 45.00, 
    paymentMethod: 'Efectivo',
    specialist: 'Roberto' 
  },
  { 
    id: 'S3', 
    service: 'Balayage', 
    extraProducts: ['Mascarilla Hidratante', 'Serum Brillo'], 
    servicePrice: 150,
    productPrice: 60,
    total: 210.00, 
    paymentMethod: 'Transferencia',
    specialist: 'Ana'
  },
  { 
    id: 'S4', 
    service: 'Pedicura', 
    extraProducts: [], 
    servicePrice: 40,
    productPrice: 0,
    total: 40.00, 
    paymentMethod: 'Tarjeta',
    specialist: 'Carla' 
  },
  { 
    id: 'S5', 
    service: 'Tratamiento Facial', 
    extraProducts: [], 
    servicePrice: 90,
    productPrice: 0,
    total: 90.00, 
    paymentMethod: 'Efectivo',
    specialist: 'Sofía' 
  },
];

export const PENDING_PAYMENTS: PendingPayment[] = [
  { client: 'Elena Gómez', amount: 150, service: 'Balayage' },
  { client: 'Marta Soto', amount: 80, service: 'Masaje Relajante' },
];

export const INVENTORY: InventoryItem[] = [
  { name: 'Shampoo Keratina', soldToday: 1, currentStock: 8 },
  { name: 'Mascarilla Hidratante', soldToday: 1, currentStock: 3 },
  { name: 'Serum Brillo', soldToday: 1, currentStock: 5 },
  { name: 'Cera Modeladora', soldToday: 0, currentStock: 12 },
];

export const SPECIALISTS: Specialist[] = [
  { name: 'Ana', serviceCommission: 0.30, productCommission: 0.10 },
  { name: 'Roberto', serviceCommission: 0.30, productCommission: 0.10 },
  { name: 'Carla', serviceCommission: 0.35, productCommission: 0.10 },
  { name: 'Sofía', serviceCommission: 0.30, productCommission: 0.12 },
];

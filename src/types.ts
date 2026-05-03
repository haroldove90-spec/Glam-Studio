
export type UserRole = 'especialista' | 'recepcion' | 'admin' | 'cliente';

export interface Appointment {
  id: string;
  name: string;
  service: string;
  specialist: string;
  time: string;
  status: 'Completada' | 'Pendiente' | 'Cancelada' | 'En Proceso';
  notes?: string;
}

export interface Sale {
  id: string;
  service: string;
  extraProducts: string[];
  servicePrice: number;
  productPrice: number;
  total: number;
  paymentMethod: 'Efectivo' | 'Tarjeta' | 'Transferencia';
  specialist: string;
  date: string;
  loyaltyPoints?: number;
}

export interface PendingPayment {
  client: string;
  amount: number;
  service: string;
}

export interface InventoryItem {
  name: string;
  soldToday: number;
  currentStock: number;
}

export interface Expense {
  description: string;
  amount: number;
  date: string;
}

export interface MonthlyGoal {
  specialist: string;
  target: number;
  current: number;
}

export interface Specialist {
  name: string;
  serviceCommission: number;
  productCommission: number;
}

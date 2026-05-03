
export type UserRole = 'especialista' | 'recepcion' | 'admin';

export interface Appointment {
  id: string;
  name: string;
  service: string;
  specialist: string;
  time: string;
  status: 'Completada' | 'Pendiente' | 'Cancelada';
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

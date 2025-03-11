import { StaffTeam, StaffRole, StaffStatus } from '../models/staff';

export interface Staff {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  team: StaffTeam;
  role: StaffRole;
  status: StaffStatus;
  joinDate: Date;
  terminationDate?: Date;
  salary: number;
  commissionRate: number;
  vehiclesSold: number;
  totalCommission: number;
  note?: string;
}

export interface StaffHistory {
  id: string;
  staffId: string;
  fromStatus: StaffStatus;
  toStatus: StaffStatus;
  changedAt: Date;
  changedBy: string;
  notes?: string;
} 
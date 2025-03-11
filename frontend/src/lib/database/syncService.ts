import { supabase } from './supabase';
import { Vehicle } from '../../types/vehicles/vehicle';
import { Staff } from '../../models/staff';
import { KpiTarget, SupportDepartmentBonus } from '../../models/kpi';

// Định nghĩa loại hành động đồng bộ
export type SyncAction = 
  | { type: 'vehicle_add', data: Vehicle }
  | { type: 'vehicle_update', data: Vehicle }
  | { type: 'vehicle_delete', data: { id: string } }
  | { type: 'staff_add', data: Staff }
  | { type: 'staff_update', data: Staff }
  | { type: 'staff_delete', data: { id: string } }
  | { type: 'kpi_update', data: KpiTarget[] }
  | { type: 'bonus_update', data: SupportDepartmentBonus[] };

// Hàm lưu trữ các action đang chờ khi offline
export const savePendingSync = (action: SyncAction) => {
  const pendingActions = getPendingSync();
  pendingActions.push({
    ...action,
    timestamp: new Date().toISOString()
  });
  localStorage.setItem('pendingSync', JSON.stringify(pendingActions));
};

// Hàm lấy danh sách các action đang chờ
export const getPendingSync = (): (SyncAction & { timestamp: string })[] => {
  const pendingActions = localStorage.getItem('pendingSync');
  return pendingActions ? JSON.parse(pendingActions) : [];
};

// Hàm merge dữ liệu từ server với dữ liệu local
export const mergeData = <T extends { id: string }>(localData: T[], serverData: T[]): T[] => {
  // Tạo một map để truy cập nhanh các item theo ID
  const localMap = new Map<string, T>();
  localData.forEach(item => localMap.set(item.id, item));
  
  // Duyệt qua dữ liệu server và merge với dữ liệu local
  const mergedData: T[] = [];
  const processedIds = new Set<string>();
  
  // Xử lý dữ liệu từ server trước
  serverData.forEach(serverItem => {
    const localItem = localMap.get(serverItem.id);
    
    if (localItem) {
      // Nếu item tồn tại ở cả local và server, giữ lại item local vì có thể đã được chỉnh sửa
      mergedData.push(localItem);
    } else {
      // Nếu item chỉ tồn tại ở server, thêm vào kết quả
      mergedData.push(serverItem);
    }
    
    processedIds.add(serverItem.id);
  });
  
  // Thêm các item chỉ tồn tại ở local (item mới chưa được đồng bộ)
  localData.forEach(localItem => {
    if (!processedIds.has(localItem.id)) {
      mergedData.push(localItem);
    }
  });
  
  return mergedData;
};

// Hàm xử lý đồng bộ hóa data khi có kết nối
export const syncPendingActions = async (): Promise<boolean> => {
  try {
    const pendingUploads = getPendingSync();
    
    if (pendingUploads.length === 0) {
      return true;
    }
    
    // Xử lý từng action một
    for (const item of pendingUploads) {
      try {
        switch (item.type) {
          case 'vehicle_add':
            await supabase.from('vehicles').insert([item.data]);
            break;
          case 'vehicle_update':
            await supabase.from('vehicles').update(item.data).eq('id', item.data.id);
            break;
          case 'vehicle_delete':
            await supabase.from('vehicles').delete().eq('id', item.data.id);
            break;
          case 'staff_add':
            await supabase.from('staff').insert([item.data]);
            break;
          case 'staff_update':
            await supabase.from('staff').update(item.data).eq('id', item.data.id);
            break;
          case 'staff_delete':
            await supabase.from('staff').delete().eq('id', item.data.id);
            break;
          case 'kpi_update':
            // Xóa KPI cũ và chèn KPI mới với cùng tháng và năm
            if (item.data.length > 0) {
              const month = item.data[0].month;
              const year = item.data[0].year;
              await supabase.from('kpi_targets')
                .delete()
                .match({ month, year });
              await supabase.from('kpi_targets').insert(item.data);
            }
            break;
          case 'bonus_update':
            // Tương tự với bonus
            if (item.data.length > 0) {
              const month = item.data[0].month;
              const year = item.data[0].year;
              await supabase.from('support_bonuses')
                .delete()
                .match({ month, year });
              await supabase.from('support_bonuses').insert(item.data);
            }
            break;
        }
      } catch (error) {
        console.error(`Lỗi khi đồng bộ ${item.type}:`, error);
        // Nếu có lỗi, tiếp tục với action tiếp theo
        continue;
      }
    }
    
    // Xóa tất cả các action đã xử lý
    localStorage.removeItem('pendingSync');
    return true;
  } catch (error) {
    console.error('Lỗi khi đồng bộ dữ liệu:', error);
    return false;
  }
};

// Hàm tải dữ liệu từ Supabase
export const loadVehiclesFromSupabase = async (): Promise<Vehicle[]> => {
  try {
    console.log('Bắt đầu tải dữ liệu xe từ Supabase');
    
    // Lấy danh sách xe
    const { data: vehiclesData, error: vehiclesError } = await supabase
      .from('vehicles')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (vehiclesError) {
      console.error('Lỗi khi tải dữ liệu xe:', vehiclesError);
      throw vehiclesError;
    }

    // Lấy chi phí của xe
    const { data: costsData, error: costsError } = await supabase
      .from('vehicle_costs')
      .select('*');

    if (costsError) {
      console.error('Lỗi khi tải dữ liệu chi phí:', costsError);
    }

    // Lấy thanh toán của xe
    const { data: paymentsData, error: paymentsError } = await supabase
      .from('vehicle_payments')
      .select('*');

    if (paymentsError) {
      console.error('Lỗi khi tải dữ liệu thanh toán:', paymentsError);
    }

    // Gộp dữ liệu
    const vehicles = vehiclesData?.map(vehicle => ({
      ...vehicle,
      importDate: new Date(vehicle.import_date),
      exportDate: vehicle.export_date ? new Date(vehicle.export_date) : null,
      costs: costsData?.filter(cost => cost.vehicle_id === vehicle.id) || [],
      payments: paymentsData?.filter(payment => payment.vehicle_id === vehicle.id) || []
    })) || [];

    console.log('Dữ liệu từ server:', vehicles.length, 'xe');
    
    // Lấy dữ liệu local hiện tại
    const savedVehicles = localStorage.getItem('vehicles');
    const localVehicles = savedVehicles ? JSON.parse(savedVehicles) : [];
    console.log('Dữ liệu local:', localVehicles.length, 'xe');
    
    // Merge dữ liệu
    const mergedData = mergeData(localVehicles, vehicles);
    console.log('Dữ liệu sau khi merge:', mergedData.length, 'xe');
    
    // Lưu lại vào localStorage
    localStorage.setItem('vehicles', JSON.stringify(mergedData));
    
    return mergedData;
  } catch (error) {
    console.error('Lỗi khi tải xe từ Supabase:', error);
    const savedVehicles = localStorage.getItem('vehicles');
    return savedVehicles ? JSON.parse(savedVehicles) : [];
  }
};

export const loadStaffFromSupabase = async (): Promise<Staff[]> => {
  try {
    // Lấy danh sách nhân viên
    const { data: staffData, error: staffError } = await supabase
      .from('staff')
      .select('*');
      
    if (staffError) throw staffError;

    // Lấy KPI targets
    const { data: kpiData, error: kpiError } = await supabase
      .from('kpi_targets')
      .select('*');

    if (kpiError) {
      console.error('Lỗi khi tải dữ liệu KPI:', kpiError);
    }

    // Gộp dữ liệu
    const staff = staffData?.map(member => ({
      ...member,
      joinDate: new Date(member.join_date),
      leaveDate: member.leave_date ? new Date(member.leave_date) : null,
      kpiTargets: kpiData?.filter(kpi => kpi.staff_id === member.id) || []
    })) || [];
    
    // Lấy dữ liệu local hiện tại
    const savedStaff = localStorage.getItem('staffList');
    const localStaff = savedStaff ? JSON.parse(savedStaff) : [];
    
    // Merge dữ liệu
    return mergeData(localStaff, staff);
  } catch (error) {
    console.error('Lỗi khi tải nhân viên từ Supabase:', error);
    const savedStaff = localStorage.getItem('staffList');
    return savedStaff ? JSON.parse(savedStaff) : [];
  }
};

export const loadKpiFromSupabase = async (): Promise<KpiTarget[]> => {
  try {
    const { data, error } = await supabase
      .from('kpi_targets')
      .select('*');
      
    if (error) throw error;
    
    const kpiTargets = data?.map(kpi => ({
      ...kpi,
      targetMonth: kpi.target_month ? new Date(kpi.target_month) : null
    })) || [];
    
    const savedKpis = localStorage.getItem('kpis');
    const localKpis = savedKpis ? JSON.parse(savedKpis) : [];
    
    return mergeData(localKpis, kpiTargets);
  } catch (error) {
    console.error('Lỗi khi tải KPI từ Supabase:', error);
    const savedKpis = localStorage.getItem('kpis');
    return savedKpis ? JSON.parse(savedKpis) : [];
  }
};

export const loadSupportBonusFromSupabase = async (): Promise<SupportDepartmentBonus[]> => {
  try {
    const { data, error } = await supabase
      .from('support_bonuses')
      .select('*');
      
    if (error) throw error;
    
    const bonuses = data?.map(bonus => ({
      ...bonus,
      bonusMonth: bonus.bonus_month ? new Date(bonus.bonus_month) : null
    })) || [];
    
    const savedBonuses = localStorage.getItem('supportBonuses');
    const localBonuses = savedBonuses ? JSON.parse(savedBonuses) : [];
    
    return mergeData(localBonuses, bonuses);
  } catch (error) {
    console.error('Lỗi khi tải thưởng phòng hỗ trợ từ Supabase:', error);
    const savedBonuses = localStorage.getItem('supportBonuses');
    return savedBonuses ? JSON.parse(savedBonuses) : [];
  }
}; 
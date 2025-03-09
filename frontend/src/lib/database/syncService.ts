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
    const { data, error } = await supabase
      .from('vehicles')
      .select('*');
      
    if (error) throw error;
    
    // Lấy dữ liệu local hiện tại
    const savedVehicles = localStorage.getItem('vehicles');
    const localVehicles = savedVehicles ? JSON.parse(savedVehicles) : [];
    
    // Merge dữ liệu thay vì trả về trực tiếp dữ liệu từ server
    return mergeData(localVehicles, data || []);
  } catch (error) {
    console.error('Lỗi khi tải xe từ Supabase:', error);
    // Trả về dữ liệu local nếu có lỗi
    const savedVehicles = localStorage.getItem('vehicles');
    return savedVehicles ? JSON.parse(savedVehicles) : [];
  }
};

export const loadStaffFromSupabase = async (): Promise<Staff[]> => {
  try {
    const { data, error } = await supabase
      .from('staff')
      .select('*');
      
    if (error) throw error;
    
    // Lấy dữ liệu local hiện tại
    const savedStaff = localStorage.getItem('staffList');
    const localStaff = savedStaff ? JSON.parse(savedStaff) : [];
    
    // Merge dữ liệu thay vì trả về trực tiếp dữ liệu từ server
    return mergeData(localStaff, data || []);
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
    
    // Lấy dữ liệu local hiện tại
    const savedKpis = localStorage.getItem('kpis');
    const localKpis = savedKpis ? JSON.parse(savedKpis) : [];
    
    // Merge dữ liệu thay vì trả về trực tiếp dữ liệu từ server
    return mergeData(localKpis, data || []);
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
    
    // Lấy dữ liệu local hiện tại
    const savedBonuses = localStorage.getItem('supportBonuses');
    const localBonuses = savedBonuses ? JSON.parse(savedBonuses) : [];
    
    // Merge dữ liệu thay vì trả về trực tiếp dữ liệu từ server
    return mergeData(localBonuses, data || []);
  } catch (error) {
    console.error('Lỗi khi tải thưởng phòng hỗ trợ từ Supabase:', error);
    const savedBonuses = localStorage.getItem('supportBonuses');
    return savedBonuses ? JSON.parse(savedBonuses) : [];
  }
}; 
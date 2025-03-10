import { useState, useEffect } from 'react';
import { KpiTarget, SupportDepartmentBonus } from '../models/kpi';
import { supabase } from '../lib/database/supabase';

interface KpiDataState {
  kpis: KpiTarget[];
  supportBonuses: SupportDepartmentBonus[];
  isLoading: boolean;
  error: string | null;
}

export const useKpiData = (month: number, year: number) => {
  const [state, setState] = useState<KpiDataState>({
    kpis: [],
    supportBonuses: [],
    isLoading: false,
    error: null
  });

  useEffect(() => {
    const fetchKpiData = async () => {
      if (!month || !year) return;
      
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      try {
        // Tải dữ liệu KPI từ Supabase
        const { data: kpiData, error: kpiError } = await supabase
          .from('kpi_targets')
          .select('*')
          .eq('month', month)
          .eq('year', year);
          
        if (kpiError) throw new Error(`Lỗi khi tải KPI: ${kpiError.message}`);
        
        // Tải dữ liệu thưởng bộ phận hỗ trợ từ Supabase
        const { data: bonusData, error: bonusError } = await supabase
          .from('support_bonuses')
          .select('*')
          .eq('month', month)
          .eq('year', year);
          
        if (bonusError) throw new Error(`Lỗi khi tải thưởng: ${bonusError.message}`);
        
        // Cập nhật state với dữ liệu đã tải
        setState({
          kpis: kpiData || [],
          supportBonuses: bonusData || [],
          isLoading: false,
          error: null
        });
      } catch (error) {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: error instanceof Error ? error.message : 'Lỗi không xác định'
        }));
        console.error('Lỗi khi tải dữ liệu KPI:', error);
      }
    };
    
    fetchKpiData();
  }, [month, year]);
  
  // Hàm lưu dữ liệu KPI
  const saveKpiTargets = async (kpiTargets: KpiTarget[]): Promise<boolean> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // Đối với mỗi KPI target, cần upsert (insert hoặc update)
      const { error } = await supabase
        .from('kpi_targets')
        .upsert(kpiTargets, { onConflict: 'id' });
      
      if (error) throw new Error(`Lỗi khi lưu KPI: ${error.message}`);
      
      // Cập nhật state
      setState(prev => ({
        ...prev,
        kpis: kpiTargets,
        isLoading: false,
        error: null
      }));
      
      return true;
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Lỗi không xác định'
      }));
      console.error('Lỗi khi lưu KPI targets:', error);
      return false;
    }
  };
  
  // Hàm lưu dữ liệu thưởng bộ phận hỗ trợ
  const saveSupportBonuses = async (bonuses: SupportDepartmentBonus[]): Promise<boolean> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // Đối với mỗi bonus, cần upsert (insert hoặc update)
      const { error } = await supabase
        .from('support_bonuses')
        .upsert(bonuses, { onConflict: 'id' });
      
      if (error) throw new Error(`Lỗi khi lưu thưởng: ${error.message}`);
      
      // Cập nhật state
      setState(prev => ({
        ...prev,
        supportBonuses: bonuses,
        isLoading: false,
        error: null
      }));
      
      return true;
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Lỗi không xác định'
      }));
      console.error('Lỗi khi lưu support bonuses:', error);
      return false;
    }
  };
  
  return {
    ...state,
    saveKpiTargets,
    saveSupportBonuses
  };
}; 
-- Cấu trúc bảng cho Supabase
-- Sử dụng trong SQL Editor của Supabase để tạo các bảng cần thiết

-- Bảng quản lý xe
CREATE TABLE IF NOT EXISTS vehicles (
  id TEXT PRIMARY KEY,
  model TEXT NOT NULL,
  brand TEXT NOT NULL,
  color TEXT,
  year INTEGER,
  license_plate TEXT,
  vin TEXT,
  import_date TIMESTAMP WITH TIME ZONE NOT NULL,
  export_date TIMESTAMP WITH TIME ZONE,
  purchase_price DECIMAL(15, 2) NOT NULL,
  sale_price DECIMAL(15, 2),
  cost DECIMAL(15, 2) DEFAULT 0,
  profit DECIMAL(15, 2) DEFAULT 0,
  debt DECIMAL(15, 2) DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'IN_STOCK',
  sales_staff_id TEXT,
  description TEXT,
  deposit_amount DECIMAL(15, 2) DEFAULT 0,
  bank_deposit_amount DECIMAL(15, 2) DEFAULT 0,
  offset_amount DECIMAL(15, 2) DEFAULT 0,
  total_paid DECIMAL(15, 2) DEFAULT 0,
  storage_time INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Index cho các trường thường được tìm kiếm
CREATE INDEX IF NOT EXISTS vehicle_status_idx ON vehicles (status);
CREATE INDEX IF NOT EXISTS vehicle_import_date_idx ON vehicles (import_date);
CREATE INDEX IF NOT EXISTS vehicle_sales_staff_idx ON vehicles (sales_staff_id);

-- Bảng quản lý nhân viên
CREATE TABLE IF NOT EXISTS staff (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT,
  position TEXT,
  team TEXT,
  role TEXT,
  join_date TIMESTAMP WITH TIME ZONE NOT NULL,
  termination_date TIMESTAMP WITH TIME ZONE,
  status TEXT NOT NULL DEFAULT 'ACTIVE',
  base_salary DECIMAL(15, 2) DEFAULT 0,
  bonus_per_vehicle DECIMAL(15, 2) DEFAULT 0,
  commission_rate DECIMAL(5, 2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Index cho các trường thường được tìm kiếm
CREATE INDEX IF NOT EXISTS staff_status_idx ON staff (status);
CREATE INDEX IF NOT EXISTS staff_team_idx ON staff (team);
CREATE INDEX IF NOT EXISTS staff_role_idx ON staff (role);

-- Bảng KPI targets
CREATE TABLE IF NOT EXISTS kpi_targets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  staff_id TEXT REFERENCES staff(id) ON DELETE CASCADE,
  target_type TEXT NOT NULL,
  target_value DECIMAL(15, 2) NOT NULL,
  month INTEGER NOT NULL,
  year INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE (staff_id, target_type, month, year)
);

-- Bảng bonuses cho bộ phận hỗ trợ
CREATE TABLE IF NOT EXISTS support_bonuses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  department TEXT NOT NULL,
  bonus_per_vehicle DECIMAL(15, 2) NOT NULL,
  month INTEGER NOT NULL,
  year INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE (department, month, year)
);

-- Bảng lưu log đồng bộ dữ liệu
CREATE TABLE IF NOT EXISTS sync_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  device_info JSONB NOT NULL,
  sync_time TIMESTAMP WITH TIME ZONE NOT NULL,
  is_successful BOOLEAN DEFAULT true,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Trigger để tự động cập nhật updated_at khi cập nhật bản ghi
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_vehicles_timestamp
BEFORE UPDATE ON vehicles
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_staff_timestamp
BEFORE UPDATE ON staff
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_kpi_targets_timestamp
BEFORE UPDATE ON kpi_targets
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_support_bonuses_timestamp
BEFORE UPDATE ON support_bonuses
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();

-- Enable RLS (Row Level Security)
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE kpi_targets ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_bonuses ENABLE ROW LEVEL SECURITY;
ALTER TABLE sync_logs ENABLE ROW LEVEL SECURITY;

-- Tạo policy cho phép đọc/ghi cho tất cả người dùng đã xác thực
-- Trong môi trường thực tế, bạn sẽ muốn cấu hình chính sách chi tiết hơn
CREATE POLICY "Allow read for all authenticated users" 
ON vehicles FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow write for all authenticated users" 
ON vehicles FOR ALL USING (auth.role() = 'authenticated');

-- Tương tự cho các bảng khác
CREATE POLICY "Allow read for all authenticated users" 
ON staff FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow write for all authenticated users" 
ON staff FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow read for all authenticated users" 
ON kpi_targets FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow write for all authenticated users" 
ON kpi_targets FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow read for all authenticated users" 
ON support_bonuses FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow write for all authenticated users" 
ON support_bonuses FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow read for all authenticated users" 
ON sync_logs FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow write for all authenticated users" 
ON sync_logs FOR ALL USING (auth.role() = 'authenticated'); 
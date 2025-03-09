import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Staff, StaffRole, StaffTeam, StaffStatus } from '../../types/staff/staff';

// Initial state
interface StaffState {
  staffList: Staff[];
  loading: boolean;
  error: string | null;
}

const initialState: StaffState = {
  staffList: [],
  loading: false,
  error: null,
};

// Async thunks
export const getAllStaff = createAsyncThunk<Staff[]>(
  'staff/getAllStaff',
  async (_, { rejectWithValue }) => {
    try {
      // Mô phỏng API call (thay thế bằng API thực tế sau)
      return [];
    } catch (error) {
      return rejectWithValue('Không thể tải danh sách nhân viên');
    }
  }
);

export const addStaff = createAsyncThunk<Staff, Partial<Staff>>(
  'staff/addStaff',
  async (staffData: Partial<Staff>, { rejectWithValue }) => {
    try {
      // Mô phỏng API call (thay thế bằng API thực tế sau)
      const newStaff: Staff = {
        id: Date.now().toString(),
        name: staffData.name || '',
        phone: staffData.phone || '',
        email: staffData.email || '',
        address: staffData.address || '',
        role: staffData.role || StaffRole.STAFF,
        team: staffData.team || StaffTeam.OTHER,
        status: staffData.status || StaffStatus.ACTIVE,
        joinDate: staffData.joinDate || new Date(),
        salary: staffData.salary || 0,
        vehiclesSold: 0,
        commissionRate: 0,
        totalCommission: 0,
      };
      return newStaff;
    } catch (error) {
      return rejectWithValue('Không thể thêm nhân viên mới');
    }
  }
);

export const updateStaff = createAsyncThunk<Staff, Partial<Staff>>(
  'staff/updateStaff',
  async (staffData: Partial<Staff>, { rejectWithValue }) => {
    try {
      // Mô phỏng API call (thay thế bằng API thực tế sau)
      return staffData as Staff;
    } catch (error) {
      return rejectWithValue('Không thể cập nhật thông tin nhân viên');
    }
  }
);

export const deleteStaff = createAsyncThunk<string, string>(
  'staff/deleteStaff',
  async (staffId: string, { rejectWithValue }) => {
    try {
      // Mô phỏng API call (thay thế bằng API thực tế sau)
      return staffId;
    } catch (error) {
      return rejectWithValue('Không thể xóa nhân viên');
    }
  }
);

// Slice
const staffSlice = createSlice({
  name: 'staff',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get all staff
      .addCase(getAllStaff.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllStaff.fulfilled, (state, action) => {
        state.loading = false;
        state.staffList = action.payload;
      })
      .addCase(getAllStaff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Add staff
      .addCase(addStaff.fulfilled, (state, action) => {
        state.staffList.push(action.payload);
      })
      
      // Update staff
      .addCase(updateStaff.fulfilled, (state, action) => {
        const index = state.staffList.findIndex(staff => staff.id === action.payload.id);
        if (index !== -1) {
          state.staffList[index] = action.payload;
        }
      })
      
      // Delete staff
      .addCase(deleteStaff.fulfilled, (state, action) => {
        state.staffList = state.staffList.filter(staff => staff.id !== action.payload);
      });
  },
});

export default staffSlice.reducer; 
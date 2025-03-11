import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Staff, StaffRole, StaffTeam, StaffStatus } from '../../types/staff/staff';

// Initial state
interface StaffState {
  list: Staff[];
  staffList: Staff[];
  selectedStaff: Staff | null;
  loading: boolean;
  error: string | null;
}

const initialState: StaffState = {
  list: [],
  staffList: [],
  selectedStaff: null,
  loading: false,
  error: null
};

// Thunk actions
export const fetchStaffList = createAsyncThunk<Staff[]>(
  'staff/fetchStaffList', 
  async (_, { rejectWithValue }) => {
    try {
      // Mô phỏng API call (thay thế bằng API thực tế sau)
      return [] as Staff[];
    } catch (error) {
      return rejectWithValue('Không thể tải danh sách nhân viên');
    }
  }
);

export const getAllStaff = fetchStaffList;

export const addStaff = createAsyncThunk<Staff, Partial<Staff>>(
  'staff/addStaff', 
  async (staffData: Partial<Staff>, { rejectWithValue }) => {
    try {
      // Mô phỏng API call (thay thế bằng API thực tế sau)
      return {
        id: `staff-${Date.now()}`,
        name: staffData.name || '',
        email: staffData.email || '',
        phone: staffData.phone || '',
        address: staffData.address || '',
        role: staffData.role || StaffRole.STAFF,
        team: staffData.team || StaffTeam.SALES,
        status: staffData.status || StaffStatus.ACTIVE,
        joinDate: staffData.joinDate || new Date(),
        salary: staffData.salary || 0
      } as Staff;
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
  reducers: {
    selectStaff: (state, action: PayloadAction<Staff>) => {
      state.selectedStaff = action.payload;
    },
    clearSelectedStaff: (state) => {
      state.selectedStaff = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch staff list
      .addCase(fetchStaffList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStaffList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
        state.staffList = action.payload;
      })
      .addCase(fetchStaffList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Add staff
      .addCase(addStaff.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addStaff.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
        state.staffList.push(action.payload);
      })
      .addCase(addStaff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update staff
      .addCase(updateStaff.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStaff.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.list.findIndex(staff => staff.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
          const staffListIndex = state.staffList.findIndex(staff => staff.id === action.payload.id);
          if (staffListIndex !== -1) {
            state.staffList[staffListIndex] = action.payload;
          }
        }
        if (state.selectedStaff && state.selectedStaff.id === action.payload.id) {
          state.selectedStaff = action.payload;
        }
      })
      .addCase(updateStaff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete staff
      .addCase(deleteStaff.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteStaff.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter(staff => staff.id !== action.payload);
        state.staffList = state.staffList.filter(staff => staff.id !== action.payload);
        if (state.selectedStaff && state.selectedStaff.id === action.payload) {
          state.selectedStaff = null;
        }
      })
      .addCase(deleteStaff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { selectStaff, clearSelectedStaff, clearError } = staffSlice.actions;
export default staffSlice.reducer; 
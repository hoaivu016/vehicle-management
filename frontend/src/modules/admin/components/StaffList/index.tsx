import React, { useState, useMemo } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  IconButton,
  Tooltip,
  Chip,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Avatar,
  Grid,
  Alert
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { 
  Staff, 
  StaffStatus,
  StaffTeam,
  StaffRole
} from '../../../../types/staff/staff';
import { formatCurrency, formatDate } from '../../../../utils/formatters';

// Hàm lấy màu cho trạng thái nhân viên
const getStatusColor = (status: StaffStatus): string => {
  switch (status) {
    case StaffStatus.ACTIVE:
      return '#4caf50'; // Xanh lá
    case StaffStatus.ON_LEAVE:
      return '#ff9800'; // Cam
    case StaffStatus.SUSPENDED:
      return '#f44336'; // Đỏ
    case StaffStatus.TERMINATED:
      return '#9e9e9e'; // Xám
    default:
      return '#9e9e9e';
  }
};

// Hàm để lấy màu cho từng đội nhóm
const getTeamColor = (team: StaffTeam) => {
  switch (team) {
    case StaffTeam.SALES_1:
      return 'primary.main';
    case StaffTeam.SALES_2:
      return 'info.main';
    case StaffTeam.SALES_3:
      return 'info.dark';
    case StaffTeam.ACCOUNTING:
      return 'success.main';
    case StaffTeam.TECHNICAL:
      return 'warning.main';
    case StaffTeam.MANAGEMENT:
      return 'secondary.main';
    default:
      return 'text.secondary';
  }
};

// Định nghĩa props cho component
interface StaffListProps {
  staffList: Staff[];
  onEdit: (staff: Staff) => void;
  onDelete: (staffId: string) => void;
  vehicles?: any[]; // Thêm props vehicles để kiểm tra liên kết
  onAdd?: () => void; // Thêm prop onAdd để xử lý thêm nhân viên
}

// Component bảng danh sách nhân sự
const StaffList: React.FC<StaffListProps> = ({ 
  staffList, 
  onEdit, 
  onDelete,
  vehicles = [], // Mặc định là mảng rỗng
  onAdd
}) => {
  // State cho dialog xác nhận xóa
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [staffToDelete, setStaffToDelete] = useState<Staff | null>(null);
  const [relatedVehicles, setRelatedVehicles] = useState<any[]>([]);
  
  // State cho dialog xem chi tiết
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);

  // Hàm sắp xếp nhân viên theo thứ tự ưu tiên
  const sortStaffList = (staff: Staff[]): Staff[] => {
    return [...staff].sort((a, b) => {
      // Thứ tự ưu tiên cho phòng ban
      const teamOrder: Record<StaffTeam, number> = {
        [StaffTeam.MANAGEMENT]: 1,
        [StaffTeam.ACCOUNTING]: 2,
        [StaffTeam.SALES_1]: 3,
        [StaffTeam.SALES_2]: 4,
        [StaffTeam.SALES_3]: 5,
        [StaffTeam.TECHNICAL]: 6,
        [StaffTeam.OTHER]: 7
      };
      
      // Thứ tự ưu tiên cho chức vụ
      const roleOrder: Record<StaffRole, number> = {
        [StaffRole.MANAGER]: 1,
        [StaffRole.TEAM_LEADER]: 2,
        [StaffRole.STAFF]: 3,
        [StaffRole.INTERN]: 4
      };
      
      // So sánh phòng ban trước
      if (teamOrder[a.team] !== teamOrder[b.team]) {
        return teamOrder[a.team] - teamOrder[b.team];
      }
      
      // Nếu cùng phòng ban, so sánh chức vụ
      return roleOrder[a.role] - roleOrder[b.role];
    });
  };
  
  // Sắp xếp danh sách nhân viên
  const sortedStaffList = useMemo(() => sortStaffList(staffList), [staffList]);

  // Mở dialog xác nhận xóa
  const handleOpenDeleteDialog = (staff: Staff) => {
    setStaffToDelete(staff);
    
    // Kiểm tra xe liên quan
    const related = vehicles.filter(v => v.saleStaff && v.saleStaff.id === staff.id);
    setRelatedVehicles(related);
    
    setDeleteDialogOpen(true);
  };

  // Đóng dialog xác nhận xóa
  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setStaffToDelete(null);
    setRelatedVehicles([]);
  };

  // Xác nhận xóa nhân viên
  const handleConfirmDelete = () => {
    if (staffToDelete) {
      onDelete(staffToDelete.id);
      handleCloseDeleteDialog();
    }
  };

  // Mở dialog xem chi tiết
  const handleOpenDetailDialog = (staff: Staff) => {
    setSelectedStaff(staff);
    setDetailDialogOpen(true);
  };

  // Đóng dialog xem chi tiết
  const handleCloseDetailDialog = () => {
    setDetailDialogOpen(false);
    setSelectedStaff(null);
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ fontSize: '1.3rem', mb: 0 }}>
          Danh Sách Nhân Viên
        </Typography>
        {onAdd && (
          <Button 
            variant="contained" 
            color="primary" 
            onClick={onAdd}
            startIcon={<AddCircleOutlineIcon />}
          >
            Thêm Nhân Viên Mới
          </Button>
        )}
      </Box>
      <TableContainer 
        component={Paper} 
        sx={{ 
          width: '100%', 
          height: 'calc(100vh - 250px)', 
          overflowX: 'auto',
          overflowY: 'auto',
          mb: 3,
          border: '1px solid #e0e0e0',
          borderRadius: 1,
          boxShadow: 1
        }}
      >
        <Table 
          stickyHeader 
          aria-label="sticky table"
          size="small"
          sx={{ 
            minWidth: 'auto',
            tableLayout: 'auto',
            '& .MuiTableCell-root': {
              padding: '8px 12px',
              fontSize: '0.875rem',
              whiteSpace: 'nowrap'
            },
            '& .MuiTableCell-head': {
              backgroundColor: '#f5f5f5',
              fontWeight: 'bold'
            }
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell width="10%">Mã NV</TableCell>
              <TableCell width="15%">Họ tên</TableCell>
              <TableCell width="15%">Phòng ban</TableCell>
              <TableCell width="10%">Chức vụ</TableCell>
              <TableCell width="8%">Trạng thái</TableCell>
              <TableCell width="12%">Điện thoại</TableCell>
              <TableCell width="15%">Email</TableCell>
              <TableCell width="8%">Ngày vào</TableCell>
              <TableCell width="10%">Lương</TableCell>
              <TableCell width="5%">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedStaffList.map((staff) => (
              <TableRow 
                key={staff.id} 
                hover
                onClick={() => handleOpenDetailDialog(staff)}
                sx={{ 
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)'
                  }
                }}
              >
                <TableCell>{staff.id}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar 
                      src={staff.avatar} 
                      alt={staff.name}
                      sx={{ width: 24, height: 24, mr: 1 }}
                    >
                      {staff.name.charAt(0)}
                    </Avatar>
                    <Typography variant="body2">{staff.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip 
                    label={staff.team} 
                    size="small"
                    sx={{ 
                      backgroundColor: getTeamColor(staff.team),
                      color: 'white',
                      fontSize: '0.75rem'
                    }}
                  />
                </TableCell>
                <TableCell>{staff.role}</TableCell>
                <TableCell>
                  <Chip 
                    label={staff.status} 
                    size="small"
                    sx={{ 
                      backgroundColor: getStatusColor(staff.status),
                      color: 'white',
                      fontSize: '0.75rem'
                    }}
                  />
                </TableCell>
                <TableCell>{staff.phone}</TableCell>
                <TableCell sx={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {staff.email}
                </TableCell>
                <TableCell>{formatDate(staff.joinDate)}</TableCell>
                <TableCell>{formatCurrency(staff.salary)}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex' }}>
                    <Tooltip title="Sửa">
                      <IconButton 
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit(staff);
                        }} 
                        size="small"
                        color="primary"
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Xóa">
                      <IconButton 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenDeleteDialog(staff);
                        }} 
                        size="small"
                        color="error"
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
            {sortedStaffList.length === 0 && (
              <TableRow>
                <TableCell colSpan={10} align="center">
                  <Typography variant="body2" sx={{ py: 2 }}>
                    Chưa có nhân viên nào
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog xác nhận xóa */}
      <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Xác nhận xóa nhân viên</DialogTitle>
        <DialogContent>
          <Alert severity="warning" sx={{ mb: 2 }}>
            Thao tác này sẽ xóa hoàn toàn nhân viên khỏi hệ thống và không thể hoàn tác!
          </Alert>
          <Typography variant="body1" gutterBottom>
            Bạn có chắc chắn muốn xóa nhân viên <strong>{staffToDelete?.name}</strong> ({staffToDelete?.id})?
          </Typography>
          
          {relatedVehicles.length > 0 && (
            <Box sx={{ mt: 2, mb: 2 }}>
              <Typography variant="body2" color="error" gutterBottom>
                <strong>Cảnh báo:</strong> Nhân viên này hiện đang liên kết với {relatedVehicles.length} xe:
              </Typography>
              <Box sx={{ ml: 2, mt: 1 }}>
                {relatedVehicles.slice(0, 3).map((vehicle, index) => (
                  <Typography key={index} variant="body2" gutterBottom>
                    • {vehicle.name} ({vehicle.id}) - {vehicle.status}
                  </Typography>
                ))}
                {relatedVehicles.length > 3 && (
                  <Typography variant="body2">
                    ... và {relatedVehicles.length - 3} xe khác
                  </Typography>
                )}
              </Box>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Thông tin nhân viên trong các xe này sẽ được gỡ bỏ liên kết.
              </Typography>
            </Box>
          )}
          
          <Typography variant="body2">
            <strong>Lưu ý:</strong> Mọi thông tin liên quan đến nhân viên này trong hệ thống sẽ bị xóa hoặc gỡ bỏ liên kết, 
            bao gồm cả thông tin trong quản lý xe.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Hủy bỏ</Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            Xóa
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog xem chi tiết nhân viên */}
      <Dialog open={detailDialogOpen} onClose={handleCloseDetailDialog} maxWidth="md">
        <DialogTitle>
          Chi tiết nhân viên
        </DialogTitle>
        <DialogContent>
          {selectedStaff && (
            <Box sx={{ p: 1 }}>
              <Box sx={{ display: 'flex', mb: 3 }}>
                <Avatar 
                  src={selectedStaff.avatar} 
                  alt={selectedStaff.name}
                  sx={{ width: 80, height: 80, mr: 3 }}
                >
                  {selectedStaff.name.charAt(0)}
                </Avatar>
                <Box>
                  <Typography variant="h6">{selectedStaff.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {selectedStaff.id} - {selectedStaff.role}
                  </Typography>
                  <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                    <Chip 
                      label={selectedStaff.team} 
                      size="small"
                      sx={{ 
                        backgroundColor: getTeamColor(selectedStaff.team),
                        color: 'white'
                      }}
                    />
                    <Chip 
                      label={selectedStaff.status} 
                      size="small"
                      sx={{ 
                        backgroundColor: getStatusColor(selectedStaff.status),
                        color: 'white'
                      }}
                    />
                  </Box>
                </Box>
              </Box>

              <Typography variant="h6" gutterBottom>
                Thông tin liên hệ
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1">
                    <strong>Số điện thoại:</strong> {selectedStaff.phone}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1">
                    <strong>Email:</strong> {selectedStaff.email}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1">
                    <strong>Địa chỉ:</strong> {selectedStaff.address}
                  </Typography>
                </Grid>
              </Grid>

              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Thông tin nghiệp vụ
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Typography variant="body1">
                    <strong>Phòng ban:</strong> {selectedStaff.team}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="body1">
                    <strong>Chức vụ:</strong> {selectedStaff.role}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="body1">
                    <strong>Trạng thái:</strong> {selectedStaff.status}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="body1">
                    <strong>Ngày vào làm:</strong> {formatDate(selectedStaff.joinDate)}
                  </Typography>
                </Grid>
                {selectedStaff.terminationDate && (
                  <Grid item xs={12} sm={4}>
                    <Typography variant="body1">
                      <strong>Ngày nghỉ việc:</strong> {formatDate(selectedStaff.terminationDate)}
                    </Typography>
                  </Grid>
                )}
                <Grid item xs={12} sm={4}>
                  <Typography variant="body1">
                    <strong>Lương:</strong> {formatCurrency(selectedStaff.salary)}
                  </Typography>
                </Grid>
              </Grid>

              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Thông tin hiệu suất
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Typography variant="body1">
                    <strong>Số xe đã bán:</strong> {selectedStaff.vehiclesSold}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="body1">
                    <strong>Tỷ lệ hoa hồng:</strong> {selectedStaff.commissionRate}%
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="body1">
                    <strong>Tổng hoa hồng:</strong> {formatCurrency(selectedStaff.totalCommission)}
                  </Typography>
                </Grid>
              </Grid>

              {selectedStaff.note && (
                <>
                  <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                    Ghi chú
                  </Typography>
                  <Typography variant="body1">
                    {selectedStaff.note}
                  </Typography>
                </>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetailDialog}>Đóng</Button>
          <Button 
            onClick={() => {
              if (selectedStaff) {
                onEdit(selectedStaff);
                handleCloseDetailDialog();
              }
            }} 
            color="primary"
          >
            Chỉnh sửa
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default StaffList; 
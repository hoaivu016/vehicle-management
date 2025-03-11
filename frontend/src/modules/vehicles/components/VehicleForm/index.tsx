import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  TextField, 
  Grid,
  Tabs,
  Tab,
  Box,
  Typography,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Vehicle, VehicleStatus, SaleStaff, PaymentInfo, CostInfo } from '../../../../types/vehicles/vehicle';
import { Staff, StaffStatus } from '../../../../types/staff/staff';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { formatNumber, parseFormattedNumber, formatCurrency, formatDate } from '../../../../utils/formatters';

interface VehicleFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (vehicle: Partial<Vehicle>) => void;
  initialData?: Partial<Vehicle>;
  staffList?: Staff[];
  onFormChange?: (hasChanges: boolean) => void;
}

// Interface cho TabPanel
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

// Component TabPanel
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vehicle-tabpanel-${index}`}
      aria-labelledby={`vehicle-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

// Hàm để tạo props của tab
function a11yProps(index: number) {
  return {
    id: `vehicle-tab-${index}`,
    'aria-controls': `vehicle-tabpanel-${index}`,
  };
}

const validationSchema = Yup.object({
  name: Yup.string()
    .required('Tên xe là bắt buộc')
    .max(100, 'Tên xe không được vượt quá 100 ký tự'),
  color: Yup.string()
    .required('Màu sắc là bắt buộc')
    .max(50, 'Màu sắc không được vượt quá 50 ký tự'),
  manufacturingYear: Yup.number()
    .required('Năm sản xuất là bắt buộc')
    .max(new Date().getFullYear(), 'Năm sản xuất không được lớn hơn năm hiện tại')
    .min(1900, 'Năm sản xuất không hợp lệ'),
  odo: Yup.number()
    .required('Số km đã đi là bắt buộc')
    .min(0, 'Số km không được âm'),
  purchasePrice: Yup.number()
    .required('Giá mua là bắt buộc')
    .min(0, 'Giá mua không được âm'),
  salePrice: Yup.number()
    .required('Giá bán là bắt buộc')
    .min(Yup.ref('purchasePrice'), 'Giá bán phải lớn hơn giá mua'),
  importDate: Yup.date()
    .required('Ngày nhập là bắt buộc')
    .max(new Date(), 'Ngày nhập không được lớn hơn ngày hiện tại')
});

// Sử dụng SaleStaff để loại bỏ cảnh báo eslint
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _unusedSaleStaff: SaleStaff = {
  id: '',
  name: '',
  team: '',
  expectedCommission: 0
};

const VehicleForm: React.FC<VehicleFormProps> = ({ 
  open, 
  onClose, 
  onSubmit,
  initialData,
  staffList = [],
  onFormChange
}) => {
  // State để quản lý tab
  const [tabValue, setTabValue] = useState(0);
  
  // State cho quản lý chi phí
  const [costs, setCosts] = useState<CostInfo[]>(initialData?.costs || []);
  const [newCost, setNewCost] = useState({
    amount: '',
    description: ''
  });
  
  // State cho quản lý thanh toán
  const [payments, setPayments] = useState<PaymentInfo[]>(initialData?.payments || []);
  const [newPayment, setNewPayment] = useState({
    amount: '',
    type: 'DEPOSIT' as PaymentInfo['type'],
    notes: ''
  });
  
  // State cho nhân viên bán hàng
  const [saleStaff, setSaleStaff] = useState<SaleStaff>(initialData?.saleStaff || {
    id: '',
    name: '',
    team: '',
    expectedCommission: 0
  });

  // Lọc ra nhân viên đang hoạt động
  const activeStaff = staffList.filter(staff => staff.status === StaffStatus.ACTIVE);
  
  // Xử lý thay đổi tab
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  
  // Xử lý thêm chi phí
  const handleAddCost = () => {
    if (!newCost.amount || parseFloat(newCost.amount.replace(/[,.]/g, '')) <= 0) return;
    
    const newCostItem: CostInfo = {
      id: Date.now().toString(),
      amount: parseFormattedNumber(newCost.amount),
      date: new Date(),
      description: newCost.description
    };
    
    setCosts([...costs, newCostItem]);
    setNewCost({ amount: '', description: '' });
    
    if (onFormChange) onFormChange(true);
  };
  
  // Xử lý xóa chi phí
  const handleDeleteCost = (costId: string) => {
    setCosts(costs.filter(cost => cost.id !== costId));
    
    if (onFormChange) onFormChange(true);
  };
  
  // Xử lý thêm thanh toán
  const handleAddPayment = () => {
    if (!newPayment.amount || parseFloat(newPayment.amount.replace(/[,.]/g, '')) <= 0) return;
    
    const newPaymentItem: PaymentInfo = {
      amount: parseFormattedNumber(newPayment.amount),
      date: new Date(),
      type: newPayment.type,
      notes: newPayment.notes
    };
    
    setPayments([...payments, newPaymentItem]);
    setNewPayment({ amount: '', type: 'DEPOSIT', notes: '' });
    
    if (onFormChange) onFormChange(true);
  };
  
  // Xử lý xóa thanh toán
  const handleDeletePayment = (index: number) => {
    setPayments(payments.filter((_, i) => i !== index));
    
    if (onFormChange) onFormChange(true);
  };

  // Xử lý chọn nhân viên
  const handleStaffSelect = (staffId: string) => {
    const staff = staffList.find(s => s.id === staffId);
    if (staff) {
      setSaleStaff({
        id: staff.id,
        name: staff.name,
        team: staff.team,
        expectedCommission: saleStaff.expectedCommission
      });
      
      if (onFormChange) onFormChange(true);
    }
  };

  const formik = useFormik({
    initialValues: {
      id: initialData?.id || '',
      name: initialData?.name || '',
      color: initialData?.color || '',
      manufacturingYear: initialData?.manufacturingYear || new Date().getFullYear(),
      odo: initialData?.odo || 0,
      purchasePrice: initialData?.purchasePrice || 0,
      salePrice: initialData?.salePrice || 0,
      importDate: initialData?.importDate ? 
        (initialData.importDate instanceof Date 
          ? initialData.importDate.toISOString().split('T')[0] 
          : initialData.importDate) 
        : new Date().toISOString().split('T')[0],
      exportDate: initialData?.exportDate ? 
        (initialData.exportDate instanceof Date 
          ? initialData.exportDate.toISOString().split('T')[0] 
          : initialData.exportDate) 
        : '',
      note: initialData?.note || ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const totalCost = costs.reduce((sum, cost) => sum + cost.amount, 0);
      const totalPayments = payments.reduce((sum, payment) => sum + payment.amount, 0);
      const debt = values.salePrice - totalPayments;
      
      const processedValues: Partial<Vehicle> = {
        ...values,
        odo: parseFormattedNumber(values.odo.toString()),
        purchasePrice: parseFormattedNumber(values.purchasePrice.toString()),
        salePrice: parseFormattedNumber(values.salePrice.toString()),
        status: initialData?.status || VehicleStatus.IN_STOCK,
        importDate: new Date(values.importDate),
        exportDate: values.exportDate ? new Date(values.exportDate) : undefined,
        costs: costs,
        cost: totalCost,
        payments: payments,
        debt: debt,
        saleStaff: saleStaff,
        profit: parseFormattedNumber(values.salePrice.toString()) - parseFormattedNumber(values.purchasePrice.toString()) - totalCost
      };
      onSubmit(processedValues);
      onClose();
      if (onFormChange) onFormChange(false);
    }
  });

  // Định dạng loại thanh toán
  const formatPaymentType = (type: PaymentInfo['type']): string => {
    switch (type) {
      case 'DEPOSIT': return 'Đặt cọc';
      case 'BANK_DEPOSIT': return 'Đặt cọc ngân hàng';
      case 'OFFSET': return 'Đóng đối ứng';
      case 'FULL_PAYMENT': return 'Thanh toán đầy đủ';
      default: return type;
    }
  };

  // Tính tổng chi phí
  const totalCost = costs.reduce((sum, cost) => sum + cost.amount, 0);
  
  // Tính tổng thanh toán
  const totalPayments = payments.reduce((sum, payment) => sum + payment.amount, 0);
  
  // Tính lợi nhuận
  const profit = formik.values.salePrice - formik.values.purchasePrice - totalCost;
  
  // Tính công nợ
  const debt = formik.values.salePrice - totalPayments;

  // Thêm theo dõi các thay đổi trong formik
  useEffect(() => {
    if (formik.dirty && onFormChange) {
      onFormChange(true);
    }
  }, [formik.values, formik.dirty, onFormChange]);

  return (
    <Dialog 
      open={open} 
      onClose={(event, reason) => {
        if (formik.dirty || costs.length > 0 || payments.length > 0) {
          const confirm = window.confirm('Bạn có thay đổi chưa lưu. Bạn có chắc chắn muốn đóng không?');
          if (!confirm) return;
        }
        if (onFormChange) onFormChange(false);
        onClose();
      }} 
      maxWidth="md" 
      fullWidth
    >
      <DialogTitle>
        {initialData ? 'Sửa Thông Tin Xe' : 'Thêm Xe Mới'}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="vehicle tabs">
            <Tab label="Thông tin cơ bản" {...a11yProps(0)} />
            <Tab label="Chi phí" {...a11yProps(1)} />
            <Tab label="Công nợ" {...a11yProps(2)} />
            <Tab label="Nhân viên bán hàng" {...a11yProps(3)} />
          </Tabs>
        </Box>
        
        <TabPanel value={tabValue} index={0}>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="name"
                  name="name"
                  label="Tên Xe"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="color"
                  name="color"
                  label="Màu Sắc"
                  value={formik.values.color}
                  onChange={formik.handleChange}
                  error={formik.touched.color && Boolean(formik.errors.color)}
                  helperText={formik.touched.color && formik.errors.color}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="manufacturingYear"
                  name="manufacturingYear"
                  label="Năm Sản Xuất"
                  type="number"
                  value={formik.values.manufacturingYear}
                  onChange={formik.handleChange}
                  error={formik.touched.manufacturingYear && Boolean(formik.errors.manufacturingYear)}
                  helperText={formik.touched.manufacturingYear && formik.errors.manufacturingYear}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="odo"
                  name="odo"
                  label="Số Km Đã Đi"
                  type="text"
                  value={formatNumber(formik.values.odo)}
                  onChange={(e) => {
                    const value = parseFormattedNumber(e.target.value);
                    formik.setFieldValue('odo', value);
                  }}
                  error={formik.touched.odo && Boolean(formik.errors.odo)}
                  helperText={formik.touched.odo && formik.errors.odo}
                  InputProps={{
                    inputProps: { 
                      min: 0,
                      style: { textAlign: 'right' },
                      maxLength: 15
                    }
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="purchasePrice"
                  name="purchasePrice"
                  label="Giá Mua (VNĐ)"
                  type="text"
                  value={formatNumber(formik.values.purchasePrice)}
                  onChange={(e) => {
                    const value = parseFormattedNumber(e.target.value);
                    formik.setFieldValue('purchasePrice', value);
                  }}
                  error={formik.touched.purchasePrice && Boolean(formik.errors.purchasePrice)}
                  helperText={formik.touched.purchasePrice && formik.errors.purchasePrice}
                  InputProps={{
                    inputProps: { 
                      min: 0,
                      style: { textAlign: 'right' },
                      maxLength: 15
                    }
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="salePrice"
                  name="salePrice"
                  label="Giá Bán (VNĐ)"
                  type="text"
                  value={formatNumber(formik.values.salePrice)}
                  onChange={(e) => {
                    const value = parseFormattedNumber(e.target.value);
                    formik.setFieldValue('salePrice', value);
                  }}
                  error={formik.touched.salePrice && Boolean(formik.errors.salePrice)}
                  helperText={formik.touched.salePrice && formik.errors.salePrice}
                  InputProps={{
                    inputProps: { 
                      min: 0,
                      style: { textAlign: 'right' },
                      maxLength: 15
                    }
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="importDate"
                  name="importDate"
                  label="Ngày Nhập"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={formik.values.importDate}
                  onChange={formik.handleChange}
                  error={formik.touched.importDate && Boolean(formik.errors.importDate)}
                  helperText={formik.touched.importDate && formik.errors.importDate}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="exportDate"
                  name="exportDate"
                  label="Ngày Xuất"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={formik.values.exportDate}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="note"
                  name="note"
                  label="Ghi Chú"
                  multiline
                  rows={3}
                  value={formik.values.note}
                  onChange={formik.handleChange}
                />
              </Grid>
            </Grid>
          </form>
        </TabPanel>
        
        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Chi phí phát sinh
              </Typography>
              <Divider sx={{ mb: 2 }} />
            </Grid>
            
            {/* Danh sách chi phí */}
            <Grid item xs={12}>
              <TableContainer component={Paper} variant="outlined">
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>STT</TableCell>
                      <TableCell>Số tiền</TableCell>
                      <TableCell>Ngày</TableCell>
                      <TableCell>Mô tả</TableCell>
                      <TableCell align="right">Thao tác</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {costs.length > 0 ? (
                      costs.map((cost, index) => (
                        <TableRow key={cost.id}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{formatCurrency(cost.amount)}</TableCell>
                          <TableCell>{formatDate(cost.date)}</TableCell>
                          <TableCell>{cost.description}</TableCell>
                          <TableCell align="right">
                            <IconButton 
                              size="small" 
                              color="error"
                              onClick={() => handleDeleteCost(cost.id)}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} align="center">
                          Chưa có chi phí nào
                        </TableCell>
                      </TableRow>
                    )}
                    <TableRow>
                      <TableCell colSpan={1} sx={{ fontWeight: 'bold' }}>Tổng chi phí:</TableCell>
                      <TableCell colSpan={4} sx={{ fontWeight: 'bold' }}>
                        {formatCurrency(totalCost)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            
            {/* Form thêm chi phí */}
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Box component={Paper} variant="outlined" sx={{ p: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Thêm chi phí mới
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      label="Số tiền"
                      value={newCost.amount}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === '' || /^[0-9,.]+$/.test(value)) {
                          const cleanValue = value.replace(/[,.]/g, '');
                          if (cleanValue === '' || isNaN(Number(cleanValue))) {
                            setNewCost({ ...newCost, amount: value });
                          } else {
                            setNewCost({ ...newCost, amount: formatNumber(Number(cleanValue)) });
                          }
                        }
                      }}
                      size="small"
                      InputProps={{
                        inputProps: { 
                          style: { textAlign: 'right' },
                          maxLength: 15
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Mô tả"
                      value={newCost.description}
                      onChange={(e) => setNewCost({ ...newCost, description: e.target.value })}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<AddIcon />}
                      onClick={handleAddCost}
                      fullWidth
                      sx={{ height: '100%' }}
                    >
                      Thêm
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </TabPanel>
        
        <TabPanel value={tabValue} index={2}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Công nợ và thanh toán
              </Typography>
              <Divider sx={{ mb: 2 }} />
            </Grid>
            
            {/* Tổng quan về công nợ */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="body1">
                  <strong>Giá bán:</strong> {formatCurrency(formik.values.salePrice)}
                </Typography>
                <Typography variant="body1" color={debt > 0 ? 'error.main' : 'success.main'}>
                  <strong>Công nợ hiện tại:</strong> {formatCurrency(debt)}
                </Typography>
              </Box>
            </Grid>
            
            {/* Danh sách thanh toán */}
            <Grid item xs={12}>
              <TableContainer component={Paper} variant="outlined">
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>STT</TableCell>
                      <TableCell>Loại thanh toán</TableCell>
                      <TableCell>Số tiền</TableCell>
                      <TableCell>Ngày</TableCell>
                      <TableCell>Ghi chú</TableCell>
                      <TableCell align="right">Thao tác</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {payments.length > 0 ? (
                      payments.map((payment, index) => (
                        <TableRow key={index}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{formatPaymentType(payment.type)}</TableCell>
                          <TableCell>{formatCurrency(payment.amount)}</TableCell>
                          <TableCell>{formatDate(payment.date)}</TableCell>
                          <TableCell>{payment.notes || '-'}</TableCell>
                          <TableCell align="right">
                            <IconButton 
                              size="small" 
                              color="error"
                              onClick={() => handleDeletePayment(index)}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} align="center">
                          Chưa có khoản thanh toán nào
                        </TableCell>
                      </TableRow>
                    )}
                    <TableRow>
                      <TableCell colSpan={2} sx={{ fontWeight: 'bold' }}>Tổng thanh toán:</TableCell>
                      <TableCell colSpan={4} sx={{ fontWeight: 'bold' }}>
                        {formatCurrency(totalPayments)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              
              {/* Công thức tính công nợ */}
              <Box sx={{ mt: 2, p: 2, bgcolor: 'background.paper', borderRadius: 1, border: '1px solid #eee' }}>
                <Typography variant="subtitle2" gutterBottom>
                  Công thức tính công nợ:
                </Typography>
                <Box sx={{ pl: 2 }}>
                  <Typography variant="body2">
                    <strong>Công nợ</strong> = Giá bán - Tổng các khoản đã thanh toán
                  </Typography>
                  <Typography variant="body2">
                    <strong>Tổng thanh toán</strong> = Đặt cọc + Đặt cọc ngân hàng + Tiền đối ứng + Thanh toán đầy đủ
                  </Typography>
                  
                  {/* Chi tiết tính toán */}
                  <Box sx={{ mt: 1, pl: 2 }}>
                    <Typography variant="body2">
                      {formatCurrency(debt)} = {formatCurrency(formik.values.salePrice)} - {formatCurrency(totalPayments)}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
            
            {/* Form thêm thanh toán */}
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Box component={Paper} variant="outlined" sx={{ p: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Thêm khoản thanh toán mới
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <TextField
                      select
                      fullWidth
                      label="Loại thanh toán"
                      value={newPayment.type}
                      onChange={(e) => setNewPayment({ ...newPayment, type: e.target.value as PaymentInfo['type'] })}
                      size="small"
                      SelectProps={{
                        native: true,
                      }}
                    >
                      <option value="DEPOSIT">Đặt cọc</option>
                      <option value="BANK_DEPOSIT">Đặt cọc ngân hàng</option>
                      <option value="OFFSET">Đóng đối ứng</option>
                      <option value="FULL_PAYMENT">Thanh toán đầy đủ</option>
                    </TextField>
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      fullWidth
                      label="Số tiền"
                      value={newPayment.amount}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === '' || /^[0-9,.]+$/.test(value)) {
                          const cleanValue = value.replace(/[,.]/g, '');
                          if (cleanValue === '' || isNaN(Number(cleanValue))) {
                            setNewPayment({ ...newPayment, amount: value });
                          } else {
                            setNewPayment({ ...newPayment, amount: formatNumber(Number(cleanValue)) });
                          }
                        }
                      }}
                      size="small"
                      InputProps={{
                        inputProps: { 
                          style: { textAlign: 'right' },
                          maxLength: 15
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      label="Ghi chú"
                      value={newPayment.notes}
                      onChange={(e) => setNewPayment({ ...newPayment, notes: e.target.value })}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<AddIcon />}
                      onClick={handleAddPayment}
                      fullWidth
                      sx={{ height: '100%' }}
                    >
                      Thêm
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </TabPanel>
        
        <TabPanel value={tabValue} index={3}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Thông tin nhân viên bán hàng
              </Typography>
              <Divider sx={{ mb: 2 }} />
            </Grid>
            
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="staff-select-label">Chọn nhân viên bán hàng</InputLabel>
                <Select
                  labelId="staff-select-label"
                  id="staff-select"
                  value={saleStaff.id || ''}
                  label="Chọn nhân viên bán hàng"
                  onChange={(e) => handleStaffSelect(e.target.value as string)}
                >
                  {activeStaff.map((staff) => (
                    <MenuItem key={staff.id} value={staff.id}>
                      {staff.name} ({staff.id}) - {staff.team}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Hoa hồng dự kiến"
                type="text"
                value={formatNumber(saleStaff.expectedCommission)}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === '' || /^[0-9,.]+$/.test(value)) {
                    const cleanValue = value.replace(/[,.]/g, '');
                    if (cleanValue === '' || isNaN(Number(cleanValue))) {
                      setSaleStaff({ ...saleStaff, expectedCommission: 0 });
                    } else {
                      setSaleStaff({ ...saleStaff, expectedCommission: parseFloat(cleanValue) });
                    }
                  }
                }}
                InputProps={{
                  inputProps: { 
                    min: 0,
                    style: { textAlign: 'right' },
                    maxLength: 15
                  }
                }}
              />
            </Grid>
            
            {/* Hiển thị thông tin lợi nhuận để tham khảo */}
            <Grid item xs={12} sx={{ mt: 3 }}>
              <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 1, border: '1px solid #eee' }}>
                <Typography variant="subtitle2" gutterBottom>
                  Thông tin về lợi nhuận:
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body2">
                      <strong>Giá mua:</strong> {formatCurrency(formik.values.purchasePrice)}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2">
                      <strong>Giá bán:</strong> {formatCurrency(formik.values.salePrice)}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2">
                      <strong>Tổng chi phí:</strong> {formatCurrency(totalCost)}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color={profit >= 0 ? 'success.main' : 'error.main'}>
                      <strong>Lợi nhuận dự kiến:</strong> {formatCurrency(profit)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider sx={{ my: 1 }} />
                    <Typography variant="body2">
                      <strong>Công thức tính lợi nhuận:</strong> Giá bán - Giá mua - Tổng chi phí
                    </Typography>
                    <Box sx={{ pl: 2, mt: 1 }}>
                      <Typography variant="body2">
                        {formatCurrency(profit)} = {formatCurrency(formik.values.salePrice)} - {formatCurrency(formik.values.purchasePrice)} - {formatCurrency(totalCost)}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </TabPanel>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Hủy
        </Button>
        <Button 
          onClick={() => formik.handleSubmit()} 
          color="primary" 
          variant="contained"
        >
          {initialData ? 'Cập Nhật' : 'Thêm Xe'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default VehicleForm; 
import React from 'react';
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Chip,
  LinearProgress,
  Tooltip
} from '@mui/material';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { Staff } from '../../../../types/staff/staff';
import { formatCurrency } from '../../../../utils/formatters';

interface KPITableProps {
  allSalesStaffWithKpis: Array<{
    staff: Staff;
    hasKpi: boolean;
    kpiData: {
      targetValue: number;
      actualValue: number;
      completion: number;
      bonusPerUnit: number;
      bonus: number;
    };
  }>;
}

const KPITable: React.FC<KPITableProps> = ({ allSalesStaffWithKpis }) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          <AssessmentIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
          Bảng KPI, lương và thưởng nhân viên
        </Typography>
        
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nhân viên</TableCell>
                <TableCell align="center">Chỉ tiêu</TableCell>
                <TableCell align="center">Đã bán</TableCell>
                <TableCell align="center">Tỷ lệ hoàn thành</TableCell>
                <TableCell align="right">Thưởng/xe</TableCell>
                <TableCell align="right">Tổng thưởng</TableCell>
                <TableCell align="right">Lương cơ bản</TableCell>
                <TableCell align="right">Tổng thu nhập</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allSalesStaffWithKpis.map(({ staff, hasKpi, kpiData }) => (
                <TableRow key={staff.id}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="body1">{staff.name}</Typography>
                      <Chip 
                        label={staff.team}
                        size="small"
                        sx={{ ml: 1 }}
                      />
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    {hasKpi ? kpiData.targetValue : '-'}
                  </TableCell>
                  <TableCell align="center">
                    {kpiData.actualValue}
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ width: '100%', mr: 1 }}>
                        <LinearProgress 
                          variant="determinate" 
                          value={Math.min(kpiData.completion, 100)}
                          color={kpiData.completion >= 100 ? 'success' : 'primary'}
                        />
                      </Box>
                      <Box sx={{ minWidth: 35 }}>
                        <Typography variant="body2" color="text.secondary">
                          {Math.round(kpiData.completion)}%
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    {formatCurrency(kpiData.bonusPerUnit)}
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title={`${kpiData.actualValue} xe × ${formatCurrency(kpiData.bonusPerUnit)}`}>
                      <span>{formatCurrency(kpiData.bonus)}</span>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="right">
                    {formatCurrency(staff.salary)}
                  </TableCell>
                  <TableCell align="right">
                    <Typography fontWeight="bold">
                      {formatCurrency(staff.salary + kpiData.bonus)}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default KPITable; 
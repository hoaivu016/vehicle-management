// Khai báo module react
declare module 'react' {
  export const useState: any;
  export const useEffect: any;
  export const useMemo: any;
  export const useCallback: any;
  export const useContext: any;
  export const useReducer: any;
  export const useRef: any;
  export const useLayoutEffect: any;
  export const useImperativeHandle: any;
  export const useDebugValue: any;
  
  namespace React {
    type ReactNode = 
      | React.Element
      | string
      | number
      | boolean
      | null
      | undefined
      | ReactNodeArray;
    interface ReactNodeArray extends Array<ReactNode> {}
    type Element = any;
    
    // Thêm các khai báo còn thiếu
    type FC<P = {}> = FunctionComponent<P>;
    interface FunctionComponent<P = {}> {
      (props: P): ReactNode;
    }
    
    interface SyntheticEvent<T = Element> {
      currentTarget: EventTarget & T;
      target: EventTarget & T;
      preventDefault(): void;
      stopPropagation(): void;
      type: string;
    }
    
    interface ChangeEvent<T = Element> extends SyntheticEvent<T> {
      target: EventTarget & T;
      currentTarget: EventTarget & T;
    }
  }
}
declare module 'react/jsx-runtime';

// Khai báo các module Material UI
declare module '@mui/material';
declare module '@mui/material/styles';
declare module '@mui/icons-material/*';

// Khai báo module Supabase
declare module '@supabase/supabase-js';

// Khai báo module từ @mui/material
declare module '@mui/material/styles' {
  export function useTheme(): any;
  export function ThemeProvider(props: any): any;
  export function createTheme(options: any): any;
}

declare module '@mui/material' {
  export const Container: any;
  export const Box: any;
  export const Typography: any;
  export const AppBar: any;
  export const Toolbar: any;
  export const IconButton: any;
  export const Button: any;
  export const Grid: any;
  export const Paper: any;
  export const CircularProgress: any;
  export const TextField: any;
  export const Select: any;
  export const MenuItem: any;
  export const FormControl: any;
  export const FormHelperText: any;
  export const InputLabel: any;
  export const Dialog: any;
  export const DialogTitle: any;
  export const DialogContent: any;
  export const DialogActions: any;
  export const Card: any;
  export const CardContent: any;
  export const CardActions: any;
  export const Tabs: any;
  export const Tab: any;
  export const Table: any;
  export const TableBody: any;
  export const TableCell: any;
  export const TableContainer: any;
  export const TableHead: any;
  export const TableRow: any;
  export const Snackbar: any;
  export const Alert: any;
  export const Tooltip: any;
  export const Chip: any;
  export const CssBaseline: any;
  export const Fab: any;
  export const List: any;
  export const ListItemButton: any;
  export const ListItemText: any;
  export const Menu: any;
  export const Divider: any;
  export const Avatar: any;
  export const Badge: any;
  export const InputAdornment: any;
}

// Khai báo cho SelectChangeEvent
declare namespace SelectChangeEvent {
  interface SelectChangeEvent {
    target: {
      name?: string;
      value: unknown;
    };
  }
}

// Khai báo các enum trong models

// Sửa enum StaffTeam
declare enum StaffTeam {
  SALES = 'SALES',
  SALES_1 = 'SALES_1',
  SALES_2 = 'SALES_2',
  SALES_3 = 'SALES_3',
  TECHNICAL = 'TECHNICAL',
  MANAGEMENT = 'MANAGEMENT',
  ACCOUNTING = 'ACCOUNTING',
  SUPPORT = 'SUPPORT',
  OTHER = 'OTHER'
}

// Sửa enum StaffRole
declare enum StaffRole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  TEAM_LEADER = 'TEAM_LEADER',
  STAFF = 'STAFF',
  INTERN = 'INTERN',
  TRAINEE = 'TRAINEE'
}

// Sửa enum StaffStatus
declare enum StaffStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  ON_LEAVE = 'ON_LEAVE',
  SUSPENDED = 'SUSPENDED',
  TERMINATED = 'TERMINATED'
}

// Khai báo cho enum KpiTargetType
declare enum KpiTargetType {
  INDIVIDUAL = 'INDIVIDUAL',
  TEAM = 'TEAM',
  DEPARTMENT = 'DEPARTMENT',
  COMPANY = 'COMPANY'
}

// Khai báo modules của @supabase
declare module '@supabase/supabase-js' {
  export function createClient(supabaseUrl: string, supabaseKey: string): any;
}

// Khai báo cho các types còn thiếu
declare module '@mui/material/styles/createPalette' {
  interface Palette {
    neutral: {
      main: string;
      contrastText: string;
    };
  }
  interface PaletteOptions {
    neutral?: {
      main: string;
      contrastText: string;
    };
  }
}

// Khai báo module cho @mui/icons-material
declare module '@mui/icons-material/*' {
  const icon: any;
  export default icon;
} 
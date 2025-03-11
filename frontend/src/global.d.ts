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
    
    // Thêm các interface/type cần thiết
    type FC<P = {}> = FunctionComponent<P>;
    interface FunctionComponent<P = {}> {
      (props: P): ReactNode;
    }
    
    interface SyntheticEvent<T = Element> {
      bubbles: boolean;
      cancelable: boolean;
      currentTarget: T;
      defaultPrevented: boolean;
      eventPhase: number;
      isTrusted: boolean;
      nativeEvent: Event;
      preventDefault(): void;
      stopPropagation(): void;
      target: EventTarget;
      timeStamp: number;
      type: string;
    }
    
    interface ChangeEvent<T = Element> extends SyntheticEvent<T> {
      target: T & EventTarget;
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

// Khai báo module StaffRole và StaffTeam
declare enum StaffRole {
  STAFF = "STAFF",
  MANAGER = "MANAGER",
  ADMIN = "ADMIN",
  INTERN = "INTERN"
}

declare enum StaffTeam {
  SALES = "SALES",
  ACCOUNTING = "ACCOUNTING",
  TECHNICAL = "TECHNICAL",
  MANAGEMENT = "MANAGEMENT",
  SALES_1 = "SALES_1",
  SALES_2 = "SALES_2",
  SALES_3 = "SALES_3",
  OTHER = "OTHER"
}

declare enum StaffStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE"
}

// Các khai báo khác module
declare module '@mui/x-date-pickers/*';
declare module 'styled-components'; 
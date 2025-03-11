// Khai báo module react
declare module 'react' {
  export function useState<S>(initialState: S | (() => S)): [S, React.Dispatch<React.SetStateAction<S>>];
  export function useState<S = undefined>(): [S | undefined, React.Dispatch<React.SetStateAction<S | undefined>>];
  
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
    
    // Function Component types
    type FC<P = {}> = FunctionComponent<P>;
    
    interface FunctionComponent<P = {}> {
      (props: P): ReactNode;
    }
    
    // Event types
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
    
    interface MouseEvent<T = Element> extends SyntheticEvent<T> {
      button: number;
      buttons: number;
      clientX: number;
      clientY: number;
      pageX: number;
      pageY: number;
      screenX: number;
      screenY: number;
    }
    
    interface KeyboardEvent<T = Element> extends SyntheticEvent<T> {
      altKey: boolean;
      charCode: number;
      ctrlKey: boolean;
      key: string;
      keyCode: number;
      metaKey: boolean;
      shiftKey: boolean;
    }
    
    type SetStateAction<S> = S | ((prevState: S) => S);
    type Dispatch<A> = (value: A) => void;
  }

  // Exports from React namespace to module exports
  export type ReactNode = React.ReactNode;
  export type FC<P = {}> = React.FunctionComponent<P>;
  export type FunctionComponent<P = {}> = React.FunctionComponent<P>;
  export type ChangeEvent<T = Element> = React.ChangeEvent<T>;
  export type MouseEvent<T = Element> = React.MouseEvent<T>;
  export type KeyboardEvent<T = Element> = React.KeyboardEvent<T>;
  export type JSXElementConstructor<P> = React.JSXElementConstructor<P>;
  export type RefObject<T> = React.RefObject<T>;
  export type MutableRefObject<T> = React.MutableRefObject<T>;
  export type SyntheticEvent<T = Element> = React.SyntheticEvent<T>;
  export type SetStateAction<S> = React.SetStateAction<S>;
  export type Dispatch<A> = React.Dispatch<A>;
}

// Enums
declare enum VehicleStatus {
  IN_STOCK = "IN_STOCK",
  DEPOSITED = "DEPOSITED",
  BANK_DEPOSITED = "BANK_DEPOSITED",
  OFFSET = "OFFSET",
  SOLD = "SOLD"
}

declare enum StaffRole {
  STAFF = "STAFF",
  MANAGER = "MANAGER",
  ADMIN = "ADMIN",
  INTERN = "INTERN",
  TEAM_LEADER = "TEAM_LEADER",
  TRAINEE = "TRAINEE"
}

declare enum StaffTeam {
  SALES = "SALES",
  ACCOUNTING = "ACCOUNTING",
  TECHNICAL = "TECHNICAL",
  MANAGEMENT = "MANAGEMENT",
  SALES_1 = "SALES_1",
  SALES_2 = "SALES_2",
  SALES_3 = "SALES_3",
  SUPPORT = "SUPPORT",
  OTHER = "OTHER"
}

declare enum StaffStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  ON_LEAVE = "ON_LEAVE",
  SUSPENDED = "SUSPENDED",
  TERMINATED = "TERMINATED"
}

declare enum KpiTargetType {
  INDIVIDUAL = "INDIVIDUAL",
  DEPARTMENT = "DEPARTMENT",
  MANAGEMENT = "MANAGEMENT"
}

// Các khai báo khác module
declare module '@mui/x-date-pickers/*';
declare module 'styled-components'; 
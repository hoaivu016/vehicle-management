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
  }
}
declare module 'react/jsx-runtime';

// Khai báo các module Material UI
declare module '@mui/material';
declare module '@mui/material/styles';
declare module '@mui/icons-material/*';

// Khai báo module Supabase
declare module '@supabase/supabase-js'; 
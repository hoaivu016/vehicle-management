// Khai báo module react
declare module 'react' {
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
/// <reference types="react-scripts" />

// Định nghĩa lại các type cho React nếu cần
declare namespace React {
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

// Định nghĩa lại JSX namespace nếu cần
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

// Định nghĩa các module không có declaration files
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
} 
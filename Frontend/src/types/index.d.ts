declare namespace JSX {
  interface IntrinsicElements {
    'givebutter-widget': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      height?: string | number;
      width?: string | number;
    };
  }
}
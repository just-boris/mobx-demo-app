declare module "styled-jss" {
  import { ReactHTML } from "react";
  import { Style } from "jss/css";
  import * as CSS from "csstype";

  type JSSProps = CSS.Properties<string | number | number[]>;

  export interface StyleWithNesting extends JSSProps {
    // Allow pseudo selectors and media queries
    [k: string]: JSSProps[keyof JSSProps] | StyleWithNesting;
  }

  type StyledFunction<T> = (styles: StyleWithNesting) => T;

  interface IStyled {
    (element: keyof ReactHTML): StyledFunction<keyof ReactHTML>;
    <P>(component: React.ComponentClass<P>): StyledFunction<React.ComponentClass<P>>;
  }

  export function Styled(baseStyles: Record<string, StyleWithNesting>): IStyled;

  const styled: IStyled;
  export default styled;
}

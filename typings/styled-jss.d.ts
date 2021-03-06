declare module "styled-jss" {
  import { ReactHTML } from "react";
  import { Style } from "jss/css";
  import * as CSS from "csstype";

  type JSSProps = CSS.Properties<string | number | number[] | Function>;

  export interface StyleWithNesting extends JSSProps {
    // Allow pseudo selectors and media queries
    [k: string]: JSSProps[keyof JSSProps] | StyleWithNesting;
  }

  type StyledFunction<T> = (styles: StyleWithNesting) => T;

  interface IStyled {
    <T extends keyof ReactHTML>(element: T): StyledFunction<ReactHTML[T]>;
    <Props>(component: React.ComponentClass<Props>): StyledFunction<React.ComponentClass<Props>>;
    <Props>(component: React.SFC<Props>): StyledFunction<React.SFC<Props>>;
  }

  export function Styled(baseStyles: Record<string, StyleWithNesting>): IStyled;

  const styled: IStyled;
  export default styled;
}

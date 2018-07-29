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
    <InProps, OutProps extends InProps = InProps>(component: React.ComponentClass<InProps>): StyledFunction<React.ComponentClass<OutProps>>;
  }

  export function Styled(baseStyles: Record<string, StyleWithNesting>): IStyled;

  const styled: IStyled;
  export default styled;
}

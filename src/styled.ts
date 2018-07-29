import { Styled } from "styled-jss";

export default Styled({
  "@global *": {
    boxSizing: "border-box"
  },
  "@global body": {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    margin: 0,
    padding: 0
  }
});

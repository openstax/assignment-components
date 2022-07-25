import type { GlobalProvider } from "@ladle/react";
import { useEffect } from "react";
import styled from "styled-components";

export const Provider: GlobalProvider = ({ children, globalState }) => {
  const Wrapper = styled.div`
    font-family: sans-serif;
    padding: 4rem;
  `;

  useEffect(() => {
    const style = document.createElement('style');
    style.innerText = 'html { font-size: 10px }';
    document.head.append(style);
  }, []);

  return (
    <Wrapper>
      {children}
    </Wrapper>
  )
};

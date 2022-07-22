import React from "react";

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
type ComponentType = keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>;

export interface ContentProps<T extends ComponentType | undefined> {
  className?: string;
  component?: T extends undefined ? undefined :
    T extends ComponentType ? React.ReactComponentElement<T>:
    never;
  html: string;
  block?: boolean;
}

export const Content = (<T extends ComponentType | undefined>(
  {html, component, block = false, ...props}: ContentProps<T>
) => {
  if (component !== undefined) {
    return React.cloneElement(component, {html, ...props});
  }
  if (block) {
    return <div dangerouslySetInnerHTML={{ __html: html }} {...props} />;
  } else {
    return <span dangerouslySetInnerHTML={{ __html: html }} {...props} />;
  }
});

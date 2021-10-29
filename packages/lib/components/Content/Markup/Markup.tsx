import React, { createElement } from 'react';

export type MarkupProps = {
  tagName: keyof JSX.IntrinsicElements;
  content: string;
  className?: string;
};

export default function Markup({
  tagName = 'div',
  content,
  className,
}: MarkupProps) {
  return createElement(
    tagName,
    {
      dangerouslySetInnerHTML: { __html: content },
      className: className,
    },
    null
  );
}

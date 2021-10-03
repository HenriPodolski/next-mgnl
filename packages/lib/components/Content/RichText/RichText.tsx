import React from 'react';
import cx from 'classnames';

export type RichTextProps = {
  content: string;
  className?: string;
};

export default function RichText({ content, className }: RichTextProps) {
  return (
    <div
      className={cx('richtext')}
      dangerouslySetInnerHTML={{ __html: content }}
    ></div>
  );
}

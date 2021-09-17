import React from 'react';
import cx from 'classnames';

import styles from './RichText.module.scss';

export type RichTextProps = {
  content: string;
  className?: string;
};

export default function RichText({ content, className }: RichTextProps) {
  return (
    <div
      className={cx(
        className,
        styles.RichText,
        'mt-4 p-4 w-1/4 rounded bg-blue-300 text-center'
      )}
      dangerouslySetInnerHTML={{ __html: content }}
    ></div>
  );
}

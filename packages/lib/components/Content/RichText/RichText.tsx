import React from 'react';
import cx from 'classnames';
import styles from './RichText.module.scss';
import Markup from '../Markup/Markup';

export type RichTextProps = {
  tagName: keyof JSX.IntrinsicElements;
  content: string;
  className?: string;
};

export default function RichText(props: RichTextProps) {
  const { tagName = 'div', content, className } = props;
  return (
    <Markup
      tagName={tagName}
      content={content}
      className={cx(styles.RichText, className)}
    />
  );
}

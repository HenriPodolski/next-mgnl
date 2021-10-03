import React from 'react';
import cx from 'classnames';

export type HeaderProps = {
  className?: string;
};

export default function Header({ className }: HeaderProps) {
  return <header className={cx(className)}></header>;
}

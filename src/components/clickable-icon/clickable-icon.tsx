import React, { FunctionComponent, DOMAttributes, HTMLAttributes } from 'react';
import styles from './clickable-icon.module.css';

type HTMLButtonProps = DOMAttributes<HTMLButtonElement> &
  HTMLAttributes<HTMLButtonElement>;

export interface ClickableIconProps {
  onClick: HTMLButtonProps['onClick'];
  title: HTMLButtonProps['title'];
}

export const ClickableIcon: FunctionComponent<ClickableIconProps> = ({
  children,
  onClick,
  title,
}) => (
  <button onClick={onClick} className={styles['icon-button']} title={title}>
    {children}
  </button>
);

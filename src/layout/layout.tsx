import React, { FunctionComponent } from 'react';
import { Header } from './header';
import layoutStyles from './layout.module.css';

export interface LayoutProps {}

export const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <div className={layoutStyles.layout}>
      <Header />
      <div className={layoutStyles['main-content']}>
        <main>{children}</main>
      </div>
    </div>
  );
};

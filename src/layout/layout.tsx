import React, { FunctionComponent } from "react";
import layoutStyles from "./layout.module.css";

export interface LayoutProps {}

export const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <div className={layoutStyles.layout}>
      <div className={layoutStyles.sidebar}>Sidebar</div>
      <div>{children}</div>
    </div>
  );
};

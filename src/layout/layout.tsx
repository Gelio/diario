import React, { FunctionComponent } from "react";
import layoutStyles from "./layout.module.css";

export interface LayoutProps {}

export const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <div className={layoutStyles.layout}>
      <aside className={layoutStyles.sidebar}>Sidebar</aside>

      <div className={layoutStyles["main-content"]}>
        <div>Add events</div>
        <main>{children}</main>
      </div>
    </div>
  );
};

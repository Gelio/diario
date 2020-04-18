import React, { FunctionComponent } from "react";
import layoutStyles from "./layout.module.css";
import { QuickAddBar } from "./quick-add-bar/quick-add-bar";

export interface LayoutProps {}

export const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <div className={layoutStyles.layout}>
      <aside className={layoutStyles.sidebar}>Sidebar</aside>

      <div className={layoutStyles["main-content"]}>
        <QuickAddBar />
        <main>{children}</main>
      </div>
    </div>
  );
};

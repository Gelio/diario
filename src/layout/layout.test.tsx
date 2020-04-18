import React from "react";
import { render } from "@testing-library/react";
import { Layout } from "./layout";

describe("Layout", () => {
  it("should render the sidebar", () => {
    const { getByText } = render(<Layout />);

    expect(getByText("Sidebar")).toBeInTheDocument();
  });

  it("should render the top bar", () => {
    const { getByPlaceholderText } = render(<Layout />);

    expect(getByPlaceholderText("Event name")).toBeInTheDocument();
  });

  it("should render its children", () => {
    const { getByText } = render(<Layout>Main content</Layout>);

    expect(getByText("Main content")).toBeInTheDocument();
  });
});

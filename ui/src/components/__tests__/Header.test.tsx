import { render, screen } from "@testing-library/react";
import { Header } from "../Header";
import "@testing-library/jest-dom";

test("renders header with correct title", () => {
  const title = "Test Title";
  render(<Header title={title} />);
  const headerElement = screen.getByText(title);
  expect(headerElement).toBeInTheDocument();
});

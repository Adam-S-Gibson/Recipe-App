import { render } from "@testing-library/react";
import { Footer } from "../Footer";
import "@testing-library/jest-dom";

test("renders footer text", () => {
  const { getByText } = render(<Footer />);
  const footerText = getByText(/Copyright/i);
  expect(footerText).toBeInTheDocument();
});

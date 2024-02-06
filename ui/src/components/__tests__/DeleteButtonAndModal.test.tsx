import { render, screen, fireEvent } from "@testing-library/react";
import { DeleteButtonAndModal } from "../DeleteButtonAndModal";
import "@testing-library/jest-dom";

describe("DeleteButtonAndModal", () => {
  test("should render component", () => {
    render(<DeleteButtonAndModal id={"1"} />);
    const button = screen.getByRole("button", { name: /Remove Recipe/i });
    expect(button).toBeInTheDocument();
  });

  test("should open modal on button click", () => {
    render(<DeleteButtonAndModal id={"1"} />);
    const button = screen.getByRole("button", { name: /Remove Recipe/i });
    fireEvent.click(button);
    const modal = screen.getByRole("dialog");
    expect(modal).toBeInTheDocument();
  });

  test("should close modal on modal close button click", () => {
    render(<DeleteButtonAndModal id={"1"} />);
    const button = screen.getByRole("button", { name: /Remove Recipe/i });
    fireEvent.click(button);
    const modalCloseButton = screen.getByRole("button", {
      name: /Close Modal/i,
    });
    fireEvent.click(modalCloseButton);
    const modal = screen.queryByRole("dialog", { name: /Delete Modal/i });
    expect(modal).not.toBeInTheDocument();
  });
});

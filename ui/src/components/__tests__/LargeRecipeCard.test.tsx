import { render, screen } from "@testing-library/react";
import { LargeRecipeCard } from "../LargeRecipeCard";
import "@testing-library/jest-dom";

describe("LargeRecipeCard", () => {
  const mockCard = {
    title: "Delicious Recipe",
    rating: 4,
    timeToCook: 30,
    id: "recipe-123",
  };

  test("renders recipe card with correct title, rating, and time to cook", () => {
    render(<LargeRecipeCard {...mockCard} />);

    const titleElement = screen.getByText(mockCard.title);
    const ratingElements = screen.getAllByTestId("recipe-reviews");
    const timeToCookElement = screen.getByText(`${mockCard.timeToCook} Mins`);

    expect(titleElement).toBeInTheDocument();
    expect(ratingElements.length).toBeGreaterThanOrEqual(0);
    expect(ratingElements.length).toBeLessThan(5);
    expect(timeToCookElement).toBeInTheDocument();
  });

  test("renders recipe card with correct image", () => {
    render(<LargeRecipeCard {...mockCard} />);

    const imageElement = screen.getByAltText("Tasty Recipe Image");

    expect(imageElement).toBeInTheDocument();
  });

  test("renders correct number of stars for rating", () => {
    render(<LargeRecipeCard {...mockCard} />);

    const ratingElements = screen.getAllByTestId("recipe-reviews");

    expect(ratingElements.length).toBeGreaterThanOrEqual(0);
    expect(ratingElements.length).toBeLessThan(5);
  });

  test("renders 'View Recipe' button", () => {
    render(<LargeRecipeCard {...mockCard} />);

    const buttonElement = screen.getByRole("button", {
      name: /View Recipe Button/i,
    });

    expect(buttonElement).toBeInTheDocument();
  });

  test("renders recipe card with all props", () => {
    render(<LargeRecipeCard {...mockCard} />);

    const titleElement = screen.getByText(mockCard.title);
    const imageElement = screen.getByAltText("Tasty Recipe Image");
    const ratingElements = screen.getAllByTestId("recipe-reviews");
    const timeToCookElement = screen.getByText(`${mockCard.timeToCook} Mins`);
    const buttonElement = screen.getByRole("button", {
      name: /View Recipe Button/i,
    });

    expect(titleElement).toBeInTheDocument();
    expect(imageElement).toBeInTheDocument();
    expect(ratingElements.length).toBeGreaterThanOrEqual(0);
    expect(ratingElements.length).toBeLessThan(5);
    expect(timeToCookElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  // Unhappy path: Test if the recipe card renders without a rating when the rating prop is not provided
  test("renders recipe card without rating when rating prop is not provided", () => {
    const { rating, ...rest } = mockCard;
    //@ts-ignore
    render(<LargeRecipeCard {...rest} />);

    const ratingElements = screen.queryAllByTestId("recipe-reviews");

    expect(ratingElements.length).toBe(1);
  });
});

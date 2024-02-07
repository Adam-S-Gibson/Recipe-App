import { render, screen } from "@testing-library/react";
import { SmallRecipeCard } from "../SmallRecipeCard";
import "@testing-library/jest-dom";

describe("SmallRecipeCard", () => {
  const mockCard = {
    title: "Test Recipe",
    rating: 3,
    timeToCook: 30,
    id: "12345",
  };

  it("renders recipe card with correct title", () => {
    render(<SmallRecipeCard {...mockCard} />);
    const recipeTitle = screen.getByTestId("recipeTitle");
    expect(recipeTitle).toHaveTextContent("Test Recipe");
  });

  it("renders recipe card with correct cooking time", () => {
    render(<SmallRecipeCard {...mockCard} />);
    const cookingTime = screen.getByTestId("cookingTime");
    expect(cookingTime).toHaveTextContent("30 Mins");
  });

  it("renders recipe card with correct star rating", () => {
    render(<SmallRecipeCard {...mockCard} />);
    const starRating = screen.getAllByTestId(/^starRating-/);
    expect(starRating).toHaveLength(5);
    expect(starRating[0]).toHaveAttribute("aria-label", "Filled Star");
    expect(starRating[1]).toHaveAttribute("aria-label", "Filled Star");
    expect(starRating[2]).toHaveAttribute("aria-label", "Filled Star");
    expect(starRating[3]).toHaveAttribute("aria-label", "Empty Star");
    expect(starRating[4]).toHaveAttribute("aria-label", "Empty Star");
  });

  it("renders recipe card with correct number of reviews", () => {
    render(<SmallRecipeCard {...mockCard} />);
    const numReviews = screen.getByTestId("numReviews");
    expect(numReviews).toHaveTextContent(/^[0-9]+ reviews$/);
  });
});

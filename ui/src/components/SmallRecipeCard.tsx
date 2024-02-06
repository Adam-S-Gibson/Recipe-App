import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as SolidStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import { Card } from "../interfaces/Card";

export const SmallRecipeCard = ({ title, rating, timeToCook, id }: Card) => {
  const pageHistory = useHistory();

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      aria-label="Recipe Card"
      data-testid="recipeCard"
    >
      <Image
        src="https://media.istockphoto.com/id/1185879263/vector/recipe-book-hand-drawn-cover-vector-illustration.jpg?s=612x612&w=0&k=20&c=LMU-L5FcyKYdzPdB_ZNc0mQlFCwMyJM4iI94ZzBfpQM="
        alt="Tasty Recipe Image"
        aria-label="Recipe Image"
        data-testid="recipeImage"
      />

      <Box p="6">
        <Flex justifyContent="space-between" alignItems="center">
          <Text
            fontSize="2xl"
            isTruncated
            aria-label="Recipe Title"
            data-testid="recipeTitle"
          >
            {title}
          </Text>
          <Text
            fontSize="md"
            mt={1.5}
            aria-label="Cooking Time"
            data-testid="cookingTime"
          >
            {timeToCook} Mins
          </Text>
        </Flex>

        <Flex alignItems="center" mt="1">
          {Array(5)
            .fill("")
            .map((_, i) => (
              <FontAwesomeIcon
                key={i}
                icon={i < rating ? SolidStar : faStar}
                aria-label={i < rating ? "Filled Star" : "Empty Star"}
                data-testid={`starRating-${i}`}
              />
            ))}
          <Text
            as="span"
            ml="2"
            color="gray.600"
            fontSize="sm"
            aria-label="Number of Reviews"
            data-testid="numReviews"
          >
            {Math.floor(Math.random() * 13)} reviews
          </Text>
        </Flex>

        <Button
          mt={3}
          id="viewRecipeButton"
          onClick={() => pageHistory.push(`/view-recipe/${id}`)}
          aria-label="View Recipe Button"
          data-testid="viewRecipeButton"
        >
          View Recipe
        </Button>
      </Box>
    </Box>
  );
};

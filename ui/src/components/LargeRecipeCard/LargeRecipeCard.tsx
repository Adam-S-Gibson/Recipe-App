import { Box, Image, Button, SimpleGrid, GridItem } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as SolidStar } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import { Card } from "../../interfaces/Card";

export const LargeRecipeCard = ({ title, rating, timeToCook, id }: Card) => {
  const pageHistory = useHistory();
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      display="flex"
      flexDirection="row"
      maxW="max-content"
      minW="min-content"
    >
      <Image
        maxW="40"
        src="https://media.istockphoto.com/id/1185879263/vector/recipe-book-hand-drawn-cover-vector-illustration.jpg?s=612x612&w=0&k=20&c=LMU-L5FcyKYdzPdB_ZNc0mQlFCwMyJM4iI94ZzBfpQM="
        alt="Tasty Recipe Image"
      />

      <Box p="6">
        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          <SimpleGrid>
            <GridItem>{title}</GridItem>
            <GridItem>{timeToCook} Mins</GridItem>
          </SimpleGrid>
        </Box>

        <SimpleGrid columns={2}>
          <GridItem colSpan={2}>
            {Array(5)
              .fill("")
              .map((_, i) => (
                <FontAwesomeIcon
                  key={i}
                  icon={i < rating ? SolidStar : faStar}
                />
              ))}
            <Box as="span" ml="2" color="gray.600" fontSize="sm">
              {Math.floor(Math.random() * 13)} reviews
            </Box>
          </GridItem>
          <GridItem>
            <Button
              size="sm"
              id="viewRecipeButton"
              onClick={() => pageHistory.push(`/view-recipe/${id}`)}
            >
              View Recipe
            </Button>
          </GridItem>
        </SimpleGrid>
      </Box>
    </Box>
  );
};

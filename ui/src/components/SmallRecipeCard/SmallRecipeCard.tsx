import {
  Box,
  Button,
  Flex,
  GridItem,
  Image,
  SimpleGrid,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as SolidStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import { Card } from "../../interfaces/Card";

export const SmallRecipeCard = ({ title, rating, timeToCook, id }: Card) => {
  const pageHistory = useHistory();

  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Image
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
          <Flex>
            <Text fontSize="2xl">{title}</Text>
            <Spacer />
            <Text fontSize="md" mt={1.5}>
              {timeToCook} Mins
            </Text>
          </Flex>
        </Box>

        <Box display="flex" mt="1" alignItems="center">
          <SimpleGrid>
            <GridItem>
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
                mt={3}
                id="viewRecipeButton"
                onClick={() => pageHistory.push(`/view-recipe/${id}`)}
              >
                View Recipe
              </Button>
            </GridItem>
          </SimpleGrid>
        </Box>
      </Box>
    </Box>
  );
};
